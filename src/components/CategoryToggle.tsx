import { ToggleButton } from "react-native-paper";

interface props {
  onValueChange: Function,
  value: 'physical' | 'dental' | 'vision',
  type: 'row' | 'group'
}

export default function CategoryToggle({onValueChange, value, type}: props) {
  return (
    type == 'group' ?
      <ToggleButton.Group
        onValueChange={(val) => onValueChange(val)}
        value={value}
      >
        <ToggleButton icon='heart' value='physical' />
        <ToggleButton icon='emoticon' value='dental' />
        <ToggleButton icon='glasses' value='vision' />
      </ToggleButton.Group>
    :
      <ToggleButton.Row
        onValueChange={(val) => onValueChange(val)}
        value={value}
      >
        <ToggleButton icon='heart' value='physical' />
        <ToggleButton icon='emoticon' value='dental' />
        <ToggleButton icon='glasses' value='vision' />
      </ToggleButton.Row>
  )
}