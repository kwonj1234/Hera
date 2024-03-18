import { useState } from "react";
import { supabase } from "@/lib/supabase";

import { View, StyleSheet } from "react-native";
import { ActivityIndicator, TextInput, FAB, Button } from "react-native-paper";
import { Redirect, Link, Stack, router } from 'expo-router'

import { useAuth } from "@/providers";
import { insertUser } from "@/api/users";


export default function SignUpScreen() {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
	const [hidePassword, setHidePassword] = useState<boolean>(true);

	const { session, loading: authLoading } = useAuth()

	if (authLoading) {
		return <ActivityIndicator />
	} else if (session) {
		return <Redirect href={"/(profile)/dashboard"}/>
	}
  
  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
			options: {
				data: {
					first_name: firstName.toLowerCase(),
					last_name: lastName.toLowerCase(),
				}
			}
    });
  
    if (error) alert(error.message);
		if (!error && data.user) await insertUser(firstName.toLowerCase(), lastName.toLowerCase(), data.user?.id, true)
    setLoading(false);
  }

  return (
    <View style={styles.container}>
			<Stack.Screen options={{ title: 'Sign Up'}} />
			<TextInput
				value={firstName}
				onChangeText={text => setFirstName(text)}
				mode="outlined"
				placeholder="First Name"
        style={styles.input}
			></TextInput>
			<TextInput
				value={lastName}
				onChangeText={text => setLastName(text)}
				mode="outlined"
				placeholder="Last Name"
        style={styles.input}
			></TextInput>
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
				onPress={() => {router.replace("/")}}
			>
					Go Back to Login
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