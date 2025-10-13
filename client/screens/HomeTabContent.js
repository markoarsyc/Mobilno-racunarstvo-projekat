import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import MoviesCarousel from "../components/MoviesCarousel";

export default function HomeTabContent({ route }) {
  const { loggedInUser } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🎬 MovieTracker</Text>
      <MoviesCarousel
        heading={"🔥Trending"}
        apiParam={"popular"}
        loggedInUser={loggedInUser}
      />
      <MoviesCarousel
        heading={"🍿Trenutno u bioskopima"}
        apiParam={"now_playing"}
        loggedInUser={loggedInUser}
      />
      <MoviesCarousel
        heading={"⭐Najbolje ocenjeni"}
        apiParam={"top_rated"}
        loggedInUser={loggedInUser}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  heading: {
    paddingTop:60,
    fontSize: 40,
    fontWeight: "700",
    color: "#FFD700",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    marginLeft:5,
  },
  text: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
  },
});
