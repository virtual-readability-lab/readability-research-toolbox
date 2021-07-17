import styles from "./ReadingView.module.css"
import testHTML from "../data/testHTML";
import {useControls} from "./Main";

const ReadingView = () => {
  const controlValues = useControls();
  return (
    <div className={styles.ReadingView}>
      <div className={styles.ContentPane} dangerouslySetInnerHTML={{__html: testHTML}}
      style={{
        fontSize: controlValues.fontSize,
        fontFamily: controlValues.fontName,
        lineHeight: controlValues.lineHeight,
        letterSpacing: controlValues.characterSpacing,
        wordSpacing: controlValues.wordSpacing,
        width: `${controlValues.columnWidth}in`,
        backgroundColor: controlValues.backgroundColor,
        color: controlValues.foregroundColor,
      }}/>
    </div>
  )
}

export default ReadingView;