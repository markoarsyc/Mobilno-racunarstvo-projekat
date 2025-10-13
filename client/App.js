import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import MovieDetails from "./components/MovieDetails";
import { ApiProvider } from "./contexts/ApiContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  return (
    <ApiProvider>
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
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Prijava" }}
            initialParams={{setLoggedInUser }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
            initialParams={{loggedInUser, setLoggedInUser }}
          />
          <Stack.Screen
            name="Movie"
            component={MovieDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiProvider>
  );
}
