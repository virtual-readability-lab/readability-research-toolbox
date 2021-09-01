// import styles from "./Controls.module.css"
import {Flex, Slider, Picker, Item, Switch, View, ActionButton} from "@adobe/react-spectrum";
import {useControls} from "./Main";
import FileChooser from "./FileChooser";
import ColorPicker from "./ColorPicker";
import {clearLogRecords, downloadAllLogRecords} from "./logging";
import styles from "./Controls.module.css"
import {useState} from "react";
import SimpleFileChooser from "./SimpleFileChooser";

const Controls = (props: {
  updateControlValue: (name: string, value: boolean | number | string) => void
}) => {
  const [showFullFileChooser, setShowFullFileChooser] = useState(false);
  const controls = useControls();
  const fonts = [
    'Arial', 'Georgia', 'Merriweather', 'OpenSans', 'Poppins', 'Roboto', 'SourceSerifPro', 'Times'
  ]
  const fontItems = fonts.map((item) => <Item key={item}>{item}</Item>);
  return (
    <Flex direction="column" gap="10px" margin="10px">
      <div onDoubleClick={() => setShowFullFileChooser(true)}>
        {showFullFileChooser ?
          <FileChooser updateControlValue={props.updateControlValue}/>
          :
          <SimpleFileChooser updateControlValue={props.updateControlValue}/>
        }
      </div>
      <Picker label="Font name" selectedKey={controls.fontName} onSelectionChange={(val) => {
        props.updateControlValue('fontName', val)
      }} labelPosition="side">
        {fontItems}
      </Picker>
      <Slider label="Font size" value={controls.fontSize} onChange={(val) => {
        props.updateControlValue('fontSize', val)
      }} minValue={10} maxValue={64} labelPosition="side"/>
      <Slider label="Line height" value={controls.lineHeight} onChange={(val) => {
        props.updateControlValue('lineHeight', val)
      }} minValue={1} maxValue={5} step={0.1} labelPosition="side"/>
      <Slider label="Character spacing" value={controls.characterSpacing} onChange={(val) => {
        props.updateControlValue('characterSpacing', val)
      }} minValue={-1} maxValue={4} step={0.1} labelPosition="side"/>
      <Slider label="Word spacing" value={controls.wordSpacing} onChange={(val) => {
        props.updateControlValue('wordSpacing', val)
      }} minValue={-1} maxValue={10} step={0.1} labelPosition="side"/>
      <Slider label="Paragraph indent" value={controls.paragraphIndent} onChange={(val) => {
        props.updateControlValue('paragraphIndent', val)
      }} minValue={-0.5} maxValue={0.5} step={0.005} labelPosition="side"/>
      <Slider label="Paragraph spacing" value={controls.paragraphSpacing} onChange={(val) => {
        props.updateControlValue('paragraphSpacing', val)
      }} minValue={-1} maxValue={20} step={0.5} labelPosition="side"/>
      <Picker label="Text alignment" defaultSelectedKey={controls.textAlignment as string} onSelectionChange={(key) => {
        props.updateControlValue('textAlignment', key)
      }} labelPosition="side">
        <Item key="start">Left</Item>
        <Item key="end">Right</Item>
        <Item key="center">Center</Item>
        <Item key="justify">Justify</Item>
      </Picker>
      <Slider label="Column width" value={controls.columnWidth} onChange={(val) => {
        props.updateControlValue('columnWidth', val)
      }} minValue={2} maxValue={8} step={0.2} labelPosition="side"/>
      <Switch isSelected={controls.darkMode} onChange={(val) => {
        props.updateControlValue('darkMode', val)
      }}>Dark mode</Switch>
      <ColorPicker label="Text colors" currentColor={{text: controls.foregroundColor, back: controls.backgroundColor}}
                   setColor={(newText: string, newBack: string) => {
                     props.updateControlValue('foregroundColor', newText);
                     props.updateControlValue('backgroundColor', newBack);
                   }} darkMode={controls.darkMode}/>
      <Slider label="Contrast" value={controls.backgroundSaturation} onChange={(val) => {
        props.updateControlValue('backgroundSaturation', val)
      }} minValue={0} maxValue={100} step={1} labelPosition="side"/>
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
        <Slider label="Ruler height" value={controls.rulerHeight} onChange={(val) => {
          props.updateControlValue('rulerHeight', val)
        }} minValue={1} maxValue={10} step={0.1} labelPosition="side"/>
        <Slider label="Ruler opacity" value={controls.rulerOpacity} onChange={(val) => {
          props.updateControlValue('rulerOpacity', val)
        }} minValue={0} maxValue={1} step={0.01} labelPosition="side"/>
        <Slider label="Ruler transition height" value={controls.rulerTransitionHeight} onChange={(val) => {
          props.updateControlValue('rulerTransitionHeight', val)
        }} minValue={0} maxValue={10} step={1} labelPosition="side"/>

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
