

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

import styles from "./SliderControl.module.css";
import controlStyles from "./Controls.module.css";
import {Slider} from "@adobe/react-spectrum";
import Undo from "@spectrum-icons/workflow/Undo";
import ArrowLeftMedium from "@spectrum-icons/ui/ArrowLeftMedium";
import {useControls, useControlSetter} from "./Main";

const SliderControl = (props: {
  controlName: string,
  label: string,
  minValue: number,
  maxValue: number,
  step: number,
  isDisabled?: boolean
}) => {
  const controls = useControls();
  const controlSetter = useControlSetter();
  const changeControlValue = (val: number, source: string) => {
    controlSetter(props.controlName, source, val)
  }
  const step = (up: boolean) => {
    let newValue = controls[props.controlName] as number + props.step * (up ? 1 : -1)
    if (newValue > props.maxValue) newValue = props.maxValue;
    if (newValue < props.minValue) newValue = props.minValue;
    changeControlValue(newValue, 'step')
  }
  return (
    <div className={styles.SliderControl}>
      <label className={controlStyles.Label}>{props.label}</label>
      <span onClick={() => step(false)}><ArrowLeftMedium/></span>
      <div style={{width: 245, display: "flex", alignItems: "center"}}>
      <Slider value={controls[props.controlName] as number}
              onChange={(val: number) => changeControlValue(val, 'slider')}
              aria-label={props.controlName}
              minValue={props.minValue} maxValue={props.maxValue} step={props.step}
              labelPosition="side" label="" isDisabled={props.isDisabled} showValueLabel={true}/>
        </div>
      <span style={{transform: "scaleX(-1)"}} onClick={() => step(true)}><ArrowLeftMedium /></span>

      <span onClick={() => {changeControlValue(0, 'reset')}} className={styles.Icon}>
        <Undo/>
      </span>
    </div>
  );
};

export default SliderControl;