import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/dashboard/HomeScreen";
import AuthScreen from "./src/screens/auth/AuthScreen";
import AuthOtpScreen from "./src/screens/auth/AuthOtpScreen";
import { ActivityIndicator, View } from "react-native";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductListingScreen from "./src/screens/dashboard/ProductListingScreen";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        setLoading(true);
        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
          if (firebaseUser) {
            AsyncStorage.setItem("user", JSON.stringify(firebaseUser));
          } else {
            AsyncStorage.removeItem("user");
          }
          setLoading(false);
        });

        return () => unsubscribe(); // Cleanup function to avoid memory leaks
      } catch (error) {
        console.error("Error checking user session", error);
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="AuthOtp" component={AuthOtpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ProductListing" component={ProductListingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
