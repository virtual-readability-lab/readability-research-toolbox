

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