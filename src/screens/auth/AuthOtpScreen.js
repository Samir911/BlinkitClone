import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OtpInputs from "react-native-otp-inputs";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";

const AuthOtpScreen = ({ navigation, route }) => {
  const [phone, setPhone] = useState(route.params?.phone || "");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (phone) {
      sendOtp(phone);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (confirmation && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [confirmation, timer]);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const showToast = (type, message) => {
    Toast.show({
      type,
      text1: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const sendOtp = async (phoneNumber) => {
    try {
      const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;
      const confirmationResult = await auth().signInWithPhoneNumber(formattedPhone);
      setConfirmation(confirmationResult);
      setTimer(30);
      setCanResend(false);
      showToast("success", "OTP sent successfully!");
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      if (!confirmation) {
        showToast("error", "No verification ID found. Please resend OTP.");
        return;
      }
      const userCredential = await confirmation.confirm(otp);

      console.log('1111111111111', userCredential);

      // Store user session in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));

      showToast("success", "OTP Verified Successfully!");

      // Navigate to Home Screen & prevent going back
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabNavigator" }],
      });
    } catch (error) {
      showToast("error", "Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>OTP Verification</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>We've sent a verification code to</Text>
      <Text style={styles.phoneNumber}>{`+91 ${phone}`}</Text>

      {/* OTP Input */}
      <OtpInputs
        handleChange={(code) => {
          setTimeout(() => setOtp(code), 0);
        }}
        numberOfInputs={6}
        style={styles.otpContainer}
        inputStyles={styles.otpInput}
      />

      {/* Resend OTP */}
      {canResend ? (
        <TouchableOpacity onPress={() => sendOtp(phone)}>
          <Text style={styles.resendOtp}>Resend OTP</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.resendOtp}>Resend OTP in {timer} sec</Text>
      )}

      {/* Toast Message Component */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    padding: 15,
  },
  backButton: {
    marginEnd: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    fontSize: 13,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
    color: "#555",
    marginTop: 25,
  },
  phoneNumber: {
    fontSize: 13,
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
    marginBottom: 25,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    alignContent: "center",
    backgroundColor: "#EDEDFF",
  },
  resendOtp: {
    color: "green",
    textAlign: "center",
    fontSize: 11,
    fontFamily: "Montserrat-Medium",
    marginTop: 15,
  },
});

export default AuthOtpScreen;
