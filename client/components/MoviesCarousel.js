import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 150; // širina jednog elementa

export default function MoviesCarousel({ heading, apiParam }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${apiParam}?language=en-US&page=1`,
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTYxYzdlMDk2MzFiYWE3YzgxYWNkMDdlODU5MzhiMCIsIm5iZiI6MTc1OTc2MjQwOS4xOTEsInN1YiI6IjY4ZTNkN2U5MDE1MTM0ZDQ1NjYxN2Q1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kbFobxXppUO2N0Av_VuU5oECKpvJtk8IVEsitWkIyWY",
          },
        };
        const response = await axios.request(options);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate("Movie", { movieID: item.id});
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.poster}
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    paddingVertical: 20,
    marginLeft: 5,
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    marginRight: 10,
  },
  poster: {
    width: "100%",
    height: 225,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
