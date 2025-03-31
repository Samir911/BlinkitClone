import React, { useEffect } from "react";
import { Alert, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, removeItem } from "../../redux/cartSlice";
import Colors from "../../style/Colors";

const Checkout = ({ navigation }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart, shallowEqual);

    useEffect(() => {
        if (cartItems.items.length === 0) {
            navigation.goBack();
        }
    }, [cartItems])

    const handlePayment = () => {
        const options = {
            key: 'rzp_test_1DP5mmOlF5G5ag',  // Dummy Test Key
            amount: 50000,  // ₹500.00 (amount is in paise)
            currency: 'INR',
            name: 'Blinkit Clone',
            description: 'Test Payment1',
            image: 'https://your-logo-url.com/logo.png',
            prefill: {
                email: 'test@example.com',
                contact: '9876543210',
                name: 'Test User'
            },
            theme: { color: Colors.accent }
        };

        RazorpayCheckout.open(options)
            .then((data) => {
                // Payment successful
                Alert.alert('Success', `Payment ID: ${data.razorpay_payment_id}`);
                dispatch(clearCart());
                navigation.goBack();
            })
            .catch((error) => {
                // Payment failed
                Alert.alert('Payment Failed', 'Please try again.');
            });
    }


    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back" size={20} color={Colors.black} />
                </TouchableOpacity>
                <Text style={styles.title}>{'Checkout'}</Text>
            </View>

            <ScrollView style={{ flex: 1, backgroundColor: Colors.iceBlue, padding: 20, paddingBottom: 15 }}>
                <View style={styles.cartListingView}>
                    <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                        <View style={{ width: 30, height: 30, backgroundColor: Colors.iceBlue, padding: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Ionicons name="time-outline" size={20} color={Colors.accent} />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14, fontFamily: "Montserrat-Bold", color: Colors.black }}>Delivery in 15 minutes</Text>
                            <Text style={{ fontSize: 10, fontFamily: "Montserrat-Bold", color: '#656e82' }}>Shipment of 1 items</Text>
                        </View>
                    </View>

                    <FlatList
                        data={cartItems.items}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.name}
                        style={{ marginHorizontal: -15 }}
                        renderItem={({ item }) => {
                            const cartItem = cartItems.items.find(cartItem => cartItem.id == item.id);

                            return (
                                <TouchableWithoutFeedback onPress={() => { }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ height: 1, backgroundColor: Colors.iceBlue, marginTop: 15 }} />
                                        <View style={styles.cartProductView}>
                                            <View style={{ width: 70, height: 70, backgroundColor: Colors.iceBlue, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={{ uri: item.image }} style={styles.cartProductImage} />
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                <Text style={styles.cartItemName}>{item.name}</Text>
                                                <Text style={styles.cartItemweight}>{item.weight}</Text>
                                                <Text style={styles.cartItemSave}>{'Save for later'}</Text>
                                                <View style={{ width: 70, height: 1, borderTopWidth: 1, borderColor: 'silver', borderStyle: 'dashed' }} />
                                            </View>
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={styles.addButton1}>
                                                    <TouchableWithoutFeedback onPress={() => dispatch(removeItem(item.id))} >
                                                        <View>
                                                            <Ionicons name={'remove-outline'} size={16} color={Colors.white} />
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                    <Text style={styles.addButtonText1}>{cartItem.quantity}</Text>
                                                    <TouchableWithoutFeedback onPress={() => dispatch(addItem(item))}>
                                                        <View>
                                                            <Ionicons name={'add'} size={16} color={Colors.white} />
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
                                                    <Text style={styles.cartItemMrp}>{`₹${item.mrp * cartItem.quantity}`}</Text>
                                                    <Text style={styles.cartItemPrice}>{`₹${item.price * cartItem.quantity}`}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </TouchableWithoutFeedback>
                            );
                        }} />
                </View>

                <View style={[styles.cartListingView, { marginTop: 15 }]}>
                    <Text style={{ fontSize: 14, fontFamily: "Montserrat-Bold", color: Colors.black }}>Bill details</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5 }}>
                        <Text style={{ fontSize: 11, fontFamily: "Montserrat-SemiBold", color: Colors.black }}>Items total</Text>
                        <Text style={{ fontSize: 11, fontFamily: "Montserrat-SemiBold", color: Colors.brightBlue, backgroundColor: Colors.iceBlue, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 5, marginHorizontal: 5 }}>{`Saved ₹${cartItems.totalMrp - cartItems.totalPrice}`}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 5 }}>
                            <Text style={{ fontSize: 11, fontFamily: "Montserrat-Medium", color: Colors.gray, textDecorationLine: 'line-through' }}>{`₹${cartItems.totalMrp}`}</Text>
                            <Text style={{ fontSize: 11, fontFamily: "Montserrat-Medium", color: Colors.CharcoalGray }}>{`₹${cartItems.totalPrice}`}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: -5 }}>
                        <Text style={{ flex: 1, fontSize: 11, fontFamily: "Montserrat-SemiBold", color: Colors.black }}>Delivery charge</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 11, fontFamily: "Montserrat-Medium", color: Colors.black, textDecorationLine: cartItems.totalPrice > 100 ? 'line-through' : 'none' }}>{`₹25`}</Text>
                            <Text style={{ fontSize: 11, fontFamily: "Montserrat-SemiBold", color: Colors.brightBlue }}>{` ${cartItems.totalPrice > 100 ? 'FREE' : ''}`}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: -5 }}>
                        <Text style={{ flex: 1, fontSize: 11, fontFamily: "Montserrat-SemiBold", color: Colors.black }}>Handling charge</Text>
                        <Text style={{ fontSize: 11, fontFamily: "Montserrat-SemiBold", color: Colors.black }}>{`₹2`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <Text style={{ flex: 1, fontSize: 14, fontFamily: "Montserrat-Bold", color: Colors.black }}>Grand total</Text>
                        <Text style={{ fontSize: 14, fontFamily: "Montserrat-Bold", color: Colors.black }}>{`₹${cartItems.totalPrice}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', backgroundColor: '#f2ecff', padding: 15, margin: -15, alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 12, fontFamily: "Montserrat-SemiBold", color: Colors.brightBlue }}>Your total savings</Text>
                            {cartItems.totalPrice > 100 && <Text style={{ fontSize: 10, fontFamily: "Montserrat-Medium", color: Colors.black }}>Includes ₹25 savings through free delivery</Text>}
                        </View>
                        <Text style={{ fontSize: 12, fontFamily: "Montserrat-SemiBold", color: Colors.brightBlue }}>{`₹${cartItems.totalMrp - cartItems.totalPrice + (cartItems.totalPrice > 100 ? 25 : 0)}`}</Text>
                    </View>
                </View>

                <View style={[styles.cartListingView, { marginTop: 15 }]}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 14, fontFamily: "Montserrat-Bold", color: Colors.black }}>Cancellation Policy</Text>
                        <Text style={{ fontSize: 10, fontFamily: "Montserrat-Medium", color: '#656e82' }}>Orders can not be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.addressFooter}>
                <Text style={{ fontSize: 14, fontFamily: "Montserrat-Bold", color: Colors.black }}>Delivering To -</Text>
                <Text style={{ fontSize: 12, fontFamily: "Montserrat-Medium", color: '#656e82' }}> Millenium Business Park, Kopar</Text>
            </View>

            <View style={styles.footer}>
                <TouchableWithoutFeedback onPress={() => { handlePayment(); }}>
                    <View style={styles.chooseAddressButton}>
                        <Text style={{ fontSize: 14, fontFamily: "Montserrat-Medium", color: Colors.white }}>Place order</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} translucent />
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    header: { flexDirection: "row", padding: 15, borderBottomWidth: 1, borderColor: "#ddd", alignItems: "center" },
    title: { fontSize: 16, fontFamily: "Montserrat-Bold", marginLeft: 10, color: Colors.black },
    mainContent: { flex: 1, paddingHorizontal: 15, paddingTop: 15 },
    cartListingView: { padding: 15, backgroundColor: Colors.white, borderRadius: 10, gap: 10 },
    cartProductView: { flexDirection: 'row', gap: 15, alignItems: 'center', marginTop: 15, marginHorizontal: 15 },
    cartProductImage: { width: 70, height: 70, resizeMode: 'contain', borderRadius: 10 },
    cartItemName: { fontSize: 11, fontFamily: "Montserrat-Bold", color: Colors.CharcoalGray },
    cartItemweight: { fontSize: 11, fontFamily: "Montserrat-Bold", color: 'silver' },
    cartItemSave: { fontSize: 10, fontFamily: "Montserrat-Bold", color: 'silver' },
    cartItemMrp: { fontFamily: "Montserrat-Bold", color: 'silver', textDecorationLine: 'line-through', marginEnd: 5 },
    cartItemPrice: { fontFamily: "Montserrat-Bold", color: Colors.CharcoalGray },
    addButton1: { flexDirection: 'row', width: 70, paddingVertical: 5, borderRadius: 5, backgroundColor: Colors.accent, gap: 10, alignItems: 'center', justifyContent: 'center' },
    addButtonText1: { fontSize: 12, color: Colors.white, fontFamily: "Montserrat-Bold", textAlign: "center" },
    addressFooter: { flexDirection: 'row', padding: 10, backgroundColor: Colors.iceBlue, borderWidth: 1, borderColor: '#c3e0e4', alignItems: 'center' },
    footer: { padding: 10, backgroundColor: Colors.white },
    chooseAddressButton: { backgroundColor: Colors.accent, padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
});

export default Checkout;
