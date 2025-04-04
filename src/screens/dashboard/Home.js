import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { shallowEqual, useSelector } from "react-redux";
import Colors from "../../style/Colors";

const Home = ({ navigation }) => {
  const categories = [
    {
      title: "Bestsellers",
      items: [
        {
          title: "Drinks & Juices",
          counts: 103,
          images: [
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/007c3f88-20f0-4aa9-b8be-dff0968661e3.jpg?ts=1723194790" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/products/sliding_image/15288a.jpg?ts=1698840601" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/assets/products/sliding_images/jpeg/b330c04e-0e5f-4733-a43f-9351772763d8.jpg?ts=1740976613" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/assets/products/sliding_images/jpeg/0f87f19e-66da-48cd-8c75-343abf732948.jpg?ts=1707312325" },
          ],
        },
        {
          title: "Chips & Namkieen",
          counts: 315,
          images: [
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/007c3f88-20f0-4aa9-b8be-dff0968661e3.jpg?ts=1723194790" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/products/sliding_image/116824a.jpg?ts=1689762986" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/a462e780-3f6f-47df-a451-1e63791d175b.jpg?ts=1740848082" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/products/sliding_image/540666a.jpg?ts=1704359696" },
          ],
        },
        {
          title: "Dairy, Bread & Eggs",
          counts: 11,
          images: [
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/app/assets/products/sliding_images/jpeg/6d41a6e4-eb1b-413c-8e20-7b9e892e42f8.jpg?ts=1712325555" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/600dd9ff-659c-4817-87e7-eec1dea72c63.jpg?ts=1706182144" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/2a58ae26-0236-46f6-b5f9-5ebc2766d7d2.jpg?ts=1732699320" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/app/assets/products/sliding_images/jpeg/bb0fa546-3989-4e1d-984c-5f6d8a360ddb.jpg?ts=1716921769" },
          ],
        },
        {
          title: "Ice Creams & More",
          counts: 46,
          images: [
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/43cdef3e-fc6a-41ec-a994-0fd3298907df.jpg?ts=1737449226" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/assets/products/sliding_images/jpeg/1f769b94-6138-416e-ae0c-ec6aa5f3c900.jpg?ts=1708594230" },
            { image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/1bbe2d46-a677-4574-aa30-c9569b9647ac.jpg?ts=1737449233" },
            { image: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/e4a5b76d-c1d6-4e41-99f8-3a8d9be4ac2c.jpg?ts=1713768174" },
          ],
        },
        {
          title: "Vegetables & Fruits",
          counts: 114,
          images: [
            { image: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/d104419e-e128-405a-ae42-13794e50858d.jpg?ts=1711010249" },
            { image: "https://cdn.grofers.com/da/cms-assets/cms/product/cb46c61d-a2e4-46f3-98b4-cf66a4ed479a.jpg?ts=1737093002" },
            { image: "https://cdn.grofers.com/da/cms-assets/cms/product/b3e17eb6-45e4-4b08-a263-5fe67789f174.jpg?ts=1737093005" },
            { image: "https://cdn.grofers.com/da/cms-assets/cms/product/b3e17eb6-45e4-4b08-a263-5fe67789f174.jpg?ts=1737093005" },
          ],
        },
        {
          title: "Sweet & Chocolates",
          counts: 68,
          images: [
            { image: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/ce0cd663-4c85-4fbc-8060-4f0b9b83461d.jpg" },
            { image: "https://cdn.grofers.com/da/cms-assets/cms/product/5c16fb64-1fa4-4465-beee-106b535778d7.jpg?ts=1730718174" },
            { image: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/b26c0d41-154c-442a-9df2-55a7710ca10d.jpg?ts=1723633130" },
            { image: "https://cdn.grofers.com/da/cms-assets/cms/product/d97f73d4-0ed2-4334-ba05-b522cb2c2de1.jpg?ts=1741689320" },
          ],
        },
      ],
    },
    {
      title: "Grocery & Kitchen",
      items: [
        { name: "Vegetables & Fruits", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/1487_1679466558536.png" },
        { name: "Atta, Rice & Dal", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/16_1670926686695.png" },
        { name: "Oil, Ghee & Masala", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/1557_1670927467171.png" },
        { name: "Dairy, Bread & Eggs", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/14_1678949253289.png" },
        { name: "Bakery & Biscuits", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/14_1678949253289.png" },
        { name: "Dry Fruits & Cereals", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/175_1670926891460.png" },
        { name: "Chicken, Meat & Fish", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/12_1670926444151.png" },
        { name: "Kitchenware & Appliances", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/2084123d-5f77-46ff-ad26-43ae1ab081c9.jpg?ts=1712837698" },
      ],
    },
    {
      title: "Snacks & Drinks",
      items: [
        { name: "Chips & Namkeen", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/1237_1670927167688.png" },
        { name: "Sweets & Chocolates", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/9_1693202755712.png" },
        { name: "Drinks & Juices", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/332_1680269009421.png" },
        { name: "Tea, Coffee & Milk Drinks", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/12_1670926444151.png" },
        { name: "Instant Food", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/15_1676610279582.png" },
        { name: "Sauces & Spreads", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/972_1678176421554.png" },
        { name: "Paan Corner", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/229_1697713631135.png" },
        { name: "Ice Creams & Frozen", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/9_1693202755712.png" },
      ],
    },
    {
      title: "Household Essentials",
      items: [
        { name: "Home & Lifestyle", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/1379_1670927201924.png" },
        { name: "Cleaners & Repellents", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/18_1692167327246.png" },
        { name: "Electronics", image: "https://cdn.grofers.com/app/images/collections/groupings/grouping_asset_547250_1716984765903" },
        { name: "Stationery & Games", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/images/category/cms_images/icon/484_1680606506417.png" },
      ],
    },
  ];

  const cartItems = useSelector(state => state.cart, shallowEqual);
  const flatListRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    // Show button only after 400px and when scrolling up
    if (offsetY > 400 && offsetY < lastScrollY.current) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }

    lastScrollY.current = offsetY; // Update last scroll position
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

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

      {/* Go to Top Button */}
      {showButton && (
        <TouchableOpacity style={styles.goToTopButton} onPress={scrollToTop}>
          <Ionicons name="arrow-up-circle-outline" size={16} color="white" />
          <Text style={{ marginStart: 5, color: Colors.white, fontSize: 12, fontFamily: 'Montserrat-Medium' }}>Back to top</Text>
        </TouchableOpacity>
      )}

      {/* Category Sections */}
      <FlatList
        ref={flatListRef}
        data={categories}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <View style={styles.categoryGrid}>
              {
                item.title !== 'Bestsellers' ? (
                  item.items.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.categoryCard} onPress={() => {
                      if (category.name === 'Vegetables & Fruits') {
                        navigation.navigate('ProductListing', { title: category.name });
                      } else {
                        null
                      }
                    }}>
                      <View style={{ width: 80, height: 80, padding: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: Colors.iceBlue }}>
                        <Image source={{ uri: category.image }} style={styles.categoryImage} />
                      </View>
                      <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  item.items.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.categoryCard1} onPress={() => {
                      if (category.title === 'Vegetables & Fruits') {
                        navigation.navigate('ProductListing', { title: category.name });
                      } else {
                        null
                      }
                    }}>
                      <View style={{ padding: 5, borderRadius: 15, backgroundColor: Colors.iceBlue }}>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 2 }}>
                          <View style={{ width: '47%', backgroundColor: Colors.white, borderRadius: 10 }}>
                            <Image source={{ uri: category?.images ? category?.images[0].image : category.image }} style={styles.categoryImage1} />
                          </View>
                          <View style={{ width: '47%', backgroundColor: Colors.white, borderRadius: 10, marginStart: 3 }}>
                            <Image source={{ uri: category?.images ? category?.images[1].image : category.image }} style={styles.categoryImage1} />
                          </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 2, marginTop: 5 }}>
                          <View style={{ width: '47%', backgroundColor: Colors.white, borderRadius: 10 }}>
                            <Image source={{ uri: category?.images ? category?.images[2].image : category.image }} style={styles.categoryImage1} />
                          </View>
                          <View style={{ width: '47%', backgroundColor: Colors.white, borderRadius: 10, marginStart: 3 }}>
                            <Image source={{ uri: category?.images ? category?.images[3].image : category.image }} style={styles.categoryImage1} />
                          </View>
                        </View>
                      </View>
                      <View style={{ alignSelf: 'center', borderWidth: 2, borderColor: Colors.devider, borderRadius: 25, marginTop: -15, backgroundColor: Colors.iceBlue }}>
                        <Text style={styles.categoryCounts}>{`+${category.counts} more`}</Text>
                      </View>
                      <Text style={styles.categoryText1}>{category.title}</Text>
                    </TouchableOpacity>
                  ))
                )
              }
            </View>
          </View>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Improves performance
      />

      {cartItems.items.length > 0 && <TouchableWithoutFeedback onPress={() => navigation.navigate('Checkout')}>
        <View style={{ flexDirection: 'row', padding: 7, alignSelf: 'center', backgroundColor: Colors.accent, borderRadius: 30, position: 'absolute', bottom: 10 }}>
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
          <View style={{ flexDirection: 'column', marginEnd: 5 }}>
            <Text style={styles.cartButtonText}>View cart</Text>
            <Text style={styles.cartCountButtonText}>{`${cartItems.totalQuantity} ITEMS`}</Text>
          </View>
          <View style={{ width: 40, height: 40, backgroundColor: 'green', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginStart: 10 }}>
            <Ionicons name={'chevron-forward-outline'} size={20} color={Colors.white} />
          </View>
        </View>
      </TouchableWithoutFeedback>}

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
  cartButtonText: { fontSize: 14, color: Colors.white, fontFamily: "Montserrat-Bold", marginTop: 3 },
  cartCountButtonText: { fontSize: 11, color: Colors.white, fontFamily: "Montserrat-Regular", marginTop: -3 },
  cartImage: { width: 40, height: 40, resizeMode: 'contain', borderRadius: 30 }
});

export default Home;
