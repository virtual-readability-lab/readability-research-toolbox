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
import {Slider} from "@adobe/react-spectrum";
import Undo from "@spectrum-icons/workflow/Undo";
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
  return (
    <div className={styles.SliderControl}>
      <Slider label={props.label} value={controls[props.controlName] as number} onChange={changeControlValue}
              minValue={props.minValue} maxValue={props.maxValue} step={props.step}
              labelPosition="side" isDisabled={props.isDisabled}/>
      <span onClick={() => {changeControlValue(-999)}}>
        <Undo color="rgb(100, 100, 100)" isDisabled={props.isDisabled}/>
      </span>
    </div>
  );
};

export default SliderControl;