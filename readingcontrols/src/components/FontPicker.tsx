import {Item, Picker, Text} from "@adobe/react-spectrum";
import {useControls, useControlSetter} from "./Main";

export function FontPicker() {
  const controls = useControls();
  const controlSetter = useControlSetter();
  const fonts = [
    'Arial', 'Georgia', 'Merriweather', 'OpenSans', 'Poppins', 'Roboto', 'SourceSerifPro', 'Times'
  ];
  const fontItems = fonts.map((item) =>
    <Item key={item} >
      <Text UNSAFE_style={{fontFamily: item}}>{item}</Text>
    </Item>);
  return <Picker label="Font name" selectedKey={controls.fontName} onSelectionChange={(val) => {
    controlSetter('fontName', 'picker', val);
  }} labelPosition="side" width={250}>
    {fontItems}
  </Picker>;
}