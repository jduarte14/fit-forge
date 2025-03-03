import { Modal, Dimensions, Image, ScrollView, TouchableOpacity, StyleSheet, View, Text } from "react-native"
import { useEffect } from "react";

const ProductScreen = ({ product, handleSelection }) => {
    return (
        <Modal animationType="slide">
            <View style={styles.container}>
                <View style={styles.breadcumb}>
                    <Text style={styles.category}>
                        {product.category} > {product.subcategory}
                    </Text>
                </View>
                <ScrollView>
                    <View style={styles.productRow}>
                        <ScrollView horizontal>
                            {
                                product.images.map((image, index) => {
                                    return (
                                        <Image
                                            source={{ uri: image }}
                                            style={styles.productImage}
                                            key={image + "_" + index}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.productBox}>
                        <Text style={styles.title}>{product.name}</Text>
                        <Text style={styles.price}> ${product.price} </Text>
                        <Text style={styles.subTitle}>Description:</Text>
                        <Text style={styles.subText}>{product.description}</Text>
                    </View>
                </ScrollView>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.btn} onPress={() => handleSelection(null)}>
                        <Text style={styles.text}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.text}>Buy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const windowWidth = Dimensions.get('window').width;

let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37";
let gray = "#374151";
let white = "#e2e8f0";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundBase,
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 30,
        color: white,
        marginBottom: 10,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 20,
        color: white,
        marginBottom: 10,
    },
    price: {
        fontSize: 25,
        color: white,
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: white,
    },
    productRow: {
        marginBottom: 20,
        flexGrow: 1,
        flexShrink: 1,
    },

    productBox: {
        backgroundColor: backgroundSecondBase,
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 2,
        borderColor: gray,

    },
    productImage: {
        width: windowWidth / 1.8,
        height: 280,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "white",
        marginRight: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        backgroundColor: backgroundSecondBase,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 5,
        width: windowWidth / 2.5,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    text: {
        color: white,
        fontSize: 18,
        fontWeight: "bold",
    },
    category: {
        color: white,
        padding: 10,
    },
    breadcumb: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: backgroundSecondBase,
        borderRadius: 15,
        borderColor: gray,
        alignSelf: "flex-start",
        marginBottom: 10,
    }

});


export default ProductScreen;