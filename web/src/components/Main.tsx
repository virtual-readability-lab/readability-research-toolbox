import styles from "./Main.module.css"
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

  setControlValue: (action: ControlStateChange) => void

  [key: string]: ControlValue | ((action: ControlStateChange) => void);
}

type ControlStateChange = { name: string, value: ControlValue | { [controlName: string]: ControlValue } }
const ControlsContext = createContext<IControls>(undefined!);
export const useControls = () => useContext(ControlsContext);

const Main = (props: {
  setTheme: (dark: boolean) => void
}) => {
  /* Controls context and state */
  const controlsInitialState: IControls = {
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
  }
  const changeControlReducer = (state: IControls, action: ControlStateChange) => {
    let newState = {...state};
    if (action.name === 'reset') {
      addLogRecord('reset', 0, 0)
      newState = {...controlsInitialState, html: state.html}  // don't reset html
      props.setTheme(false);
    } else if (action.name === 'all') {
      const x = action.value as { [controlName: string]: ControlValue };
      for (const [name, value] of Object.entries(x)) {
        if (name === 'html') continue;
        newState[name] = value;
        addLogRecord(name, state[name] as ControlValue, value as ControlValue)
      }
    } else {
      if (action.value === -999) {
        newState[action.name] = controlsInitialState[action.name]
      } else {
        newState[action.name] = action.value as ControlValue;
      }
      // save it to log
      addLogRecord(action.name, state[action.name] as ControlValue, action.value as ControlValue)
    }
    if (action.name === 'darkMode') {
      props.setTheme(action.value as boolean)
      if (state.darkMode !== action.value) {
        // swap colors
        [newState.backgroundColor, newState.foregroundColor] = [state.foregroundColor, state.backgroundColor]
      }
    }
    return newState;
  }
  const setControlsInitialState = () => {
    const ret = controlsInitialState;
    ret.setControlValue = (action: ControlStateChange) => {
      setControlDispatch(action)
    }
    return ret;
  }

  const [controlsState, setControlDispatch] = useReducer(changeControlReducer, setControlsInitialState())
  const updateControlValue = (name: string, value: ControlValue) => {
    setControlDispatch({name, value})
  }
  useEffect(() => {
    clearLogRecords();
  }, [])
  return (
    <ControlsContext.Provider value={controlsState}>
      <div className={styles.Main}>
        <Controls updateControlValue={updateControlValue}/>
        <ReadingView/>
      </div>
    </ControlsContext.Provider>
  )
}

export default Main;