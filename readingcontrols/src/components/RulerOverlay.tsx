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

import styles from "./RulerOverlay.module.css";
import {useControls} from "./Main";
import {parseColor} from '@react-stately/color';
import {useEffect, useState} from "react";

const defaultRulerPosition = 25;
export let rulerPosition = defaultRulerPosition; // in percent

const RulerOverlay = (props: {
  rulerPosition: number
}) => {
  const [edgeColor, setEdgeColor] = useState('#0008');
  const [centerColor, setCenterColor] = useState('transparent');
  const controlValues = useControls();
  // we want the ruler height to be proportional to the text default size
  const rulerHeight = controlValues.fontSize * controlValues.lineHeight * controlValues.rulerHeight;
  const halfRulerOpening = `${rulerHeight / 2}px`;
  rulerPosition = controlValues.rulerFollowsMouse ? props.rulerPosition : defaultRulerPosition;

  useEffect(() => {
    try {
      const parsedBackroundColor = parseColor(controlValues.rulerBackgroundColor)
        .withChannelValue('alpha', controlValues.rulerOpacity)
        .toString('rgba');
      setEdgeColor(controlValues.rulerInvert ? 'transparent' : parsedBackroundColor);
      setCenterColor(controlValues.rulerInvert ? parsedBackroundColor : 'transparent');
    } catch {
      // we ignore invalid rulerBackgroundColor settings
    }
  }, [controlValues.rulerBackgroundColor, controlValues.rulerOpacity, controlValues.rulerInvert]);


  const backgroundCss = `linear-gradient(to bottom, 
  ${edgeColor} calc(${rulerPosition}% - ${halfRulerOpening} - ${controlValues.rulerTransitionHeight}px), 
  ${centerColor} calc(${rulerPosition}% - ${halfRulerOpening}), 
  ${centerColor} calc(${rulerPosition}% + ${halfRulerOpening}), 
  ${edgeColor} calc(${rulerPosition}% + ${halfRulerOpening} + ${controlValues.rulerTransitionHeight}px)`;


  const rulerWidth = `${controlValues.columnWidth + 1}in`;  // add an inch to cover the left and right padding
  return (
    <div>
      <div className={styles.RulerOverlay} style={{
        display: controlValues.showRuler && !controlValues.rulerUnderline ? 'block' : 'none',
        width: rulerWidth,
        background: backgroundCss,
      }}/>
      <div className={styles.UnderlineRuler} style={{
        display: controlValues.showRuler && controlValues.rulerUnderline ? 'block' : 'none',
        width: rulerWidth,
        borderTopColor: controlValues.backgroundColor === '#000000' ? 'white' : 'black',
        top: `${rulerPosition}%`
      }}/>
    </div>
  );
};

export default RulerOverlay;