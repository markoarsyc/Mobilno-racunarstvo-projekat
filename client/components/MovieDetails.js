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
  Alert,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import RateMovieModal from "./RateMovieModal";
import { useApi } from "../contexts/ApiContext";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 550;

export default function MovieDetails({ route }) {
  const { movieID, loggedInUser } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState(null);
  const apiUrl = useApi();
  const api = axios.create({
    baseURL: apiUrl,
  });

  const handleCurrentReview = async () => {
    try {
      const response = await api.get(
        `reviews/user/${loggedInUser._id}/movie/${movieID}`
      );
      setCurrentRating(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCurrentReview();
  }, []);

  const handleRateSubmit = async (data) => {
    const { rating, review } = data;
    const postReview = {
      user: loggedInUser._id,
      movieAPI: movieID,
      movieTitle: movie.title,
      rating,
      review,
    };
    try {
      await api.post("reviews", postReview);
      Alert.alert("Uspešno", "Uspešno davanje recenzije", [
        {
          text: "OK",
          onPress: () => setIsModalVisible(false),
        },
      ]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Greška", "Greška prilikom davanja recenzije");
      } else {
        Alert.alert("Greška", "Greška prilikom davanja recenzije");
      }
    }
  };

  const handleRateUpdate = async (rating, review) => {
    try {
      await api.put(`reviews/${currentRating._id}`, { rating, review });
      Alert.alert("Uspešno", "Recenzija izmenjena");
      await handleCurrentReview(); // osvezi podatke
    } catch (error) {
      console.error("Greška pri ažuriranju recenzije:", error);
      Alert.alert("Greška", "Došlo je do greške pri ažuriranju recenzije.");
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovie = async () => {
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
      <View style={{ margin: 20 }}>
        {currentRating ? (
          <View
            style={{
              backgroundColor: "#1c1c1c",
              borderRadius: 10,
              padding: 15,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ color: "#FFD700", fontSize: 18, fontWeight: "bold" }}
            >
              Tvoja ocena: {currentRating.rating}/10
            </Text>
            <Text style={{ color: "#ccc", marginVertical: 10 }}>
              {currentRating.review}
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#FFD700",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
                Izmeni recenziju
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFD700",
              marginTop: 20,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>
              Oceni film
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <RateMovieModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={async (data) => {
          const { rating, review } = data;

          if (currentRating) {
            await handleRateUpdate(rating, review);
          } else {
            await handleRateSubmit(data);
            handleCurrentReview();
          }
        }}
        initialRating={currentRating?.rating}
        initialReview={currentRating?.review}
        isEditing={!!currentRating}
      />
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
