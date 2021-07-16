import styles from "./App.module.css"
import {defaultTheme, Heading, Provider} from "@adobe/react-spectrum";

function App() {
  return (
    <Provider theme={defaultTheme}>
      <header className={styles.Header}>
        <div style={{flexDirection: 'column'}}>
          <Heading level={2} marginBottom="0" marginTop="0">Reading Controls Test</Heading>
        </div>
      </header>
      <footer className={styles.Footer}>
        <span className={styles.Left}>Copyright &copy; 2021 Adobe, Inc.</span>
        <span className={styles.Center}>Release: 2021/07/14</span>
        <a className={styles.Right}>Help</a>
      </footer>
    </Provider>
  );
}

export default App;
