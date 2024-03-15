import { useState } from "react"
import { supabase } from "@/lib/supabase";

import { View, StyleSheet } from "react-native" 
import { Button, FAB, TextInput } from "react-native-paper"
import { Redirect, Link, Stack } from 'expo-router'

import { useAuth } from "@/providers";

export default function LoginScreen() {

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [hidePassword, setHidePassword] = useState<boolean>(true);

	const { session } = useAuth()

	console.log("session", session)

	async function signInWithEmail() {
    setLoading(true);
		console.log(email, password)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
		console.log("err", error)
    if (error) alert(error.message);
    setLoading(false);
  }

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'Index'}} />
			<TextInput
				value={email}
				onChangeText={text => setEmail(text)}
				mode="outlined"
				placeholder="Username"
        style={styles.input}
			></TextInput>

			<TextInput
				value={password}
				onChangeText={text => setPassword(text)}
				mode="outlined"
				placeholder="Password"
				secureTextEntry={hidePassword}
        style={styles.input}
			></TextInput>

			<FAB
				label={loading ? "Logging In..." : "Login"}
				uppercase
				disabled={loading}
				onPress={() => signInWithEmail()}
			></FAB>

			<Button
				disabled={loading}
			>
				<Link href="/signUp">
					Create Account
				</Link>
			</Button>
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
		marginBottom: 20,
	},

	label: {
		color: 'gray',
		fontSize: 16
	}
})