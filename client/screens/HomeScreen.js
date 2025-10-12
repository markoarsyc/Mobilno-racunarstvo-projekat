import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeTabContent from "./HomeTabContent";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ route }) {
  const { loggedInUser, setLoggedInUser, apiUrl } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#FFD700",
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#888",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#FFD700",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Početna") {
            iconName = "home";
          } else if (route.name === "Profil") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Početna"
        component={HomeTabContent}
        initialParams={{ loggedInUser }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        initialParams={{ loggedInUser, setLoggedInUser, apiUrl }}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
}
