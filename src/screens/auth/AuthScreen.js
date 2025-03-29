import React, { useEffect, useState } from "react";
import { BackHandler, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../../style/Colors";
import Styles from "../../style/Styles";
import Loader from "../view/Loader";

const AuthScreen = ({ navigation }) => {

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (!navigation.isFocused()) {
        return false;
      } else {
        onBack();
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const onBack = () => {
    if (!loading) {
      BackHandler.exitApp();
    }
  }

  return (
    <SafeAreaView style={Styles.safe_area_view} >
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <Image source={require('../../assets/images/blinkit.png')} style={{ width: 100, height: 100 }} />
        <Text style={styles.title1}>India's last minute app</Text>
        <Text style={styles.title2}>Log In or Sign Up</Text>
        <View style={styles.numberTextinputView}>
          <Text style={styles.numberPrefix}>+91</Text>
          <TextInput
            style={{ flex: 1, fontFamily: 'Montserrat-SemiBold', fontSize: 14, letterSpacing: 1, marginStart: 5 }}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter mobile number"
            placeholderTextColor={'#808080'}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {phone.length > 0 && <TouchableWithoutFeedback onPress={() => setPhone("")}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="close-circle" size={20} color="black" />
            </View>
          </TouchableWithoutFeedback>}
        </View>
        <Pressable
          style={({ pressed }) => [{
            width: '95%',
            margin: 15,
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 15,
            backgroundColor: pressed ? phone.length == 10 ? '#800000' : "#606060" : phone.length == 10 ? '#008000' : "#808080"
          }]}
          onPress={() => {
            if (phone.length == 10) {
              navigation.navigate("AuthOtpScreen", { phone })// Navigate to OTP screen with phone number
            }
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>

        <View style={styles.divider} />
        <Text style={styles.tearmsCondition}>By continuing, you agree to our Terms of Service & Privacy Policy.</Text>

      </View>
      {loading && <Loader />}
      <StatusBar backgroundColor={Colors.background} style='light' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    backgroundColor: '#FFFFED'
  },
  title1: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: 'black'
  },
  title2: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '400',
    color: '#808080'
  },
  numberTextinputView: {
    height: 55,
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'silver',
    paddingHorizontal: 15
  },
  numberPrefix: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    letterSpacing: 1
  },
  button: {
    backgroundColor: "#2ecc71",
    padding: 12, borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  },
  continueButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: 'center'
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'silver',
    marginTop: 20
  },
  tearmsCondition: {
    marginHorizontal: 15,
    marginVertical: 7,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 8,
    color: "gray",
    textAlign: 'center'
  }
});

export default AuthScreen;
