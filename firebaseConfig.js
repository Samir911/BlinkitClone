import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKmAPG5jRx-xXjv5MFiui4KthXaETxz_A",
  authDomain: "blinkit-clone-2383a.firebaseapp.com",
  projectId: "blinkit-clone-2383a",
  storageBucket: "blinkit-clone-2383a.appspot.com", // ✅ Fixed URL
  messagingSenderId: "1082208016043",
  appId: "1:1082208016043:android:4dbf8a679ea83c057c89ee",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
