import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { persistor, store } from "./src/redux/store";
import Loader from "./src/screens/view/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        setLoading(true);

        const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
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
      <Loader />
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainStackNavigator />
          </PersistGate>
        </Provider>
      </View>
    </SafeAreaProvider>
  );
}
