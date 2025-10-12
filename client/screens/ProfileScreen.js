import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import avatar from "../assets/avatar.png";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const { loggedInUser, setLoggedInUser, apiUrl } = route.params;
  const api = axios.create({
    baseURL: apiUrl,
  });
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

  const handleDeleteProfile = () => {
    Alert.alert("Brisanje", "Da li ste sigurni da želite da izbrišete profil", [
      { text: "Otkaži", style: "cancel" },
      {
        text: "Da",
        onPress: async() => {
          try {
            await api.delete(`users/${loggedInUser._id}`);
            console.log(loggedInUser);
            Alert.alert("Uspešno", "Profil uspešno izbrisan", [
              {
                text: "OK",
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Landing" }],
                  });
                },
              },
            ]);
          } catch (error) {
            Alert.alert("Greška", "Došlo je do greške");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.username}>{loggedInUser?.username}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Odjavi se</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteProfile}
        >
          <Text style={styles.deleteText}>Obriši profil</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
});
