import styles from "./Main.module.css"
import Controls from "./Controls";
import ReadingView from "./ReadingView";
const Main = () => {
  return (
    <div className={styles.Main}>
      <Controls />
      <ReadingView />
    </div>
  )
}

export default Main;