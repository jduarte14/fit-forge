import { TouchableOpacity, View, Modal, StyleSheet, Text, Dimensions, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const GymView = ({ gym, handleModal }) => {
    const { credentials, prices, facilities, sports, images } = gym;
    
    const formattedPrices = Object.fromEntries(
        Object.entries(prices).map(([key, value]) => {
            const formattedKey = key
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
            return [formattedKey, value];
        })
    );
    return (
        <Modal>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.box}>
                        <Text style={styles.title}>
                            {credentials.name}
                        </Text>
                        <View style={styles.miniBox}>
                            <Text style={styles.text}>
                                {credentials.description}
                            </Text>
                            <Text style={styles.text}>
                                {credentials.address}
                            </Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            {images.length > 0 &&
                                <ScrollView horizontal>
                                    {
                                        images.map((image, index) => {
                                            return image ? (
                                                <Image
                                                    source={{ uri: image }}
                                                    style={styles.previewImage}
                                                    key={image + "_" + index}
                                                />
                                            ) : null;
                                        })}
                                </ScrollView>
                            }
                        </View>
                        <View style={{ paddingTop: 20, paddingLeft: 5, fontWeight: "bold" }}>
                            <Text style={styles.text}>
                                Sports:
                            </Text>
                        </View>
                        <View style={styles.miniBox}>
                            {
                                Object.keys(sports).map(sport => {
                                    return (
                                        <Text style={styles.breadcumb}>
                                            {sport}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                        <View style={{ paddingTop: 20, paddingLeft: 5, fontWeight: "bold" }}>
                            <Text style={styles.text}>
                                Facilities:
                            </Text>
                        </View>
                        <View style={styles.miniBox}>
                            {
                                Object.keys(facilities).map(sport => {
                                    return (
                                        <Text style={styles.breadcumb}>
                                            {sport}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                        <View style={{ paddingTop: 20, paddingLeft: 5, fontWeight: "bold" }}>
                            <Text style={styles.text}>
                                Prices:
                            </Text>
                        </View>
                        <View style={styles.miniBoxCol}>
                            {Object.entries(formattedPrices).map(([key, value], index) => (
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }} key={index}>
                                    <FontAwesome5 name="coins" size={15} color="#efb100" style={{ paddingRight: 10 }} />
                                    <Text style={styles.breadcumb}>
                                        {key}: ${value}
                                    </Text>
                                </View>

                            ))}
                        </View>
                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => handleModal(null)}>
                        <Text style={styles.buttonText}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

let backgroundBase = "#1c2229"
let backgroundSecondBase = "#2b2e37"


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundBase,
        height: "100%",
        width: "100%",
    },
    title: {
        color: "white",
        fontSize: 25,
        textAlign: "left",
        paddingTop: 20,
        paddingLeft: 5,
        fontWeight: "bold",
    },
    miniBox: {
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: backgroundSecondBase,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    miniBoxCol: {
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: backgroundSecondBase,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        gap: 10,
    },
    text: {
        color: "white",
        fontSize: 15,
        textAlign: "left",
        paddingVertical: 5,
    },
    box: {
        paddingHorizontal: 30,
        paddingVertical: 5,
    },
    breadcumb: {
        color: "white",
        fontSize: 15,
        textAlign: "left",
        paddingVertical: 10,
        fontWeight: "bold",
        width: "max-content",
    },
    button: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: backgroundSecondBase,
        marginBottom: 10,
        marginHorizontal: 30,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
    },
    previewImage: {
        width: 300,
        height: 200,
        marginRight: 20,
        borderRadius: 10,
    }
});

export default GymView;


