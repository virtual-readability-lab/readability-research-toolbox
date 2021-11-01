/*
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2021 Adobe
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any.  The
 * intellectual and technical concepts contained herein are
 * proprietary to Adobe and its suppliers and are protected
 * by all applicable intellectual property laws, including
 * trade secret and copyright laws.  Dissemination of this
 * information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained
 * from Adobe.
 *
 *
 */

import styles from "./RecipeBox.module.css";
import {ActionButton, Tooltip, TooltipTrigger, DialogContainer} from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import Recipe from "./Recipe";
import {createContext, useContext, useRef, useState} from "react";
import {controlsInitialState, IControls, useControls, useControlSetter} from "./Main";
import {addLogRecord, ControlValue} from "./logging";
import {downloadFile} from "../utils";
import RecipeAdmin from "./RecipeAdmin";

export type IRecipeData = {
  name: string | null;
  controlValues: IControls;
}

type IRecipeAdminContext = {
  showAdd: boolean,
  showDelete: boolean,
  setShowAdd: (val: boolean) => void,
  setShowDelete: (val: boolean) => void,
}

const RecipeAdminContext = createContext<IRecipeAdminContext>(undefined!);
export const useRecipeAdminContext = () => useContext(RecipeAdminContext);

const RecipeBox = () => {
  const [allRecipes, setAllRecipes] = useState<Map<number, IRecipeData>>(new Map());
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(true);
  const [showDelete, setShowDelete] = useState(true);
  const controls = useControls();
  const controlSetter = useControlSetter();
  const nextRecipeId = useRef(0);
  const addRecipe = () => {
    const id = nextRecipeId.current++;
    const {setControlValue, ...currentValues} = controls;
    currentValues.html = '';    // don't save the html
    const newRecipeData = {
      name: null,
      controlValues: currentValues,
    };
    setAllRecipes(oldCollection => new Map(oldCollection).set(id, newRecipeData));
  };

  function logRecipeCreation(recipeData: IRecipeData) {
    for (const [controlName, value] of Object.entries(recipeData.controlValues)) {
      if (controlName === 'html') continue;
      if (value === controlsInitialState[controlName]) continue;
      addLogRecord(controlName, 'recipeCreate: ' + recipeData.name, 'na', value as ControlValue);
    }
  }

  const setName = (id: number, name: string) => {
    const recipeData = allRecipes.get(id);
    if (!recipeData) return;
    recipeData.name = name;
    setAllRecipes(oldCollection => new Map(oldCollection).set(id, recipeData));
    logRecipeCreation(recipeData);
  };

  const removeRecipe = (id: number) => {
    const recipeName = allRecipes.get(id)?.name;
    addLogRecord('na', 'recipeDelete: ' + recipeName, '', 'na');
    setAllRecipes(oldCollection => {
      const newCollection = new Map(oldCollection);
      newCollection.delete(id);
      return newCollection;
    });
  };

  const loadRecipe = (id: number) => {
    const data = allRecipes.get(id);
    if (!data) return;
    for (const [controlName, value] of Object.entries(data.controlValues)) {
      if (controlName === 'html') continue;
      controlSetter(
        controlName,
        'recipeRestore: ' + data.name,
        value as ControlValue,
      );
    }
  };
  const exportRecipes = () => {
    const replacer = (key: string, value: any) => {
      if (value instanceof Map) return [...value];
      if (!isNaN(+key)) return value[1];  // top level of Map has integer id keys - we don't want them persisted
      if (key === 'html') return undefined; // omit html
      return value;
    };
    const json = JSON.stringify(allRecipes, replacer, 2);
    const data = new Blob([json], {type: 'application/json'});
    downloadFile(data, 'AllRecipes.json');
  };

  const importRecipes = (content: string) => {
    const json = JSON.parse(content);
    const newCollection = new Map();
    for (const [name, values] of json.entries()) {
      newCollection.set(name, values);
      logRecipeCreation(values);
    }
    setAllRecipes(newCollection);
  };

  const recipeButtons = Array.from(allRecipes.entries()).map(([id, recipeData]) =>
    <Recipe id={id} key={id} name={recipeData.name} onClick={loadRecipe.bind(this, id)} setName={setName.bind(this, id)}
            remove={removeRecipe.bind(this, id)}/>);

  return (
    <RecipeAdminContext.Provider value={{
      showAdd: showAdd,
      showDelete: showDelete,
      setShowAdd: setShowAdd,
      setShowDelete: setShowDelete,
    }}>
      <div className={styles.OuterBox}>
        <div className={styles.Heading}>
          <h3 onDoubleClick={(e) => {
            if (e.shiftKey) setAdminDialogOpen(true);
          }} style={{userSelect: "none"}}>Recipes</h3>
          {
            showAdd &&
            <TooltipTrigger>
              <ActionButton onPress={addRecipe}>
                <Add color="informative"/>
              </ActionButton>
              <Tooltip>Save current control settings as a Recipe</Tooltip>
            </TooltipTrigger>
          }
        </div>
        {
          adminDialogOpen &&
          <DialogContainer isDismissable={true} type="modal" onDismiss={() => setAdminDialogOpen(false)}>
            <RecipeAdmin import={importRecipes} export={exportRecipes}/>
          </DialogContainer>
        }
        <div className={styles.Recipes}>
          {recipeButtons}
        </div>
      </div>
      ;
    </RecipeAdminContext.Provider>);
};

export default RecipeBox;
