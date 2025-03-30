import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../style/Colors";
import LogoutConfirmation from "../view/LogoutConfirmation";

const Profile = ({ navigation }) => {

  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUser(user);
        console.log(user);

      } else {
        setUser(null);
      }
    }
    fetchUser();
  }, [])

  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem("user"); // Clear user session
      setUser(null);
      navigation.reset({ index: 0, routes: [{ name: "Home" }] }); // Navigate to login
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  const customView = (icon, text) => {
    return <TouchableWithoutFeedback onPress={() => text === 'Log out' ? setLogoutVisible(true) : null}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor: Colors.iceBlue, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={icon} size={16} color={Colors.black} />
        </View>
        <Text style={{ flex: 1, fontSize: 12, fontFamily: 'Montserrat-Bold', color: Colors.gray, marginHorizontal: 10 }}>{text}</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.black} />
      </View>
    </TouchableWithoutFeedback>
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Ionicons name="arrow-back" size={20} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>{'Profile'}</Text>
      </View>

      <View style={styles.mainContent}>
        <Text style={{ fontSize: 24, fontFamily: 'Montserrat-Bold', color: Colors.gunmetalGray }}>Your account</Text>
        {user ?
          <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Medium', color: Colors.CharcoalGray }}>{user.phoneNumber.slice(3)}</Text>
          : <TouchableWithoutFeedback onPress={() => { navigation.navigate('AuthScreen') }}>
            <View>
              <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', color: Colors.CharcoalGray, marginTop: 5, marginBottom: 10 }}>Log in or sign up to view your complete profile</Text>
              <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, borderColor: Colors.accent }}>
                <Text style={{ textAlign: 'center', color: Colors.accent, fontSize: 16, fontFamily: 'Montserrat-Medium' }}>Continue</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        }
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: user ? Colors.card : Colors.iceBlue, marginTop: 20, borderRadius: 10 }}>
            {user && <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={'wallet-outline'} size={20} color={Colors.gunmetalGray} />
              <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Bold', color: Colors.gunmetalGray, marginTop: 5 }}>Zomato Money</Text>
            </View>}
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={'chatbox-ellipses-outline'} size={20} color={Colors.gunmetalGray} />
              <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Bold', color: Colors.gunmetalGray, marginTop: 5 }}>Support</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={'shield-checkmark-outline'} size={20} color={Colors.gunmetalGray} />
              <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Bold', color: Colors.gunmetalGray, marginTop: 5 }}>Payments</Text>
            </View>

          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', color: Colors.CharcoalGray }}>YOUR INFORMATION</Text>
            {customView('basket-outline', 'Your orders')}
            {user && customView('fast-food-outline', 'Bookmarked')}
            {customView('clipboard-outline', 'Address book')}
            {user && customView('document-text-outline', 'GST details')}
            {user && customView('gift-outline', 'E-Gift Cards')}
          </View>
          {user && <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', color: Colors.CharcoalGray }}>PAYMENTS AND COUPONS</Text>
            {customView('wallet-outline', 'Wallet')}
            {customView('wallet-outline', 'Zomato Money')}
            {customView('shield-checkmark-outline', 'Payment settings')}
            {customView('pricetags-outline', 'Collected coupons')}
          </View>}
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', color: Colors.CharcoalGray }}>OTHER INFORMATION</Text>
            {customView('paper-plane-outline', 'Share the app')}
            {customView('information-circle-outline', 'About us')}
            {user && customView('receipt-outline', 'Get Feeding India receipt')}
            {user && customView('lock-closed-outline', 'Account privacy')}
            {user && customView('notifications-outline', 'Notification preferences')}
            {user && customView('log-out-outline', 'Log out')}
          </View>
          <Text style={{ fontSize: 24, fontFamily: 'Montserrat-Bold', color: 'silver', textAlign: 'center', marginTop: 30 }}>Blinkit</Text>
          <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Bold', color: 'silver', textAlign: 'center', marginTop: -10, marginBottom: 15 }}>v17.7.2</Text>
        </ScrollView>
      </View >

      <LogoutConfirmation
        visible={isLogoutVisible}
        onConfirm={() => {
          setLogoutVisible(false);
          handleLogout();
        }}
        onCancel={() => setLogoutVisible(false)}
      />
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} translucent />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: "row", padding: 15, borderBottomWidth: 1, borderColor: "#ddd", alignItems: "center" },
  title: { fontSize: 16, fontFamily: "Montserrat-Bold", marginLeft: 10, color: Colors.black },
  mainContent: { flex: 1, paddingHorizontal: 15, paddingTop: 15 },
});

export default Profile;
