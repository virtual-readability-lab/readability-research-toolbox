import styles from "./RulerOverlay.module.css"
import {useControls} from "./Main";

const RulerOverlay = () => {
  const controlValues = useControls();
  const halfRulerOpening = `${controlValues.rulerHeight / 2}px`
  const transitionHeight = '10px' // hardcoded for now
  const backgroundCss = `linear-gradient(to bottom, 
  rgba(0,0,0,${controlValues.rulerOpacity}) calc(50% - ${halfRulerOpening} - ${transitionHeight}), 
  rgba(1, 1, 1,0) calc(50% - ${halfRulerOpening}), 
  rgba(1, 1, 1,0) calc(50% + ${halfRulerOpening}), 
  rgba(0,0,0,${controlValues.rulerOpacity}) calc(50% + ${halfRulerOpening} + ${transitionHeight})`

  return (
    <div className={styles.RulerOverlay} style={{
      width: `${controlValues.columnWidth + 1}in`,  // add an inch to cover the left and right padding
      background: backgroundCss
    }}/>
  )
}

export default RulerOverlay;