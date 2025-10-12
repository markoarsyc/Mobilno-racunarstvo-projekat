import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function HomeTabContent({ route }) {
  const { loggedInUser } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Dobrodošao, {loggedInUser?.username || "korisniče"}!
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
    fontSize: 24,
    fontWeight: "bold",
  },
});
