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

import React, {useEffect, useState} from "react";
import {Label} from '@react-spectrum/label';
import styles from './ColorPicker.module.css'
import TextColor from "./TextColor";
import {randomizeArray} from "../utils";
import {addLogRecord} from "./logging";

/*
from https://www.cs.cmu.edu/~jbigham/pubs/pdfs/2017/colors.pdf
- Blue: RGB(150, 173, 252); #96ADFC; 9.68:1.
- Blue Grey: RGB(219, 225, 241) #DBE1F1; 16.05:1.
- Green: RGB(219, 225, 241) #A8F29A; 15.83:1.
- Grey: RGB(168, 242, 154) #D8D3D6; 14.21:1.
- Orange: RGB(216, 211, 214) #EDDD6E; 15.17:1.
- Peach: RGB(237, 221, 110) #EDD1B0; 14.35:1.
- Purple: RGB(237, 209, 176) #B987DC; 7.56:1.
- Red: RGB(185, 135, 220) #E0A6AA; 10.2:1.
- Turquoise: RGB(224, 166, 170) #A5F7E1; 16.99:1.
- Yellow: RGB(248, 253, 137) #F8FD89; 19.4:1

added white and cream #FFFDD0
 */
const colors = ['#FFFDD0', '#96ADFC', '#DBE1F1', '#A8F29A', '#D8D3D6',
  '#EDDD6E', '#EDD1B0', '#B987DC', '#E0A6AA', '#A5F7E1', '#F8FD89']


const ColorPicker = (props: {
  label: string,
  currentColor: { text: string, back: string },
  setColor: (newText: string, newBack: string) => void,
  darkMode: boolean,
}) => {
  const [randomizedColors, setRandomizedColors] = useState(colors)
  useEffect(() => {
    // we want to randomize the color ordering for each new session
    const newOrder = randomizeArray(colors)
    // but always have white first
    newOrder.unshift('#FFFFFF')
    setRandomizedColors(newOrder)
    setTimeout(() => {
      addLogRecord({
        datetime: new Date(),
        controlName: 'colors',
        oldValue: 'na',
        newValue: newOrder.join(',')
      })
    }, 500) // HACK: this has to run after Main has cleared the records, but I don't see a good way to interlock
  }, [])
  return (
    <div style={{display: 'flex'}}>
      <Label className={styles.Label} labelPosition="side">{props.label}</Label>
      <div className={styles.Picker}>
        {props.darkMode ?
          randomizedColors.map((c) => <TextColor textColor={c} backgroundColor="#000000"
                                                 currentColor={props.currentColor} setColor={props.setColor}/>)
          :
          randomizedColors.map((c) => <TextColor textColor="#000000" backgroundColor={c}
                                                 currentColor={props.currentColor} setColor={props.setColor}/>)
        }
      </div>
    </div>
  )
}

export default ColorPicker;

/*
      <CompactPicker colors={colors} color={props.currentColor}
                      onChangeComplete={props.setColor} className={styles.Picker + " _spectrum-Field--positionSide_36b9b"}/>
 */