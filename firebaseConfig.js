import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKmAPG5jRx-xXjv5MFiui4KthXaETxz_A",
  authDomain: "blinkit-clone-2383a.firebaseapp.com",
  projectId: "blinkit-clone-2383a",
  storageBucket: "blinkit-clone-2383a.appspot.com",
  messagingSenderId: "1082208016043",
  appId: "1:1082208016043:android:4dbf8a679ea83c057c89ee",
};

// Initialize Firebase App
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage only once
let auth;
if (!getApps().length) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = getAuth(app);
}

export { app, auth };
