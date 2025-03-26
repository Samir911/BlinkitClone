import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithPhoneNumber, PhoneAuthProvider } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import OtpInputs from "react-native-otp-inputs";

const AuthOtpScreen = ({ navigation, route }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (route.params && route.params.phone) {
      const phoneNumber = route?.params?.phone;
      setPhone(phoneNumber);
      sendOtp(phoneNumber);
    }
  }, []);

  useEffect(() => {
    if (verificationId) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        if (timer === 0) setCanResend(true);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [verificationId, timer]);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const sendOtp = async (phoneNumber) => {
    try {
      const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;
      console.log(formattedPhone);
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone);
      setVerificationId(confirmation.verificationId);
      setTimer(30);
      setCanResend(false);
      Alert.alert("Success", "OTP sent successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await auth.signInWithCredential(credential);
      navigation.replace("Home"); // ✅ Fixed typo
    } catch (error) {
      Alert.alert("Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>OTP verification</Text>
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
