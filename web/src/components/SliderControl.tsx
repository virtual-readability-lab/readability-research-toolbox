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

import styles from "./SliderControl.module.css";
import controlStyles from "./Controls.module.css";
import {Slider} from "@adobe/react-spectrum";
import Undo from "@spectrum-icons/workflow/Undo";
import ArrowLeftMedium from "@spectrum-icons/ui/ArrowLeftMedium";
import {useControls} from "./Main";

const SliderControl = (props: {
  controlName: string,
  label: string,
  minValue: number,
  maxValue: number,
  step: number,
  isDisabled?: boolean
}) => {
  const controls = useControls();
  const changeControlValue = (val: number) => {
    controls.setControlValue({name: props.controlName, value: val})
  }
  const step = (up: boolean) => {
    let newValue = controls[props.controlName] as number + props.step * (up ? 1 : -1)
    if (newValue > props.maxValue) newValue = props.maxValue;
    if (newValue < props.minValue) newValue = props.minValue;
    changeControlValue(newValue)
  }
  return (
    <div className={styles.SliderControl}>
      <label className={controlStyles.Label}>{props.label}</label>
      <span onClick={() => step(false)}><ArrowLeftMedium/></span>
      <div style={{width: 245, display: "flex", alignItems: "center"}}>
      <Slider value={controls[props.controlName] as number} onChange={changeControlValue}
              minValue={props.minValue} maxValue={props.maxValue} step={props.step}
              labelPosition="side" label="" isDisabled={props.isDisabled} showValueLabel={true}/>
        </div>
      <span style={{transform: "scaleX(-1)"}} onClick={() => step(true)}><ArrowLeftMedium /></span>

      <span onClick={() => {changeControlValue(-999)}} className={styles.Icon}>
        <Undo/>
      </span>
    </div>
  );
};

export default SliderControl;