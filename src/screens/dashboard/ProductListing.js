import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from "../../redux/cartSlice";
import Colors from "../../style/Colors";


const categories = [
    { name: "All", image: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1719920085745-3" },
    { name: "Fresh Vegetables", image: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702463308432-3" },
    { name: "Fresh Fruits", image: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702734004998-8" },
    { name: "Exotics", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/278_1678705041060.png" },
    { name: "Coriander & Others", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/39_1677581549982.png" },
    { name: "Flowers & Leaves", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/1452_1617891490134.png" },
    { name: "Seasonal", image: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702734004998-3" },
    { name: "Freshly Cut & Sprouts", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/395_1668582176947.png" },
    { name: "Frozen Veg", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/157_1643443974388.png" },
    { name: "Certified Organic", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/742_1677580428980.png" },
];

const products = [
    {
        id: "1",
        name: "Pooja Flower Mix",
        weight: "100 g",
        price: 39,
        mrp: 53,
        discount: "26% OFF",
        time: "15 MINS",
        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/app/assets/products/sliding_images/jpeg/b20a0074-d4a3-4479-8090-ad5394866a33.jpg?ts=1732177291",
        type: 'Pooja Flowers',
        subCategory: 'Flowers & Leaves',
    },
    {
        id: "2",
        name: "Onion (Kanda)",
        weight: "0.95-1.05 kg",
        price: 35,
        mrp: 47,
        discount: "25% OFF",
        time: "15 MINS",
        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/app/assets/products/sliding_images/jpeg/a1ba074a-c085-4dd1-b4a4-2f247d6f211d.jpg?ts=1711010249",
        type: 'Onion',
        subCategory: 'Fresh Vegetables',
    },
    {
        id: "3",
        name: "Banana (Keli)",
        weight: "3 pieces",
        price: 30,
        mrp: 39,
        discount: "23% OFF",
        time: "15 MINS",
        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/app/assets/products/sliding_images/jpeg/fe0b1a25-65c8-4051-88be-4897bff884ed.jpg?ts=1711472717",
        type: 'Banana',
        subCategory: 'Fresh Fruits',
    },
    {
        id: "4",
        name: "Coriander Bunch",
        weight: "2 x 100 g",
        price: 23,
        mrp: 30,
        discount: "23% OFF",
        time: "15 MINS",
        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/9650bea9-b471-498e-abc1-3fc95085da44.jpg?ts=1737093001",
        type: 'Coriander',
        subCategory: 'Coriander & Others',
    },
    {
        id: "5",
        name: "Potato - New Crop (Batata)",
        weight: "0.95-1.05 kg",
        price: 35,
        mrp: 47,
        discount: "25% OFF",
        time: "11 MINS",
        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/c11437d7-3fa3-454c-a5b1-ec2dc911c014.jpg?ts=1734429255",
        type: 'Potato',
        subCategory: 'Fresh Vegetables',
    },
    {
        id: "6",
        name: "Broccoli",
        weight: "1 unit (200-300 g)",
        price: 29,
        mrp: 38,
        discount: "23% OFF",
        time: "11 MINS",
        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/dd62b379-9f84-4553-b8e6-2d18651634de.jpg?ts=1742115321",
        type: 'Broccoli',
        subCategory: 'Exotics',
    },
];

const ProductListing = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart, shallowEqual);

    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [typesFilters, setTypesFilters] = useState([]);
    const [cartData, setCartData] = useState(cartItems);

    useEffect(() => {
        setCartData(cartItems);
    }, [cartItems]);

    useEffect(() => {
        console.log('cart is - ', cartItems);
    }, [cartItems])

    useEffect(() => {
        if (selectedSubCategory === 'All') {
            setFilteredProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.subCategory === selectedSubCategory);
            setFilteredProducts(filteredProducts);
        }
    }, [selectedSubCategory])

    useEffect(() => {
        const uniqueTypes = [...new Set(filteredProducts.map(product => product.type))];
        setTypesFilters(uniqueTypes);
    }, [filteredProducts]);

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory); // ✅ State update will trigger `useEffect`
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back" size={20} color={Colors.black} />
                </TouchableOpacity>
                <Text style={styles.title}>{route.params.title}</Text>
            </View>

            <View style={styles.mainContent}>
                {/* Sidebar Categories */}
                <View>
                    <FlatList
                        data={categories}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.name}
                        style={styles.sidebar}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback onPress={() => handleSubCategoryChange(item.name)}>
                                <View style={styles.categoryItem}>
                                    <View style={{ flex: 1, flexDirection: 'column', alignItems: "center", paddingBottom: 5, marginEnd: item.name === selectedSubCategory ? 5 : 10 }}>
                                        <View style={{ width: 50, height: 50, borderRadius: 25, padding: 10, marginTop: 15, backgroundColor: '#ecffec', marginBottom: 5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={{ uri: item.image }} style={[styles.categoryImage, { marginTop: selectedSubCategory === item.name ? 0 : 15 }]} />
                                        </View>
                                        <Text style={[styles.categoryText, { color: selectedSubCategory === item.name ? '#3c3c3c' : '#8b8c91' }]}>{item.name}</Text>
                                    </View>
                                    {item.name === selectedSubCategory && <View style={{ flexDirection: 'column', width: 5, height: '100%', backgroundColor: Colors.accent, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} />
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        )} />
                </View>

                {/* Product List */}
                <View style={styles.productContainer}>
                    {/* Filters Row */}
                    <View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: 'silver', borderRadius: 10, marginEnd: 10, gap: 5, alignItems: 'center', backgroundColor: Colors.white }}>
                                <Ionicons name={'options-outline'} size={14} color={Colors.black} />
                                <Text style={styles.filterText}>{'Filters'}</Text>
                                <Ionicons name={'caret-down'} size={14} color={Colors.black} />
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: 'silver', borderRadius: 10, marginEnd: 10, gap: 5, alignItems: 'center', backgroundColor: Colors.white }}>
                                <Ionicons name={'options-outline'} size={14} color={Colors.black} />
                                <Text style={styles.filterText}>{'Sort'}</Text>
                                <Ionicons name={'caret-down'} size={14} color={Colors.black} />
                            </View>
                            {typesFilters.map((filter) => (
                                <TouchableWithoutFeedback key={filter} style={styles.filterButton}>
                                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: 'silver', borderRadius: 10, marginEnd: 10, gap: 5, alignItems: 'center', backgroundColor: Colors.white }}>
                                        <Text style={styles.filterText}>{filter}</Text>
                                        {/* <Ionicons name={'close'} size={14} color={Colors.black} /> */}
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Product Grid */}
                    <FlatList
                        data={filteredProducts}
                        numColumns={2}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={cartData}
                        renderItem={({ item }) => {
                            const cartItem = cartItems.items.find(cartItem => cartItem.id == item.id);

                            return (
                                <View style={styles.productCard}>
                                    <Image source={{ uri: item.image }} style={styles.productImage} />
                                    <Text style={styles.productWeight}>{item.weight}</Text>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productTime}>{item.time}</Text>
                                    <Text style={styles.productDiscount}>{item.discount}</Text>
                                    <Text style={styles.productPrice}>
                                        ₹{item.price}  <Text style={styles.mrp}>MRP</Text>
                                        <Text style={styles.mrp1}>₹{item.mrp}</Text>
                                    </Text>

                                    {cartItem ? (
                                        // Show Quantity Selector if item is in cart
                                        <View style={styles.addButton1}>
                                            <TouchableWithoutFeedback onPress={() => dispatch(removeItem(item.id))} >
                                                <View>
                                                    <Ionicons name={'remove-outline'} size={20} color={Colors.white} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <Text style={styles.addButtonText1}>{cartItem.quantity}</Text>
                                            <TouchableWithoutFeedback onPress={() => dispatch(addItem(item))}>
                                                <View>
                                                    <Ionicons name={'add'} size={20} color={Colors.white} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    ) : (
                                        // Show ADD button if item is not in cart
                                        <TouchableWithoutFeedback onPress={() => dispatch(addItem(item))}>
                                            <View style={styles.addButton}>
                                                <Text style={styles.addButtonText}>ADD</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                </View>
                            );
                        }}
                    />
                </View>
            </View >

            {cartItems.items.length > 0 && <View style={{ flexDirection: 'row', padding: 10, alignSelf: 'center', backgroundColor: Colors.accent, borderRadius: 30, position: 'absolute', bottom: 10 }}>
                <View>
                    <FlatList
                        data={cartItems.items.slice(-3).reverse()}
                        horizontal={true}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item, index }) => (
                            <View style={{ width: 40, height: 40, backgroundColor: Colors.white, borderWidth: 2, borderColor: 'green', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginStart: index == 0 ? 0 : -15 }}>
                                <Image source={{ uri: item.image }} style={styles.cartImage} />
                            </View>
                        )}
                        style={{ marginEnd: 10 }}
                    />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.cartButtonText}>View cart</Text>
                    <Text style={styles.cartCountButtonText}>{`${cartItems.totalQuantity} ITEMS`}</Text>
                </View>
                <View style={{ width: 40, height: 40, backgroundColor: 'green', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginStart: 10 }}>
                    <Ionicons name={'chevron-forward-outline'} size={20} color={Colors.white} />
                </View>
            </View>}
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    header: { flexDirection: "row", padding: 15, borderBottomWidth: 1, borderColor: "#ddd", alignItems: "center" },
    title: { fontSize: 16, fontFamily: "Montserrat-Bold", marginLeft: 10, color: Colors.black },
    mainContent: { flex: 1, flexDirection: "row" },
    sidebar: { flexDirection: 'column', backgroundColor: Colors.white },
    categoryItem: { flexDirection: 'row', width: 90 },
    categoryImage: { width: 40, height: 40, resizeMode: 'contain' },
    categoryText: { fontSize: 10, fontFamily: "Montserrat-Bold", textAlign: 'center' },
    productContainer: { flex: 1, borderLeftWidth: 3, borderColor: Colors.iceBlue },
    filtersRow: { flexDirection: "row", margin: 10 },
    filterButton: { padding: 8, borderRadius: 5, backgroundColor: "#e0e0e0", marginRight: 8 },
    filterText: { fontSize: 12, fontFamily: "Montserrat-Bold", color: Colors.CharcoalGray },
    productCard: { flex: 1, backgroundColor: "#fff", margin: 5, padding: 10 },
    productImage: { width: "100%", height: 120, backgroundColor: Colors.iceBlue, borderRadius: 10 },
    productName: { fontSize: 10, fontFamily: "Montserrat-Bold", marginTop: 5, color: Colors.CharcoalGray },
    productTime: { fontSize: 8, fontFamily: "Montserrat-Bold", color: Colors.CharcoalGray },
    productDiscount: { fontSize: 8, fontFamily: "Montserrat-Bold", marginTop: 10, color: '#225db7' },
    productWeight: { fontSize: 8, color: '#31376b', fontFamily: "Montserrat-Bold", paddingHorizontal: 5, paddingVertical: 3, borderRadius: 5, marginTop: 10 },
    productPrice: { fontSize: 10, fontFamily: "Montserrat-Bold", color: Colors.CharcoalGray },
    mrp: { fontSize: 8, fontFamily: "Montserrat-SemiBold", color: '#5d5e63' },
    mrp1: { fontSize: 8, fontFamily: "Montserrat-SemiBold", color: '#5d5e63', textDecorationLine: "line-through" },
    addButton: { position: 'absolute', top: 108, right: 6, width: 60, paddingVertical: 5, borderWidth: 1, borderColor: Colors.accent, borderRadius: 5, backgroundColor: Colors.white },
    addButton1: { position: 'absolute', flexDirection: 'row', top: 108, right: 5, width: 80, paddingVertical: 5, borderRadius: 5, backgroundColor: Colors.accent, gap: 12, alignItems: 'center', justifyContent: 'center' },
    addButtonText: { fontSize: 10, color: Colors.accent, fontFamily: "Montserrat-Bold", textAlign: "center" },
    addButtonText1: { fontSize: 12, color: Colors.white, fontFamily: "Montserrat-Bold", textAlign: "center" },
    cartButtonText: { fontSize: 14, color: Colors.white, fontFamily: "Montserrat-Bold" },
    cartCountButtonText: { fontSize: 12, color: Colors.white, fontFamily: "Montserrat-Regular" },
    cartImage: { width: 40, height: 40, resizeMode: 'contain', borderRadius: 30 }
});

export default ProductListing;
