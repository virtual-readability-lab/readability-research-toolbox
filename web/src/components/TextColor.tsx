

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