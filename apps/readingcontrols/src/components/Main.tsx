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

import styles from "./Main.module.css";
import Controls from "./Controls";
import ReadingView from "./ReadingView";
import {createContext, useContext, useEffect, useReducer} from "react";
import {addLogRecord, clearLogRecords, ControlValue} from "./logging";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export interface IControls {
  html: string,
  fontSize: number,
  fontName: string,
  lineHeight: number,
  characterSpacing: number,
  wordSpacing: number,
  paragraphIndent: number,
  paragraphSpacing: number,
  columnWidth: number,
  textAlignment: string,
  darkMode: boolean,
  controlLock: boolean,
  backgroundColor: string,
  foregroundColor: string,
  backgroundSaturation: number,
  showRuler: boolean,
  rulerHeight: number,
  rulerOpacity: number,
  rulerInvert: boolean,
  rulerBackgroundColor: string,
  rulerUnderline: boolean,
  rulerDisableMouse: boolean,
  rulerTransitionHeight: number,
  rulerSnapToLine: boolean,
  rulerFollowsMouse: boolean,

  [key: string]: ControlValue;
}

type ControlStateChange = {
  controlName: string,
  source: string,
  value: ControlValue,
};

export const controlsInitialState: IControls = {
  html: '',
  fontSize: 16,
  fontName: 'Arial',
  lineHeight: 1.2,
  characterSpacing: 0,
  wordSpacing: 0,
  paragraphIndent: 0,
  paragraphSpacing: 0,
  columnWidth: 6,
  textAlignment: 'start',
  darkMode: false,
  controlLock: true,
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF',
  backgroundSaturation: 90,
  showRuler: false,
  rulerHeight: 1,
  rulerOpacity: 0.5,
  rulerInvert: false,
  rulerBackgroundColor: '#000',
  rulerUnderline: false,
  rulerDisableMouse: false,
  rulerTransitionHeight: 8,
  rulerSnapToLine: true,
  rulerFollowsMouse: false,

  setControlValue: undefined!,
};
const ControlsContext = createContext<IControls>(controlsInitialState);
export const useControls = () => useContext(ControlsContext);

const ControlSetterContext = createContext<(controlName: string,
                                            source: string,
                                            value: ControlValue) => void>(undefined!);
export const useControlSetter = () => useContext(ControlSetterContext);

const Main = (props: {
  setTheme: (dark: boolean) => void
}) => {
  const changeControlReducer = (state: IControls, action: ControlStateChange) => {
    let newState = {...state};
    let newVal = action.value as ControlValue;
    if (action.source === 'reset') {
      newVal = controlsInitialState[action.controlName] as ControlValue;
    }
    newState[action.controlName] = newVal;

    // save it to log
    addLogRecord(action.controlName, action.source, state[action.controlName] as ControlValue, newVal);

    // some special processing for dark mode
    if (action.controlName === 'darkMode') {
      props.setTheme(action.value as boolean);
      if (state.darkMode !== action.value) {
        // swap colors
        [newState.backgroundColor, newState.foregroundColor] = [state.foregroundColor, state.backgroundColor];
      }
    }
    return newState;
  };

  const [controlsState, setControlDispatch] = useReducer(changeControlReducer, controlsInitialState);

  const controlSetter = (controlName: string,
                         source: string,
                         value: ControlValue) => setControlDispatch({controlName, source, value});
  useEffect(() => {
    clearLogRecords();
  }, []);

  return (
    <ControlsContext.Provider value={controlsState}>
      <ControlSetterContext.Provider value={controlSetter}>
        <div className={styles.Main}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Controls useAdvancedSettings />} />
              <Route
                path="/user-testing"
                element={<Controls useAdvancedSettings={false} />}
              />
            </Routes>
          </BrowserRouter>
          <ReadingView />
        </div>
      </ControlSetterContext.Provider>
    </ControlsContext.Provider>
  );
};

export default Main;