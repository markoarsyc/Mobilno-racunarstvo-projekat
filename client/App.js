import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();
const apiUrl = "http://192.168.1.5:8000/api";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000", // crna pozadina
          },
          headerTintColor: "#FFD700", // žut tekst
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
          options={{ title: "Registracija"}}
          initialParams={{ apiUrl }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Prijava" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
