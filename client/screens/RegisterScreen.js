import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useApi } from "../contexts/ApiContext";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const apiUrl = useApi();
  const api = axios.create({
    baseURL: apiUrl,
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const newUser = {
      username,
      email,
      password,
    };
    try {
      await api.post("users", newUser);
      Alert.alert("Uspešno", "Uspešno ste se registrovali", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Greška", "Greška prilikom registracije");
      } else {
        Alert.alert("Greška", "Greška prilikom registracije");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            style={styles.input}
            placeholder="Korisničko ime"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Lozinka"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { backgroundColor: "#FFD700", borderColor: "#000" },
            ]}
            onPress={handleRegister}
          >
            {({ pressed }) => (
              <Text
                style={[
                  styles.buttonText,
                  pressed ? { color: "#000" } : { color: "#FFD700" },
                ]}
              >
                Registruj se
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
  },
});
