import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ProfileScreen({ route }) {
  const { loggedInUser } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Profil: {loggedInUser?.username || "Nepoznat korisnik"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFD700",
    fontSize: 20,
  },
});
