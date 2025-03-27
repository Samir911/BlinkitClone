import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const categories = [
    { name: "All", image: "https://via.placeholder.com/50" },
    { name: "Fresh Vegetables", image: "https://via.placeholder.com/50" },
    { name: "Fresh Fruits", image: "https://via.placeholder.com/50" },
    { name: "Exotics", image: "https://via.placeholder.com/50" },
    { name: "Coriander & Others", image: "https://via.placeholder.com/50" },
    { name: "Flowers & Leaves", image: "https://via.placeholder.com/50" },
];

const filters = ["Filters", "Sort", "Onion", "Tomato"];

const products = [
    {
        id: "1",
        name: "Pooja Flower Mix",
        weight: "100 g",
        price: 39,
        mrp: 53,
        discount: "26% OFF",
        time: "15 MINS",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "2",
        name: "Onion (Kanda)",
        weight: "0.95-1.05 kg",
        price: 35,
        mrp: 47,
        discount: "25% OFF",
        time: "15 MINS",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "3",
        name: "Banana (Keli)",
        weight: "3 pieces",
        price: 30,
        mrp: 39,
        discount: "23% OFF",
        time: "15 MINS",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "4",
        name: "Coriander Bunch",
        weight: "2 x 100 g",
        price: 23,
        mrp: 30,
        discount: "23% OFF",
        time: "15 MINS",
        image: "https://via.placeholder.com/150",
    },
];

const ProductListingScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>{route.params.title}</Text>
            </View>

            <View style={styles.mainContent}>
                {/* Sidebar Categories */}
                <ScrollView style={styles.sidebar} showsVerticalScrollIndicator={false}>
                    {categories.map((item, index) => (
                        <View key={index} style={styles.categoryItem}>
                            <Image source={{ uri: item.image }} style={styles.categoryImage} />
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Product List */}
                <View style={styles.productContainer}>
                    {/* Filters Row */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
                        {filters.map((filter, index) => (
                            <TouchableOpacity key={index} style={styles.filterButton}>
                                <Text style={styles.filterText}>{filter}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Product Grid */}
                    <FlatList
                        data={products}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.productCard}>
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productWeight}>{item.weight}</Text>
                                <Text style={styles.productPrice}>₹{item.price} <Text style={styles.mrp}>MRP ₹{item.mrp}</Text></Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>ADD</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { flexDirection: "row", padding: 15, borderBottomWidth: 1, borderColor: "#ddd", alignItems: "center" },
    title: { fontSize: 16, fontFamily: "Montserrat-Bold", marginLeft: 10 },
    mainContent: { flexDirection: "row" },
    sidebar: { backgroundColor: "#f8f8f8", paddingVertical: 10, borderRightWidth:1 },
    categoryItem: { width: 80, alignItems: "center", marginBottom: 15 },
    categoryImage: { width: 50, height: 50, borderRadius: 25, padding: 5, backgroundColor: 'silver', marginBottom:5 },
    categoryText: { fontSize: 12, fontFamily: "Montserrat-Medium", textAlign: 'center' },
    productContainer: { padding: 10 },
    filtersRow: { flexDirection: "row", marginBottom: 10 },
    filterButton: { padding: 8, borderRadius: 5, backgroundColor: "#e0e0e0", marginRight: 8 },
    filterText: { fontSize: 12, fontFamily: "Montserrat-Medium" },
    productCard: { flex: 1, backgroundColor: "#fff", margin: 5, padding: 10, borderRadius: 8, elevation: 3 },
    productImage: { width: "100%", height: 120, borderRadius: 8 },
    productName: { fontSize: 14, fontFamily: "Montserrat-SemiBold", marginTop: 5 },
    productWeight: { fontSize: 12, color: "gray", fontFamily: "Montserrat-Medium" },
    productPrice: { fontSize: 14, fontFamily: "Montserrat-Bold", color: "green" },
    mrp: { fontSize: 12, color: "gray", textDecorationLine: "line-through" },
    addButton: { backgroundColor: "green", padding: 8, marginTop: 5, borderRadius: 5 },
    addButtonText: { color: "white", fontFamily: "Montserrat-Bold", textAlign: "center" },
});

export default ProductListingScreen;
