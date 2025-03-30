import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import AuthOtpScreen from '../screens/auth/AuthOtpScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import NoConnection from '../screens/splash/NoConnection';
import Splash from '../screens/splash/Splash';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

// function OtherStackNavigator() {
//     return <Stack.Navigator initialRouteName='Profile' screenOptions={{ gestureEnabled: false, headerShown: false }} >
//         <Stack.Screen name='Profile' component={Profile} />
//     </Stack.Navigator>
// }

function MainStackNavigator() {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{ gestureEnabled: false, headerShown: false }} >
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='NoConnection' component={NoConnection} />
            <Stack.Screen name='AuthScreen' component={AuthScreen} />
            <Stack.Screen name='AuthOtpScreen' component={AuthOtpScreen} />
            <Stack.Screen name='BottomTabNavigator' component={BottomTabNavigator} />
            {/* <Stack.Screen name='other' component={OtherStackNavigator} /> */}
        </Stack.Navigator>
    </NavigationContainer>
}
export default MainStackNavigator
