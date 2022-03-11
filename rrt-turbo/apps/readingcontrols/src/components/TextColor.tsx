

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

import styles from "./TextColor.module.css";

const TextColor = (props: {
  textColor: string,
  backgroundColor: string,
  currentColor: { text: string, back: string },
  setColor: (newText: string, newBack: string) => void,
}) => {
  const isSelected = props.textColor === props.currentColor.text && props.backgroundColor === props.currentColor.back;
  const onSelect = () => {
    props.setColor(props.textColor, props.backgroundColor);
  }
  return (
    <div className={styles.TextColor + ' ' + (isSelected ? styles.Selected : '')} onClick={onSelect}
         style={{color: props.textColor, backgroundColor: props.backgroundColor}}>
      Abc
    </div>
  );
};

export default TextColor;