import styles from "./RulerOverlay.module.css"
import {useControls} from "./Main";
import {parseColor} from '@react-stately/color';
import {useEffect, useState} from "react";

const RulerOverlay = () => {
  const [edgeColor, setEdgeColor] = useState('#0008')
  const [centerColor, setCenterColor] = useState('transparent')
  const controlValues = useControls();
  const halfRulerOpening = `${controlValues.rulerHeight / 2}px`
  useEffect(() => {
    try {
      const parsedBackroundColor = parseColor(controlValues.rulerBackgroundColor)
        .withChannelValue('alpha', controlValues.rulerOpacity)
        .toString('rgba')
      setEdgeColor(controlValues.rulerInvert ? 'transparent' : parsedBackroundColor);
      setCenterColor(controlValues.rulerInvert ? parsedBackroundColor : 'transparent');
    } catch {
      // we ignore invalid rulerBackgroundColor settings
    }
  }, [controlValues.rulerBackgroundColor, controlValues.rulerOpacity, controlValues.rulerInvert])

  const backgroundCss = `linear-gradient(to bottom, 
  ${edgeColor} calc(50% - ${halfRulerOpening} - ${controlValues.rulerTransitionHeight}px), 
  ${centerColor} calc(50% - ${halfRulerOpening}), 
  ${centerColor} calc(50% + ${halfRulerOpening}), 
  ${edgeColor} calc(50% + ${halfRulerOpening} + ${controlValues.rulerTransitionHeight}px)`

  const rulerWidth = `${controlValues.columnWidth + 1}in`;  // add an inch to cover the left and right padding
  return (
    <>
      <div className={styles.RulerOverlay} style={{
        display: controlValues.showRuler && !controlValues.rulerUnderline ? 'block' : 'none',
        width: rulerWidth,
        background: backgroundCss,
        cursor: controlValues.rulerDisableMouse ? 'none' : 'normal',
      }}/>
      <div className={styles.UnderlineRuler} style={{
        display: controlValues.rulerUnderline ? 'block' : 'none',
        width: rulerWidth,

      }}/>
    </>
  )
}

export default RulerOverlay;