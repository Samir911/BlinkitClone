import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect } from 'react';
import { Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../style/Colors';
import Styles from '../../style/Styles';

export default function Splash({ navigation }) {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTimeout(() => {
                checkConnection();
            }, 2000);
        });

        return unsubscribe;
    }, [navigation]);

    const checkConnection = async () => {
        const state = await NetInfo.fetch();
        if (state.isConnected) {
            checkLogin();
        } else {
            navigation.navigate('NoConnection');
        }
    };

    const checkLogin = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");

            if (storedUser) {
                console.log("User is logged in:", storedUser);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "BottomTabNavigator" }],
                });
            } else {
                console.log("User not logged in.");
                await AsyncStorage.removeItem("user"); // Clear user session
                navigation.reset({
                    index: 0,
                    routes: [{ name: "AuthScreen" }],
                });
            }

        } catch (error) {
            console.error("Error checking login:", error);
            navigation.reset({
                index: 0,
                routes: [{ name: "AuthScreen" }],
            });
        }
    };

    return (
        <SafeAreaView style={[Styles.safe_area_view, { backgroundColor: Colors.splash, justifyContent: 'center', alignItems: 'center' }]} >
            <Image source={require('../../../assets/images/splash.png')} style={{ width: 250, height: 250, resizeMode: 'contain' }} />
            <StatusBar backgroundColor={Colors.splash} style='light' />
        </SafeAreaView>
    );
}
