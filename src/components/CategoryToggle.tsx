import { StyleSheet, View } from "react-native";
import { Text, ToggleButton } from "react-native-paper";

interface props {
  onValueChange: Function,
  value: 'physical' | 'dental' | 'vision',
  type: 'row' | 'group'
}

export default function CategoryToggle({onValueChange, value, type}: props) {

  let Toggles
  if (type === 'group') {
    Toggles = (      
      <ToggleButton.Group
        onValueChange={(val) => onValueChange(val)}
        value={value}
      >
        <ToggleButton icon='heart' value='physical' accessibilityLabel="physical"/>
        <ToggleButton icon='emoticon' value='dental' accessibilityLabel="dental"/>
        <ToggleButton icon='glasses' value='vision' accessibilityLabel="vision"/>
      </ToggleButton.Group>
    )
  } else {
    Toggles = (
      <ToggleButton.Row
        onValueChange={(val) => onValueChange(val)}
        value={value}
      >
        <ToggleButton icon='heart' value='physical' accessibilityLabel="physical"/>
        <ToggleButton icon='emoticon' value='dental' accessibilityLabel="dental"/>
        <ToggleButton icon='glasses' value='vision' accessibilityLabel="vision"/>
      </ToggleButton.Row>
    )
  }

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Categories</Text>
      {Toggles}
      <Text style={styles.text}>{capitalizeFirstLetter(value)}</Text>
    </View>

  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignItems:'center',
	},

  text: {
    marginBottom:10,
    marginTop: 10
  }
})