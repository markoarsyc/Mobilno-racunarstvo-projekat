import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import SearchMovieList from "../components/SearchMovieList";

const API_KEY = "3a61c7e09631baa7c81acd07e85938b0";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTYxYzdlMDk2MzFiYWE3YzgxYWNkMDdlODU5MzhiMCIsIm5iZiI6MTc1OTc2MjQwOS4xOTEsInN1YiI6IjY4ZTNkN2U5MDE1MTM0ZDQ1NjYxN2Q1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kbFobxXppUO2N0Av_VuU5oECKpvJtk8IVEsitWkIyWY";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchMovies(query);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchMovies = async (searchQuery) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchQuery
        )}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );

      setMovies(res.data.results || []);
    } catch (error) {
      console.error("Greška prilikom pretrage filmova:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pretraži filmove..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <SearchMovieList movies={movies} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    fontSize: 16,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
});
