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

import React, {useState} from "react";
import {ChromePicker, Color, ColorResult} from 'react-color'
import styles from './ColorPicker.module.css'
import {TextField} from "@adobe/react-spectrum";

const ColorPicker = (props: {
  currentColor: string,
  setColor: (newColor: ColorResult) => void,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <TextField isReadOnly={true} label='Color' labelPosition="side" UNSAFE_style={{backgroundColor: props.currentColor}}/>
      <ChromePicker color={props.currentColor} onChangeComplete={props.setColor}/>
      <div className={styles.Swatch} onClick={(ev: React.MouseEvent) => {
        setExpanded(!expanded)
      }} style={{backgroundColor: props.currentColor}}/>
    </>
  )
}


export default ColorPicker;