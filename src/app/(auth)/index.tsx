import { useState } from "react"
import { supabase } from "@/lib/supabase";

import { View, StyleSheet } from "react-native" 
import { Button, FAB, TextInput } from "react-native-paper"

export default function LoginScreen() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  
    if (error) alert(error.message);
    setLoading(false);
  }

	return (
		<View style={styles.container}>
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
        style={styles.input}
			></TextInput>

			<FAB
				label={loading ? "Logging In..." : "Login"}
				uppercase
				disabled={loading}
			></FAB>

			<Button
				onPress={() => signUpWithEmail()}
				disabled={loading}
			>
				Sign Up
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
		marginBottom: 20
	},

	label: {
		color: 'gray',
		fontSize: 16
	}
})