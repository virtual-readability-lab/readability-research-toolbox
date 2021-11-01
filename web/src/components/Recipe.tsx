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

import styles from "./Recipe.module.css";
import {Text, TextField, Tooltip, TooltipTrigger} from "@adobe/react-spectrum";
import {useRecipeAdminContext} from "./RecipeBox";

const Recipe = (props: {
  id: number,
  name: string | null,
  onClick: () => void,
  setName: (name: string) => void,
  remove: () => void,
}) => {
  const recipeAdmin = useRecipeAdminContext();

  return (
    <>
      {props.name ?
        <TooltipTrigger>
          <button onClick={props.onClick} className={styles.Recipe}>
            <Text>{props.name}</Text>
            {
              recipeAdmin.showDelete &&
              <div className={styles.Remove} onClick={(e) => {
                e.stopPropagation();
                props.remove();
              }}>x
              </div>
            }
          </button>
          <Tooltip>Restore control settings from this Recipe</Tooltip>
        </TooltipTrigger>
        :
        <div>
          <TextField label="Name" labelPosition="side" autoFocus={true} onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.setName((e.target as HTMLInputElement).value);
            }
            if (e.key === 'Escape') {
              props.remove();
            }
          }}/>
        </div>
      }
    </>
  );
};

export default Recipe;