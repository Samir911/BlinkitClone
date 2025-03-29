import { StyleSheet } from 'react-native';
import Colors from '../style/Colors';

export default StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: Colors.white
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        flexDirection: 'column'
    },
    name: {
        color: Colors.text,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        marginTop: 5
    }
});