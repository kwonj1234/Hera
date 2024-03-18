import { View, Text } from "react-native"
import { Stack } from "expo-router"
import { DocumentUploader, SignOutButton } from "@/components"

import { useAuth } from "@/providers"

export default function ProfileScreen() {
	const { user } = useAuth()
	console.log(user)
  const header = {
		title: "Profile",
		headerRight: () => <SignOutButton>Sign Out</SignOutButton>
	}
	
	return (
		<View>
      <Stack.Screen options={header} />
			<Text>Hello {user?.firstName} {user?.lastName}</Text>
			<DocumentUploader
				onResponse={() => console.log()}
				mode="text"
			>
				Upload
			</DocumentUploader>
		</View>
	)
}