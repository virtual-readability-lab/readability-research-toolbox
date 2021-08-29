/*
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2021 Adobe
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any.  The
 * intellectual and technical concepts contained herein are
 * proprietary to Adobe and its suppliers and are protected
 * by all applicable intellectual property laws, including
 * trade secret and copyright laws.  Dissemination of this
 * information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained
 * from Adobe.
 *
 *
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