import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RateMovieModal({
  visible,
  onClose,
  onSubmit,
  initialRating = 0,
  initialReview = "",
  isEditing = false,
}) {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);

  // Kada se modal otvori, popuni vrednosti iz props
  useEffect(() => {
    if (visible) {
      setRating(initialRating);
      setReview(initialReview);
    }
  }, [visible, initialRating, initialReview]);

  const handleRate = (value) => setRating(value);

  const handleSubmit = async () => {
    try {
      await onSubmit({ rating, review });
      setRating(0);
      setReview("");
      onClose();
    } catch (error) {
      console.error("Greška prilikom slanja ocene:", error);
    }
  };

  const starsRows = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
  ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {isEditing ? "Izmeni recenziju" : "Oceni film"}
          </Text>

          {starsRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.starRow}>
              {row.map((starNumber) => (
                <TouchableOpacity
                  key={starNumber}
                  onPress={() => handleRate(starNumber)}
                >
                  <Ionicons
                    name={starNumber <= rating ? "star" : "star-outline"}
                    size={32}
                    color="#FFD700"
                    style={styles.star}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <TextInput
            style={styles.input}
            placeholder="Unesite komentar..."
            placeholderTextColor="#aaa"
            multiline
            value={review}
            onChangeText={setReview}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={[styles.btnText, { color: "#fff" }]}>Otkaži</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.btnText}>
                {isEditing ? "Sačuvaj izmene" : "Oceni"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 20,
    width: "85%",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  star: {
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    fontSize: 15,
    marginVertical: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#555",
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: "center",
  },
  submitBtn: {
    flex: 1,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
