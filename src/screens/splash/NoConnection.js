import React from 'react';
import { Image, Linking, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../style/Colors';
import Styles from '../../style/Styles';

export default function NoConnection({ navigation }) {

    const openSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            Linking.openSettings();
        }
    }

    return (
        <SafeAreaView style={Styles.safe_area_view} >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, padding: 15 }}>
                <Image source={require('../../../assets/images/no-connection.png')} style={{ width: 120, height: 120, resizeMode: 'contain' }} />
                <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.black, fontFamily: 'Montserrat-SemiBold', marginTop: 20 }}>{'No internet connection'}</Text>
                <Text style={{ textAlign: 'center', fontSize: 16, color: Colors.black, fontFamily: 'Montserrat-Medium', marginTop: 10 }}>{'Please check your network'}</Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.button_text}>Try again</Text>
                    </TouchableOpacity>
                    <View style={{ width: 10 }}></View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={openSettings}>
                        <Text style={styles.button_text}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar backgroundColor={Colors.accent} style='light' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.button,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        width: 130,
        borderRadius: 22
    },
    button_text: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: Colors.white
    }
});