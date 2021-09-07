import styles from "./App.module.css"
import {darkTheme, Heading, lightTheme, Provider} from "@adobe/react-spectrum";
import Main from "./components/Main";
import {useState} from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Provider theme={isDarkMode ? darkTheme : lightTheme}>
      <header className={styles.Header}>
        <div style={{flexDirection: 'column'}}>
          <Heading level={2} marginBottom="0" marginTop="0">Reading Controls Panel</Heading>
        </div>
      </header>
      <Main setTheme={setIsDarkMode}/>
      <footer className={styles.Footer}>
        <span className={styles.Left}>Copyright &copy; 2021 Adobe, Inc.</span>
        <span className={styles.Center}>Release: 2021/09/07</span>
        <span />
      </footer>
    </Provider>
  );
}

export default App;
//        <a className={styles.Right}>Help</a>
