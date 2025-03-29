import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../style/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  const categories = [
    {
      title: "Grocery & Kitchen",
      items: [
        { name: "Vegetables & Fruits", image: "https://via.placeholder.com/80/92c952" },
        { name: "Atta, Rice & Dal", image: "https://via.placeholder.com/80/771796" },
        { name: "Oil, Ghee & Masala", image: "https://via.placeholder.com/80/24f355" },
        { name: "Dairy, Bread & Eggs", image: "https://via.placeholder.com/80/d32776" },
        { name: "Bakery & Biscuits", image: "https://via.placeholder.com/80/f66b97" },
        { name: "Dry Fruits & Cereals", image: "https://via.placeholder.com/80/56a8c2" },
        { name: "Chicken, Meat & Fish", image: "https://via.placeholder.com/80/b0f7cc" },
        { name: "Kitchenware & Appliances", image: "https://via.placeholder.com/80/54176f" },
      ],
    },
    {
      title: "Snacks & Drinks",
      items: [
        { name: "Chips & Namkeen", image: "https://via.placeholder.com/80/51aa97" },
        { name: "Sweets & Chocolates", image: "https://via.placeholder.com/80/4aa973" },
        { name: "Drinks & Juices", image: "https://via.placeholder.com/80/2a93ea" },
        { name: "Tea, Coffee & Milk Drinks", image: "https://via.placeholder.com/80/f4d03f" },
        { name: "Instant Food", image: "https://via.placeholder.com/80/a4c639" },
        { name: "Sauces & Spreads", image: "https://via.placeholder.com/80/eb9534" },
        { name: "Paan Corner", image: "https://via.placeholder.com/80/8e44ad" },
        { name: "Ice Creams & Frozen", image: "https://via.placeholder.com/80/3498db" },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.deliveryTime}>Blinkit in</Text>
          <Text style={styles.time}>12 minutes ⏳ 24/7</Text>
          <Text style={styles.location}>
            Millenium Business Park, Kopar <MaterialIcons name="arrow-drop-down" size={18} />
          </Text>
        </View>
        <TouchableOpacity style={{opacity: 0.5}}>
          <Ionicons name="person-circle-outline" size={32} color="#404040" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="black" style={styles.searchIcon} />
        <TextInput placeholder='Search "chips"' style={styles.searchInput} />
        <Ionicons name="mic-outline" size={18} color="black" />
      </View>

      {/* Category Sections */}
      <FlatList
        data={categories}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <View style={styles.categoryGrid}>
              {item.items.map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryCard} onPress={() => {
                  navigation.navigate('ProductListing', {title: category.name});
                }}>
                  <Image source={{ uri: category.image }} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="reload-outline" size={24} color="black" />
          <Text style={styles.navText}>Order Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid-outline" size={24} color="green" />
          <Text style={[styles.navText, { color: "green" }]}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="print-outline" size={24} color="black" />
          <Text style={styles.navText}>Print</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.districtTag}>
            <Text style={styles.districtText}>district</Text>
          </View>
        </TouchableOpacity>
      </View> */}
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} translucent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
  },
  deliveryTime: { fontSize: 12, fontWeight: "bold", fontFamily: "Montserrat-Bold", marginBottom: 1 },
  time: { fontSize: 18, fontWeight: "bold", fontFamily: "Montserrat-Bold" },
  location: { fontSize: 12, fontFamily: "Montserrat-Regular" },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
  },
  searchIcon: { marginRight: 10, color: '#323232' },
  searchInput: { flex: 1, fontSize: 14, fontFamily: "Montserrat-MEdium" },
  categorySection: { marginTop: 15, marginHorizontal: 10 },
  categoryTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, fontFamily: "Montserrat-Bold", color: Colors.gunmetalGray },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap" },
  categoryCard: { width: "23%", alignItems: "center", marginBottom: 15, marginRight: "2%" },
  categoryImage: { width: 80, height: 80, borderRadius: 15, backgroundColor: Colors.iceBlue, padding: 5 },
  categoryText: { textAlign: "center", fontSize: 12, marginTop: 5, fontFamily: "Montserrat-Medium", color: Colors.CharcoalGray },
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
});

export default Home;
