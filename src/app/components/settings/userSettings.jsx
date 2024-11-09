import BasicFields from './../basicFields';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const UserSettings = ({ field, handleSettings, data }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {field.title}
            </Text>
            <View style={styles.fieldContainer}>
                {field.fields.map((value, index) => (
                    <BasicFields key={index} field={value} setData={handleSettings} />
                ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>{ field.emit(data)}}>
                <Text style={styles.text}>
                    {field.button }
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserSettings;


const backgroundBase = "#1c2229";
const backgroundSecondBase = "#2b2e37";

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 70,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        height: screenHeight - 20,
    },
    button: {
        backgroundColor: "#2b2e37",
        borderWidth: 2,
        borderColor: backgroundSecondBase,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 25,
        width: screenWidth - 50,
        margin: "auto",
        marginTop: 10,
    },
    text: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
    fieldContainer: {
        paddinTop: 20,
    }
});