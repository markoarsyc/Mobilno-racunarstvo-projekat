import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 550;

export default function MovieDetails({ route }) {
  const { movieID } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovie = async () => {
      console.log(movieID);
      try {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTYxYzdlMDk2MzFiYWE3YzgxYWNkMDdlODU5MzhiMCIsIm5iZiI6MTc1OTc2MjQwOS4xOTEsInN1YiI6IjY4ZTNkN2U5MDE1MTM0ZDQ1NjYxN2Q1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kbFobxXppUO2N0Av_VuU5oECKpvJtk8IVEsitWkIyWY",
          },
        };
        const response = await axios.request(options);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieID]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.loading}>
        <Text style={styles.text}>Film nije pronađen</Text>
      </View>
    );
  }

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const genres = movie.genres
    ? movie.genres.map((g) => g.name).join(", ")
    : "N/A";

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        }
      >
        <Ionicons name="chevron-back" size={36} color="white" />
      </TouchableOpacity>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.imageBackground}
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,1)"]}
          style={styles.gradient}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>
            {releaseYear} • {genres} •{" "}
            {movie.runtime ? `${movie.runtime} min` : "N/A"}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.infoContainer}>
        {movie.tagline ? (
          <Text style={styles.tagline}>"{movie.tagline}"</Text>
        ) : null}

        <Text style={styles.info}>
          ⭐ Ocena: {movie.vote_average} ({movie.vote_count} glasova)
        </Text>

        <Text style={styles.sectionTitle}>Originalni opis:</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  imageBackground: {
    width: width,
    height: IMAGE_HEIGHT,
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: IMAGE_HEIGHT,
    bottom: 0,
  },
  headerText: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  infoContainer: {
    padding: 20,
  },
  tagline: {
    color: "#ccc",
    fontStyle: "italic",
    marginBottom: 10,
  },
  info: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  overview: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 15,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 50,
    padding: 5,
  },
});
