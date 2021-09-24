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

import styles from "./SettingsSet.module.css";
import {useEffect, useState} from "react";
import {IControls, useControls} from "./Main";
import {TextField} from "@adobe/react-spectrum";
import {ControlValue} from "./logging";

const SettingsSet = () => {
  const [mySettings, setMySettings] = useState<IControls>(undefined!);
  const [name, setName] = useState('');
  const controls = useControls();

  // set my state from the current value of the controls
  // don't save the html
  const save = () => {
    setMySettings({...controls, html: ''});
  }
  // update the active control state from my saved settings
  const setControls = () => {
    controls.setControlValue({name: 'all', value: mySettings as {[name: string]: ControlValue}})
  }
  useEffect(() => {
    // set my state when created
    save()
  }, [])
  return (
    <>
      {name ?
        <button onClick={setControls}>{name}</button>
        :
        <div>
          <TextField label="Name" labelPosition="side" onKeyDown={(e) => {
            if (e.key === "Enter") {
              setName((e.target as HTMLInputElement).value);
            }
          }}/>
        </div>
      }
    </>
  );
};

export default SettingsSet;