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
import {ActionButton, Tooltip, TooltipTrigger} from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import Recipe from "./Recipe";
import {ReactElement, useRef, useState} from "react";

const RecipeBox = () => {
  const [recipeCollection, setRecipeCollection] = useState<ReactElement[]>([])
  const nextRecipeId = useRef(0)
  const addRecipe = () => {
    const id = nextRecipeId.current++;
    setRecipeCollection(oldSets => [...oldSets, <Recipe key={id} id={id} remove={removeRecipe}/>]);
  }
  const removeRecipe = (id: number) => {
    setRecipeCollection(oldSets => oldSets.filter((s) => s.props.id !== id));
  }
  return <div className={styles.OuterBox}>
    <div className={styles.Heading}>
      <h3>Recipes</h3>
      <TooltipTrigger>
        <ActionButton onPress={addRecipe}>
          <Add color="informative"/>
        </ActionButton>
        <Tooltip>Save current control settings as a Recipe</Tooltip>
      </TooltipTrigger>
    </div>
    <div className={styles.Recipes}>
      {recipeCollection}
    </div>
  </div>;
}

export default RecipeBox;