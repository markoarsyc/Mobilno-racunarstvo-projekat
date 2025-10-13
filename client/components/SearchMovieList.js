import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function SearchMovieList({ movies, loggedInUser }) {
  const navigation = useNavigation();
  if (!movies.length) return null;

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Movie", { movieID: item.id, loggedInUser});
          }}
        >
          <View style={styles.card}>
            {item.poster_path ? (
              <Image
                source={{ uri: IMG_URL + item.poster_path }}
                style={styles.poster}
              />
            ) : (
              <View style={styles.noImage}>
                <Text style={styles.noImageText}>Nema sliku</Text>
              </View>
            )}
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 15,
  },
  noImage: {
    width: 80,
    height: 120,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  noImageText: {
    color: "#777",
    fontSize: 12,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    flexShrink: 1,
  },
});
