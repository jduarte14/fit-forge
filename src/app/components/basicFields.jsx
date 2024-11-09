import { useState, useEffect } from "react";
import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    Pressable,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const basicFields = ({ field, setData }) => {
    const handleInput = (text, value) => {
        setData(text, value.tag);
    };

    return (
        <View style={styles.container}>
            {
                field.item === "input" ? (
                    <View>
                        {
                            field.title ?
                                (
                                    <Text style={styles.title}>
                                        {field.title}
                                    </Text>
                                ) : null
                        }

                        <TextInput
                            style={styles.input}
                            value={field.value}
                            secureTextEntry={field.password ? true : false}
                            onChangeText={(text) => handleInput(text, field)}
                            keyboardType={field.tag === "email" ? "email-address" : "default"}
                            placeholder={field.placeholder || ""}
                            placeholderTextColor="#ccc"
                        />
                        {
                            field.button ? (
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.text}>
                                        {field.button}
                                    </Text>
                                </TouchableOpacity>
                            ) : null
                        }
                    </View>
                ) : (
                    null
                )
            }
        </View>
    );
};

export default basicFields;

const backgroundBase = "#1c2229";
const backgroundSecondBase = "#2b2e37";

const styles = StyleSheet.create({
    container: {
        backgroundColor: backgroundBase,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: screenWidth - 30,
        height: 50,
        borderWidth: 2,
        borderColor: backgroundSecondBase,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 15,
        paddingLeft: 20,
        fontWeight: "bold",
        color: "white",
    },
    text: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
    title: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
        marginBottom: 40,
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
});
