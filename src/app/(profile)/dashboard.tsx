import { View, Text } from "react-native"
import { Link, Stack } from "expo-router"
import { SignOutButton, MainDrawer } from "@/components"

import { useAuth } from "@/providers"
import { Button } from "react-native-paper"

export default function ProfileScreen() {
	const { user } = useAuth()
  const header = {
		title: "Profile",
		headerRight: () => <SignOutButton>Sign Out</SignOutButton>,
		headerLeft: () => <MainDrawer></MainDrawer>
	}
	
	return (
		<View>
      <Stack.Screen options={header} />
			<Text>Hello {user?.firstName} {user?.lastName}</Text>
			<Link href={"/upload"}>
				<Button>
					Upload
				</Button>
			</Link>
		</View>
	)
}