

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

import styles from "./RecipeAdmin.module.css";
import {
  ActionButton,
  Content,
  Dialog, Switch,
  TextField, useDialogContainer
} from "@adobe/react-spectrum";
import {useState} from "react";
import {useRecipeAdminContext} from "./RecipeBox";

const RecipeAdmin = (props: {
  import: (importContent: string) => void,
  export: () => void,
}) => {
  const [fileChooserOpen, setFileChooserOpen] = useState(false);
  const recipeAdmin = useRecipeAdminContext();
  const dialog = useDialogContainer();
  const onFileChosen = () => {
    const fr = new FileReader();
    const onFileReady = () => {
      const content = fr.result as string;
      props.import(content);
      setFileChooserOpen(false);
      dialog.dismiss();
    };
    const fileChooser = (document.getElementById('importFileChooser') as HTMLInputElement);
    if (fileChooser && fileChooser.files) {
      fr.onloadend = onFileReady;
      fr.readAsText(fileChooser.files[0]);
    }
  };
  return (
    <Dialog width={500}>
      <Content>
        <div className={styles.ButtonRow}>
          <ActionButton onPress={() => setFileChooserOpen(true)}>Import Recipes</ActionButton>
          <ActionButton onPress={() => {
            props.export();
            dialog.dismiss();
          }}>Export Recipes</ActionButton>
        </div>
        <div className={styles.ButtonRow}>
          <Switch isSelected={recipeAdmin.showAdd} onChange={recipeAdmin.setShowAdd}>Allow Recipe Creation</Switch>
          <Switch isSelected={recipeAdmin.showDelete} onChange={recipeAdmin.setShowDelete}>Allow Recipe
            Deletion</Switch>
        </div>
        <div className={styles.ButtonRow}>

          {
            fileChooserOpen && <TextField width="350px" type="file" onChange={onFileChosen} id="importFileChooser"
                                          aria-label="Choose file" label="File" labelPosition="side"/>
          }
        </div>
      </Content>
    </Dialog>
  );
};

export default RecipeAdmin;