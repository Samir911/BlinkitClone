import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../style/Colors";

const Print = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#f8cd4b", '#fbf9ed']} // Gradient colors
          start={{ x: 0, y: 0 }} // Top-left
          end={{ x: 0, y: 1 }} // Bottom-right
          style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
              <Text style={styles.deliveryTime}>Blinkit in</Text>
              <Text style={styles.time}>12 minutes</Text>
              <Text style={styles.location}>
                Millenium Business Park, Kopar <MaterialIcons name="arrow-drop-down" size={18} />
              </Text>
            </View>
            <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => { navigation.navigate("Profile"); }}>
              <Ionicons name="person-circle-outline" size={32} color="#404040" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="black" style={styles.searchIcon} />
            <TextInput placeholder='Search "chips"' style={styles.searchInput} />
            <Ionicons name="mic-outline" size={18} color="#363636" />
          </View>
        </LinearGradient>
      </View>

      <StatusBar backgroundColor={'#f8cd4b'} barStyle={'dark-content'} translucent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  deliveryTime: { fontSize: 11, fontWeight: "bold", fontFamily: "Montserrat-Bold", marginBottom: 1 },
  time: { fontSize: 24, fontWeight: "bold", fontFamily: "Montserrat-Bold" },
  location: { fontSize: 12, fontFamily: "Montserrat-Regular" },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#e2e2e0'
  },
  searchIcon: { marginRight: 10, color: '#363636' },
  searchInput: { flex: 1, fontSize: 14, fontFamily: "Montserrat-Medium", color: '#666977' },
  categorySection: { marginTop: 15, marginHorizontal: 10 },
  categoryTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, fontFamily: "Montserrat-Bold", color: Colors.gunmetalGray },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap" },
  categoryCard: { width: "23%", alignItems: "center", marginBottom: 15, marginRight: "2%" },
  categoryCard1: { width: "31%", marginBottom: 15, marginRight: "2%", backgroundColor: Colors.iceBlue, borderRadius: 15 },
  categoryImage: { width: 60, height: 60, resizeMode: 'contain', borderRadius: 15 },
  categoryImage1: { width: 50, height: 50, resizeMode: 'contain', borderRadius: 15 },
  categoryText: { textAlign: "center", fontSize: 12, marginTop: 5, fontFamily: "Montserrat-Medium", color: Colors.CharcoalGray },
  categoryText1: { textAlign: "center", fontSize: 12, marginVertical: '10%', marginHorizontal: '10%', fontFamily: "Montserrat-Medium", color: Colors.CharcoalGray },
  categoryCounts: { textAlign: "center", fontSize: 8, fontFamily: "Montserrat-Medium", color: Colors.black, marginTop: 3, marginHorizontal: 5 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#555", fontFamily: "Montserrat-Regular" },
  districtTag: {
    backgroundColor: "purple",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  districtText: { color: "white", fontSize: 12, fontWeight: "bold", fontFamily: "Montserrat-Bold" },
  goToTopButton: {
    position: "absolute",
    top: '25%',
    left: '35%',
    backgroundColor: Colors.black,
    paddingVertical: 10,
    paddingStart: 10,
    paddingEnd: 15,
    borderRadius: 50,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default Print;
