import styles from "./Main.module.css";
import Controls from "./Controls";
import ReadingView from "./ReadingView";
import {createContext, useContext, useEffect, useReducer} from "react";
import {addLogRecord, clearLogRecords, ControlValue} from "./logging";

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
          <Controls/>
          <ReadingView/>
        </div>
      </ControlSetterContext.Provider>
    </ControlsContext.Provider>
  );
};

export default Main;