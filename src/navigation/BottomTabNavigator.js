import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Categories from '../screens/dashboard/Categories';
import Home from '../screens/dashboard/Home';
import OrderAgain from '../screens/dashboard/OrderAgain';
import Print from '../screens/dashboard/Print';
import Colors from '../style/Colors';
import ProductListing from '../screens/dashboard/ProductListing';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackNavigator() {
    return <Stack.Navigator initialRouteName='Home' screenOptions={{ gestureEnabled: false, headerShown: false }} >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='ProductListing' component={ProductListing} />
    </Stack.Navigator>
}

function OrderAgainStackNavigator() {
    return <Stack.Navigator initialRouteName='OrderAgain' screenOptions={{ gestureEnabled: false, headerShown: false }} >
        <Stack.Screen name='OrderAgain' component={OrderAgain} />
    </Stack.Navigator>
}

function CategoriesStackNavigator() {
    return <Stack.Navigator initialRouteName='Categories' screenOptions={{ gestureEnabled: false, headerShown: false }} >
        <Stack.Screen name='Categories' component={Categories} />
    </Stack.Navigator>
}

function PrintStackNavigator() {
    return <Stack.Navigator initialRouteName='Print' screenOptions={{ gestureEnabled: false, headerShown: false }} >
        <Stack.Screen name='Print' component={Print} />
    </Stack.Navigator>
}

export default function BottomTabNavigator() {

    return <Tab.Navigator
        screenOptions={{ swipeEnabled: false, headerShown: false, tabBarActiveTintColor: Colors.activeTab, tabBarInactiveTintColor: Colors.inActiveTab, tabBarLabelStyle: { fontSize: 12, fontFamily: 'Montserrat-Medium' } }}>
        <Tab.Screen
            name='Home'
            component={HomeStackNavigator}
            options={{
                tabBarIcon: ({ focused }) => <View style={{ flex: 1 }}>
                    <View style={{ width: 50, height: 3, backgroundColor: focused ? Colors.activeTab : Colors.white, borderBottomLeftRadius: 2, borderBottomRightRadius: 2, marginTop: -5.5 }} />
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 2 }}>
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={focused ? Colors.activeTab : Colors.inActiveTab} />
                    </View>
                </View>,
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            color: focused ? Colors.activeTab : Colors.inActiveTab,
                            fontSize: 12,
                            fontFamily: focused ? 'Montserrat-Bold' : 'Montserrat-Medium',
                            marginTop: -5
                        }}
                    >
                        {'Home'}
                    </Text>
                ),
            }}
        />
        <Tab.Screen
            name='OrderAgain'
            component={OrderAgainStackNavigator}
            options={{
                tabBarIcon: ({ focused }) => <View style={{ flex: 1 }}>
                    <View style={{ width: 50, height: 3, backgroundColor: focused ? Colors.activeTab : Colors.white, borderBottomLeftRadius: 2, borderBottomRightRadius: 2, marginTop: -5.5 }} />
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 2 }}>
                        <Ionicons name={focused ? 'bag-handle' : 'bag-handle-outline'} size={22} color={focused ? Colors.activeTab : Colors.inActiveTab} />
                    </View>
                </View>,
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            color: focused ? Colors.activeTab : Colors.inActiveTab,
                            fontSize: 12,
                            fontFamily: focused ? 'Montserrat-Bold' : 'Montserrat-Medium',
                            marginTop: -5
                        }}
                    >
                        {'Order Again'}
                    </Text>
                ),
            }} />
        <Tab.Screen
            name='Categories'
            component={CategoriesStackNavigator}
            options={{
                tabBarIcon: ({ focused }) => <View style={{ flex: 1 }}>
                    <View style={{ width: 50, height: 3, backgroundColor: focused ? Colors.activeTab : Colors.white, borderBottomLeftRadius: 2, borderBottomRightRadius: 2, marginTop: -5.5 }} />
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 2 }}>
                        <MaterialCommunityIcons name={focused ? 'gamepad-circle' : 'gamepad-circle-outline'} size={22} color={focused ? Colors.activeTab : Colors.inActiveTab} />
                    </View>
                </View>,
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            color: focused ? Colors.activeTab : Colors.inActiveTab,
                            fontSize: 12,
                            fontFamily: focused ? 'Montserrat-Bold' : 'Montserrat-Medium',
                            marginTop: -5
                        }}
                    >
                        {'Categories'}
                    </Text>
                ),
            }} />
        <Tab.Screen
            name='Print'
            component={PrintStackNavigator}
            options={{
                tabBarIcon: ({ focused }) => <View style={{ flex: 1 }}>
                    <View style={{ width: 50, height: 3, backgroundColor: focused ? Colors.activeTab : Colors.white, borderBottomLeftRadius: 2, borderBottomRightRadius: 2, marginTop: -5.5 }} />
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 2 }}>
                        <MaterialCommunityIcons name={focused ? 'printer' : 'printer-outline'} size={22} color={focused ? Colors.activeTab : Colors.inActiveTab} />
                    </View>
                </View>,
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            color: focused ? Colors.activeTab : Colors.inActiveTab,
                            fontSize: 12,
                            fontFamily: focused ? 'Montserrat-Bold' : 'Montserrat-Medium',
                            marginTop: -5
                        }}
                    >
                        {'Print'}
                    </Text>
                ),
            }} />
    </Tab.Navigator>
}
