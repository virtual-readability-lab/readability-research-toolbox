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