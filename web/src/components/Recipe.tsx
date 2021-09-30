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

import styles from "./Recipe.module.css";
import {useEffect, useState} from "react";
import {IControls, useControls} from "./Main";
import {Text, TextField, Tooltip, TooltipTrigger} from "@adobe/react-spectrum";
import {ControlValue} from "./logging";

const Recipe = (props: {
  id: number,
  remove: (id: number) => void
}) => {
  const [mySettings, setMySettings] = useState<IControls>(undefined!);
  const [name, setName] = useState('');
  const controls = useControls();

  // update the active control state from my saved settings
  const setControls = () => {
    controls.setControlValue({name: 'all', value: mySettings as { [name: string]: ControlValue }})
  }
  useEffect(() => {
    // set my state when created
    // don't save the html
    setMySettings({...controls, html: ''});
  }, [])  // React wants me to include a dependency on controls, but that's repcisely what I don't want here.
                // The whole idea is to cache a set of control values at the moment of creation and not change them
  return (
    <>
      {name ?
        <TooltipTrigger>
          <button onClick={setControls} className={styles.Recipe}>
            <Text>{name}</Text>
            <div className={styles.Remove} onClick={() => props.remove(props.id)}>x</div>
          </button>
          <Tooltip>Restore control settings from this Recipe</Tooltip>
        </TooltipTrigger>
        :
        <div>
          <TextField label="Name" labelPosition="side" autoFocus={true} onKeyDown={(e) => {
            if (e.key === "Enter") {
              setName((e.target as HTMLInputElement).value);
            }
            if (e.key === 'Escape') {
              props.remove(props.id);
            }
          }}/>
        </div>
      }
    </>
  );
};

export default Recipe;