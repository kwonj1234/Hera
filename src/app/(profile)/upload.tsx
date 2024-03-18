import { useState } from "react"

import { View, Text } from "react-native"
import { Stack } from "expo-router"

import { StyleSheet } from "react-native"

import { DocumentUploader } from "@/components"
import { TextInput } from "react-native-paper"

export default function ProfileScreen() {
  const [labDate, setLabDate] = useState(undefined);
  const [notes, setNotes] = useState<string>("");

  const header = {
		title: "Upload Document",
	}
	
	return (
		<View>
      <Stack.Screen options={header} />
      <TextInput
				value={notes}
				onChangeText={text => setNotes(text)}
				mode="outlined"
				placeholder="Notes"
        style={styles.input}
			></TextInput>
			<DocumentUploader
				onResponse={() => console.log()}
				mode="text"
			>
				Choose File
			</DocumentUploader>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10
	},

	input: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 20
	},

	label: {
		color: 'gray',
		fontSize: 16
	}
})