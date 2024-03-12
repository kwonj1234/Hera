import { useState } from "react";
import { supabase } from "@/lib/supabase";

import { View, StyleSheet } from "react-native";
import { TextInput, FAB, Button } from "react-native-paper";
import { Link, Stack } from 'expo-router'


export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
	const [hidePassword, setHidePassword] = useState<boolean>(true);
  
  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  
    if (error) alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
			<Stack.Screen options={{ title: 'Sign Up'}} />
			<TextInput
				value={email}
				onChangeText={text => setEmail(text)}
				mode="outlined"
				placeholder="Email"
        style={styles.input}
			></TextInput>
      <TextInput
				value={password}
				onChangeText={text => setPassword(text)}
				mode="outlined"
				placeholder="Password"
        style={styles.input}
				secureTextEntry={hidePassword}
			></TextInput>

      <FAB
				label={loading ? "Creating Account..." : "Create Account"}
        disabled={loading}
				uppercase
        onPress={() => signUpWithEmail()}
			></FAB>

      <Button
				disabled={loading}
			>
				<Link href='/'>
					Go Back to Login
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
		marginBottom: 20
	},

	label: {
		color: 'gray',
		fontSize: 16
	}
})