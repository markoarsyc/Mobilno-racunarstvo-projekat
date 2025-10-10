import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function HomeScreen({route}) {
    const {loggedInUser} = route.params;
    return (
    <View style={styles.flex}>
      <Text style={styles.text}>{loggedInUser && loggedInUser.username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
});