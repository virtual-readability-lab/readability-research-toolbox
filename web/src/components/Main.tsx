import styles from "./Main.module.css"
import Controls from "./Controls";
import ReadingView from "./ReadingView";
import {createContext, useContext, useEffect, useReducer} from "react";
import {addLogRecord, clearLogRecords} from "./logging";

interface IControls {
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

  [key: string]: boolean | number | string // so we can do state[name]
}

type ControlStateChange = {
  name: string;
  value: boolean | number | string;
};
const ControlsContext = createContext<IControls>(undefined!);
export const useControls = () => useContext(ControlsContext);

const Main = (props: {
  setTheme: (dark: boolean) => void
}) => {
  /* Controls context and state */
  const controlsInitialState = {
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
  }

  const changeControlReducer = (state: IControls, action: ControlStateChange) => {
    let newState;
    if (action.name === 'reset') {
      addLogRecord({
        datetime: new Date(),
        controlName: 'reset',
        oldValue: 0,
        newValue: 0
      })
      newState = {...controlsInitialState, html: state.html}  // don't reset html
      props.setTheme(false);
    } else {
      newState = {...state}
      newState[action.name] = action.value;
      // save it to log
      addLogRecord({
        datetime: new Date(),
        controlName: action.name,
        oldValue: state[action.name],
        newValue: action.value
      })
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

  const [controlsState, setControlDispatch] = useReducer(changeControlReducer, controlsInitialState)
  const updateControlValue = (name: string, value: boolean | number | string) => {
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