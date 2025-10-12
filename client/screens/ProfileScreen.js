import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import avatar from "../assets/avatar.png"
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const { loggedInUser, setLoggedInUser } = route.params;

  const handleLogout = () => {
  Alert.alert("Odjava", "Da li ste sigurni da želite da se odjavite?", [
    { text: "Otkaži", style: "cancel" },
    {
      text: "Da",
      onPress: () => {
        setLoggedInUser(null);
        navigation.reset({
          index: 0,
          routes: [{ name: "Landing" }],
        });
      },
    },
  ]);
};

  return (
    <View style={styles.container}>
      <Image
        source={avatar}
        style={styles.avatar}
      />
      <Text style={styles.username}>{loggedInUser?.username}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Odjavi se</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
