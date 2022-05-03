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

import styles from "./App.module.css"
import {darkTheme, Heading, lightTheme, Provider} from "@adobe/react-spectrum";
import Main from "./components/Main";
import {useState} from "react";

export const VERSION = '2022/02/11'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Provider theme={isDarkMode ? darkTheme : lightTheme} height="100%">
      <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
        <header className={styles.Header}>
          <div style={{flexDirection: 'column'}}>
            <Heading level={2} marginBottom="0" marginTop="0">Reading Controls Tester</Heading>
          </div>
        </header>
        <Main setTheme={setIsDarkMode}/>
        <footer className={styles.Footer}>
          <span className={styles.Left}/>
          <span className={styles.Center}>Release: {VERSION}</span>
          <span/>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
