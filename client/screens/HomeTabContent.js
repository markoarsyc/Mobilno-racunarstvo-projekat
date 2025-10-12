import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import MoviesCarousel from "../components/MoviesCarousel";

export default function HomeTabContent({ route }) {
  const { loggedInUser } = route.params;

  return (
    <ScrollView style={styles.container}>
      <MoviesCarousel heading={"🔥Trending"} apiParam={"popular"}/>
      <MoviesCarousel heading={"🍿Trenutno u bioskopima"} apiParam={"now_playing"}/>
      <MoviesCarousel heading={"⭐Najbolje ocenjeni"} apiParam={"top_rated"}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  text: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
  },
});
