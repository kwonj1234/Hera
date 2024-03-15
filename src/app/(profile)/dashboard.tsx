import { View, Text } from "react-native"
import { Stack } from "expo-router"
import { DocumentUploader } from "@/components"

export default function ProfileScreen() {
  return (
		<View>
      <Stack.Screen options={{ title: 'Sign Up'}} />
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