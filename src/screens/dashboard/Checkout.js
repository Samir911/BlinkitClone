import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../style/Colors";

const Checkout = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back" size={20} color={Colors.black} />
                </TouchableOpacity>
                <Text style={styles.title}>{'Checkout'}</Text>
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
});

export default Checkout;
