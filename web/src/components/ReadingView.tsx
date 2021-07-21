import styles from "./ReadingView.module.css"
import testHTML from "../data/testHTML";
import {useControls} from "./Main";
import RulerOverlay from "./RulerOverlay";

const ReadingView = () => {
  const controlValues = useControls();
  return (
    <div className={styles.ReadingView}>
      <RulerOverlay/>
      <div className={styles.ScrollContainer}>
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
               padding: controlValues.showRuler ? '400px 0.5in' : '0.5in' // the 400px is a hack-must be a better way
             }}/>
      </div>
    </div>
  )
}

export default ReadingView;