

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