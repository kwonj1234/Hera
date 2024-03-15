import { View, Text } from "react-native"
import { DocumentUploader } from "@/components"
import { Button } from "react-native-paper"

export default function ProfileScreen() {
  return (
		<View>
			<Text>Hello USER</Text>
			<DocumentUploader
				onResponse={() => console.log()}
				mode="text"
			>
				Upload
			</DocumentUploader>
		</View>
	)
}