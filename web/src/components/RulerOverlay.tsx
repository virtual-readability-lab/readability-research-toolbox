import styles from "./RulerOverlay.module.css"
import {useControls} from "./Main";

const RulerOverlay = () => {
  const controlValues = useControls();
  return (
    <div className={styles.RulerOverlay} style={{
      width: `${controlValues.columnWidth + 1}in`,  // add an inch to cover the left and right padding
    }}/>
  )
}

export default RulerOverlay;