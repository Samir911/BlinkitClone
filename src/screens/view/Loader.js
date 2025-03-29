import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Colors from '../../style/Colors';

export default function Loader() {

    return (
        <View style={{ position: 'absolute', backgroundColor: 'rgba(00, 00, 00, 0.5)', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ height: 80, width: 80, backgroundColor: Colors.background, borderRadius: 5, elevation: 3, shadowOffset: { width: 1, height: 1 }, shadowColor: '#333', shadowOpacity: 0.3, shadowRadius: 2, margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color={Colors.accent} size='large' />
            </View>
        </View>
    );
}