import { View, Text, Pressable, StyleSheet, StatusBar } from "react-native";
import React from "react";

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎬 MovieTracker</Text>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('Register')}
        >
          {({ pressed }) => (
            <Text
              style={[styles.buttonText, pressed && styles.buttonTextPressed]}
            >
              Registracija
            </Text>
          )}
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          {({ pressed }) => (
            <Text
              style={[styles.buttonText, pressed && styles.buttonTextPressed]}
            >
              Prijava
            </Text>
          )}
        </Pressable>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFD700",
    marginBottom: 60,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#1a1a1a",
    borderWidth: 2,
    borderColor: "#FFD700",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "70%",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonPressed: {
    backgroundColor: "#FFD700",
  },
  buttonText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  buttonTextPressed: {
    color: "#000",
  },
});
