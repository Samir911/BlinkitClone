import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Colors from "../../style/Colors";

const LogoutConfirmation = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal transparent visible={visible} animationType="fade" statusBarTranslucent={true} onRequestClose={onCancel} >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>

                    <Text style={styles.title}>Log out from?</Text>

                    <View style={styles.divider} />

                    <Text style={styles.description} onPress={onConfirm}>Current Device</Text>

                    <View style={styles.divider} />

                    <Text style={styles.description} onPress={onConfirm}>All Devices</Text>

                    <View style={styles.divider} />

                    <Text style={styles.description} onPress={onCancel}>Cancel</Text>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "75%",
        backgroundColor: "#fff",
        borderRadius: 15,
        alignItems: "center",
        gap: 15,
        paddingVertical: 15,
    },
    title: {
        fontSize: 18,
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#ddd",
    },
    description: {
        fontSize: 13,
        fontFamily: "Montserrat-SemiBold",
        color: Colors.accent,
        textAlign: "center",
    },
});

export default LogoutConfirmation;
