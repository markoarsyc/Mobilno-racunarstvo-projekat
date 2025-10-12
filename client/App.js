import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();
const apiUrl = "http://192.168.1.5:8000/api";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#FFD700",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerBackTitle: "Nazad",
        }}
      >
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Registracija" }}
          initialParams={{ apiUrl }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Prijava" }}
          initialParams={{ apiUrl, setLoggedInUser }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
          initialParams={{ apiUrl, loggedInUser, setLoggedInUser }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
