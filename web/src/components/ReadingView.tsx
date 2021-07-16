import styles from "./ReadingView.module.css"
import testHTML from "../data/testHTML";

const ReadingView = () => {
  return (
    <div  className={styles.ReadingView}>
    <div className={styles.ContentPane} dangerouslySetInnerHTML={{__html: testHTML}}/>
      </div>
  )
}

export default ReadingView;