import styles from "./Controls.module.css"
import {Flex, Slider, TextField, Picker, Item} from "@adobe/react-spectrum";
import {ColorWheel} from '@react-spectrum/color'
import {useControls} from "./Main";

const Controls = (props: {
  updateControlValue: (name: string, value: boolean | number | string) => void
}) => {
  const controls = useControls();
  const fonts = [
    'Courier New', 'Verdana', 'Trebuchet MS', 'Georgia', 'Tahoma', 'Impact', 'Arial Black', 'Arial', 'Comic Sans MS', 'Times New Roman', 'Microsoft Sans Serif'
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
      <Slider label="Font size" value={controls.fontSize} onChange={(val) => {
        props.updateControlValue('fontSize', val)
      }} minValue={10} maxValue={64} labelPosition="side"/>
      <Slider label="Line height" value={controls.lineHeight} onChange={(val) => {
        props.updateControlValue('lineHeight', val)
      }} minValue={1} maxValue={5} step={0.1} labelPosition="side"/>
      <Slider label="Character spacing" value={controls.characterSpacing} onChange={(val) => {
        props.updateControlValue('characterSpacing', val)
      }} minValue={0} maxValue={10} labelPosition="side"/>
      <Slider label="Word spacing" value={controls.wordSpacing} onChange={(val) => {
        props.updateControlValue('wordSpacing', val)
      }} minValue={0} maxValue={10} labelPosition="side"/>
      <Slider label="Column width" value={controls.columnWidth} onChange={(val) => {
        props.updateControlValue('columnWidth', val)
      }} minValue={2} maxValue={8} step={0.2} labelPosition="side"/>
      <TextField label="Background color" value={controls.backgroundColor} onChange={(val) => {
        props.updateControlValue('backgroundColor', val)
      }} labelPosition="side" width="200px"/>
      <TextField label="Foreground color" value={controls.foregroundColor} onChange={(val) => {
        props.updateControlValue('foregroundColor', val)
      }} labelPosition="side"  width="200px"/>
    </Flex>
  )
}

export default Controls;