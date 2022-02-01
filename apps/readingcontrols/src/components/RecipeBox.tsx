

/*
 * Copyright 2021 Michael Kraley
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import styles from "./RecipeBox.module.css";
import {ActionButton, Tooltip, TooltipTrigger, DialogContainer} from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import Recipe from "./Recipe";
import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {controlsInitialState, IControls, useControls, useControlSetter} from "./Main";
import {addLogRecord, ControlValue} from "./logging";
import {downloadFile, randomizeArray} from "../utils";
import RecipeAdmin from "./RecipeAdmin";
import defaultClusterRecipes from "../data/defaultClusterRecipes.json";

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

  const loadAllRecipes = useCallback((json: any) => {
    const newCollection = new Map();
    for (const [name, values] of json.entries()) {
      newCollection.set(name, values);
      logRecipeCreation(values);
    }
    setAllRecipes(newCollection);
  }, []);

  const importRecipes = (content: string) => {
    const json = JSON.parse(content);
    loadAllRecipes(json);
  };

  // load the default recipes at startup
  useEffect(() => {
    setTimeout(() => {
      loadAllRecipes(randomizeArray(defaultClusterRecipes));
    }, 500); // HACK: this has to run after Main has cleared the log records, so we can log the loaded recipes,
    // but I don't see a good way to interlock
  }, [loadAllRecipes]);

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
