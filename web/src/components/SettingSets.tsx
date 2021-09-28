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

import styles from "./SettingSets.module.css";
import {ActionButton, Tooltip, TooltipTrigger} from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import SettingsSet from "./SettingsSet";
import {ReactElement, useRef, useState} from "react";

const SettingSets = () => {
  const [settingSets, setSettingSets] = useState<ReactElement[]>([])
  const nextSettingsId = useRef(0)
  const addSettingSet = () => {
    const id = nextSettingsId.current++;
    setSettingSets(oldSets => [...oldSets, <SettingsSet key={id} id={id} remove={removeSettingSet}/>]);
  }
  const removeSettingSet = (id: number) => {
    setSettingSets(oldSets => oldSets.filter((s) => s.props.id !== id));
  }
  return <div className={styles.OuterBox}>
    <div className={styles.Heading}>
      <h3>Saved Settings</h3>
      <TooltipTrigger>
        <ActionButton onPress={addSettingSet}>
          <Add color="informative"/>
        </ActionButton>
        <Tooltip>Save current control settings</Tooltip>
      </TooltipTrigger>
    </div>
    <div className={styles.Sets}>
      {settingSets}
    </div>
  </div>;
}

export default SettingSets;