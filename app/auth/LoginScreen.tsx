import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import API_URL from "../../config/config";

export default function LoginScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = async () => {
		try {
			const response = await axios.post(`${API_URL}/api/auth/login`, {
				username,
				password,
			});
			const { token } = response.data.data;
			await AsyncStorage.setItem("token", token);
			router.replace("/(tabs)"); // Prevent back navigation to login
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message || "An error occurred";
			Alert.alert("Login Failed", errorMessage);
		}
	};

	return (
		<ThemedView style={styles.container}>
			<Image
				source={require("../../assets/images/logofl.jpg")}
				style={styles.logo}
			/>
			<Text style={styles.title}>Welcome Back!</Text>
			<Text style={styles.subtitle}>Log in to continue</Text>
			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TouchableOpacity
				style={styles.loginButton}
				onPress={handleLogin}
			>
				<Text style={styles.loginButtonText}>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.registerButton}
				onPress={() => router.push("/auth/RegisterScreen")}
			>
				<Text style={styles.registerButtonText}>Register</Text>
			</TouchableOpacity>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#6a11cb", 
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 24,
        resizeMode: "contain",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#ffffff",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        color: "#e0e0e0",
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#ffffff30", 
        fontSize: 16,
        color: "#ffffff",
    },
    registerButton: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff30",
        marginBottom: 16,
    },
    registerButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },
    loginButton: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff30",
    },
    loginButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },
});
