import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useApi } from "../contexts/ApiContext";

export default function ReviewList({ loggedInUser}) {
  const [ratings, setRatings] = useState([]);
  const apiUrl = useApi();

  const api = axios.create({
    baseURL: apiUrl,
  });

  const getReviews = async () => {
    try {
      const response = await api.get(`reviews/user/${loggedInUser._id}`);
      setRatings(response.data);
    } catch (error) {
      console.log("Greška:", error.message);
    }
  };

  const handleDeleteReview = async (id)=> {
    try {
      await api.delete(`reviews/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReviews();
  }, [handleDeleteReview]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1}}>
        <Text style={styles.title}>{item.movieTitle}</Text>
        <Text style={styles.rating}>Ocena: {item.rating}/10</Text>
        <Text style={styles.comment}>{item.review}</Text>
        <Text style={styles.date}>{new Date(item.updatedAt).toLocaleDateString("sr-RS")}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteReview(item._id)}>
        <Ionicons name="trash-outline" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={ratings}
      renderItem={renderItem}
      keyExtractor={(item) => item._id.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
          Nema recenzija
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    width: "100%",
  },
  itemContainer: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    color: "#fff",
    marginTop: 5,
  },
  date: {
    color: "#aaa",
    marginTop:5,
  },
  comment: {
    color: "#ccc",
    marginTop: 5,
    fontStyle: "italic",
  },
});
