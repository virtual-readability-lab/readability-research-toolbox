// import styles from "./Controls.module.css"
import {Flex, Slider, TextField, Picker, Item, Switch, View} from "@adobe/react-spectrum";
import {useControls} from "./Main";

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
      <TextField width="350px" type="file" id="fileChooser"
                 aria-label="Choose file" isDisabled={true} label="Input file" labelPosition="side"/>
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
      <Slider label="Character spacing (px)" value={controls.characterSpacing} onChange={(val) => {
        props.updateControlValue('characterSpacing', val)
      }} minValue={0} maxValue={10} labelPosition="side"/>
      <Slider label="Word spacing (px)" value={controls.wordSpacing} onChange={(val) => {
        props.updateControlValue('wordSpacing', val)
      }} minValue={0} maxValue={10} labelPosition="side"/>
      <Slider label="Column width (in)" value={controls.columnWidth} onChange={(val) => {
        props.updateControlValue('columnWidth', val)
      }} minValue={2} maxValue={8} step={0.2} labelPosition="side"/>
      <TextField label="Background color" value={controls.backgroundColor} onChange={(val) => {
        props.updateControlValue('backgroundColor', val)
      }} labelPosition="side" width="200px"/>
      <TextField label="Foreground color" value={controls.foregroundColor} onChange={(val) => {
        props.updateControlValue('foregroundColor', val)
      }} labelPosition="side" width="200px"/>
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
        <Slider label="Ruler height (px)" value={controls.rulerHeight} onChange={(val) => {
          props.updateControlValue('rulerHeight', val)
        }} minValue={10} maxValue={100} step={1} labelPosition="side"/>
        <Slider label="Ruler opacity" value={controls.rulerOpacity} onChange={(val) => {
          props.updateControlValue('rulerOpacity', val)
        }} minValue={0} maxValue={1} step={0.01} labelPosition="side"/>
        <Slider label="Ruler transition height" value={controls.rulerTransitionHeight} onChange={(val) => {
          props.updateControlValue('rulerTransitionHeight', val)
        }} minValue={0} maxValue={10} step={1} labelPosition="side"/>
        <TextField label="Ruler background color" value={controls.rulerBackgroundColor} onChange={(val) => {
          props.updateControlValue('rulerBackgroundColor', val)
        }} labelPosition="side" width="200px"/>
      </View>
    </Flex>
  )
}

export default Controls;