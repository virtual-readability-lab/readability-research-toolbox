// import styles from "./Controls.module.css"
import {Flex, Slider, TextField, Picker, Item, Switch, View, ActionButton} from "@adobe/react-spectrum";
import {useControls} from "./Main";
import FileChooser from "./FileChooser";
import ColorPicker from "./ColorPicker";
import {ColorResult} from "react-color";
import {clearLogRecords, downloadAllLogRecords} from "./logging";
import styles from "./Controls.module.css"

const Controls = (props: {
  updateControlValue: (name: string, value: boolean | number | string) => void
}) => {
  const controls = useControls();
  const fonts = [
    'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact', 'Microsoft Sans Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'
  ] // this is the intersection of standard font sets for Windows and Mac
  const fontItems = fonts.map((item) => <Item key={item}>{item}</Item>);
  return (
    <Flex direction="column" gap="10px" margin="10px">
      <FileChooser updateControlValue={props.updateControlValue}/>
      <Picker label="Font name" selectedKey={controls.fontName} onSelectionChange={(val) => {
        props.updateControlValue('fontName', val)
      }} labelPosition="side">
        {fontItems}
      </Picker>
      <Slider label="Font size (px)" value={controls.fontSize} onChange={(val) => {
        props.updateControlValue('fontSize', val)
      }} minValue={10} maxValue={64} labelPosition="side"/>
      <Slider label="Line height" value={controls.lineHeight} onChange={(val) => {
        props.updateControlValue('lineHeight', val)
      }} minValue={1} maxValue={5} step={0.1} labelPosition="side"/>
      <Slider label="Character spacing (em)" value={controls.characterSpacing} onChange={(val) => {
        props.updateControlValue('characterSpacing', val)
      }} minValue={-1} maxValue={4} step={0.1} labelPosition="side"/>
      <Slider label="Word spacing (em)" value={controls.wordSpacing} onChange={(val) => {
        props.updateControlValue('wordSpacing', val)
      }} minValue={-1} maxValue={10} step={0.1} labelPosition="side"/>
      <Slider label="Paragraph indent (em)" value={controls.paragraphIndent} onChange={(val) => {
        props.updateControlValue('paragraphIndent', val)
      }} minValue={-5} maxValue={5} step={0.1} labelPosition="side"/>
      <Picker label="Text alignment" defaultSelectedKey={controls.textAlignment as string} onSelectionChange={(key) => {
        props.updateControlValue('textAlignment', key)
      }} labelPosition="side">
        <Item key="start">Left</Item>
        <Item key="end">Right</Item>
        <Item key="center">Center</Item>
        <Item key="justify">Justify</Item>
      </Picker>
      <Slider label="Column width (in)" value={controls.columnWidth} onChange={(val) => {
        props.updateControlValue('columnWidth', val)
      }} minValue={2} maxValue={8} step={0.2} labelPosition="side"/>
      <ColorPicker label="Background color" currentColor={controls.backgroundColor}
                   setColor={(c: ColorResult) => {
                     console.log(c)
                     props.updateControlValue('backgroundColor', c.hex)
                   }}/>
      <ColorPicker label="Foreground color" currentColor={controls.foregroundColor}
                   setColor={(c: ColorResult) => {
                     console.log(c)
                     props.updateControlValue('foregroundColor', c.hex)
                   }}/>
      <div><Switch isSelected={controls.showRuler} onChange={(val) => {
        props.updateControlValue('showRuler', val)
      }}>Show reading ruler</Switch>
        <Switch isSelected={controls.rulerUnderline} isHidden={!controls.showRuler} onChange={(val) => {
          props.updateControlValue('rulerUnderline', val)
        }}>Underline ruler</Switch></div>
      <View paddingStart="25px" isHidden={!controls.showRuler || controls.rulerUnderline} width="300px">
        <Switch isSelected={controls.rulerInvert} onChange={(val) => {
          props.updateControlValue('rulerInvert', val)
        }}>Invert ruler (gray-box)</Switch>
        <Switch isSelected={controls.rulerDisableMouse} onChange={(val) => {
          props.updateControlValue('rulerDisableMouse', val)
        }}>Disable mouse</Switch>
        <Slider label="Ruler height (em)" value={controls.rulerHeight} onChange={(val) => {
          props.updateControlValue('rulerHeight', val)
        }} minValue={1} maxValue={10} step={0.1} labelPosition="side"/>
        <Slider label="Ruler opacity" value={controls.rulerOpacity} onChange={(val) => {
          props.updateControlValue('rulerOpacity', val)
        }} minValue={0} maxValue={1} step={0.01} labelPosition="side"/>
        <Slider label="Ruler transition height" value={controls.rulerTransitionHeight} onChange={(val) => {
          props.updateControlValue('rulerTransitionHeight', val)
        }} minValue={0} maxValue={10} step={1} labelPosition="side"/>
        <ColorPicker label="Ruler background color" currentColor={controls.rulerBackgroundColor}
                     setColor={(c: ColorResult) => {
                       console.log(c)
                       props.updateControlValue('rulerBackgroundColor', c.hex)
                     }}/>
      </View>
      <div className={styles.ButtonRow}>
        <ActionButton onPress={downloadAllLogRecords}>Download log</ActionButton>
        <ActionButton onPress={clearLogRecords} isHidden={true}>Clear log</ActionButton>
        <ActionButton onPress={() => props.updateControlValue('reset', 0)}>Reset controls</ActionButton>
      </div>
    </Flex>
  )
}

export default Controls;
