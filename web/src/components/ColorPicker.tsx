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

import React from "react";
import {ColorResult, CompactPicker, SwatchesPicker} from 'react-color'
import {Label} from '@react-spectrum/label';
import styles from './ColorPicker.module.css'

const swatches = [
["#b71c1c", "#d32f2f", "#f44336", "#e57373", "#ffcdd2"],
["#880e4f", "#c2185b", "#e91e63", "#f06292", "#f8bbd0"],
["#4a148c", "#7b1fa2", "#9c27b0", "#ba68c8", "#e1bee7"],
["#311b92", "#512da8", "#673ab7", "#9575cd", "#d1c4e9"],
["#1a237e", "#303f9f", "#3f51b5", "#7986cb", "#c5cae9"],
]
const colors = ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']
const ColorPicker = (props: {
  label: string,
  currentColor: string,
  setColor: (newColor: ColorResult) => void,
}) => {
  return (
    <div style={{display: 'flex'}}>
      <Label className={styles.Label} labelPosition="side">{props.label}</Label>
      <CompactPicker colors={colors} color={props.currentColor}
                      onChangeComplete={props.setColor} className={styles.Picker + " _spectrum-Field--positionSide_36b9b"}/>
    </div>
  )
}

export default ColorPicker;