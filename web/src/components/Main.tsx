import styles from "./Main.module.css"
import Controls from "./Controls";
import ReadingView from "./ReadingView";
import {createContext, useContext, useReducer} from "react";

interface IControls {
  fontSize: number,
  fontName: string,
  lineHeight: number,
  characterSpacing: number,
  wordSpacing: number,
  columnWidth: number,
  backgroundColor: string,
  foregroundColor: string,
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

const Main = () => {
  /* Controls context and state */
  const controlsInitialState = {
    fontSize: 14,
    fontName: 'Times',
    lineHeight: 1,
    characterSpacing: 0,
    wordSpacing: 0,
    columnWidth: 6,
    foregroundColor: '#000',
    backgroundColor: '#fff',
    showRuler: false,
    rulerHeight: 20,
    rulerOpacity: 0.5,
    rulerInvert: false,
    rulerBackgroundColor: '#000',
    rulerUnderline: false,
    rulerDisableMouse: false,
    rulerTransitionHeight: 8,
  }

  const changeControlReducer = (state: IControls, action: ControlStateChange) => {
    const newState = Object.assign({}, state)
    newState[action.name] = action.value;
    return newState;
  }
  const [controlsState, setControlDispatch] = useReducer(changeControlReducer, controlsInitialState)
  const updateControlValue = (name: string, value: boolean | number | string) => {
    setControlDispatch({name, value})
  }

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