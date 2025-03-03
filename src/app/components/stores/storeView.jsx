import { Modal, ScrollView, TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useStore } from '../../contexts/store/StoreContext';
import Catalog from "./catalog";

const StoreView = ({ store, handleModal }) => {

    const { getProductsByStore } = useStore();
    const [selectedStore, setSelectedStore] = useState(store);
    const [showCatalog, setShowCatalog] = useState(false);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const data = await getProductsByStore(store._id);
        setProducts(data.products);
    }

    const handleCatalog = () => {
        setShowCatalog(!showCatalog);
     }
    
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <Modal animationType="slide">

            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.box}>
                        <Text style={styles.title}>
                            {selectedStore.name}
                        </Text>
                        <Text style={styles.subText}>
                            {selectedStore.description}
                        </Text>
                        <Text style={styles.subText}>
                            Address: {selectedStore.address}
                        </Text>
                    </View>
                    <View style={{ paddingTop: 30, marginHorizontal: 10 }}>
                        <ScrollView horizontal>
                            {
                                selectedStore.storeImages.map((image, index) => {
                                    return image ? (
                                        <Image
                                            source={{ uri: image }}
                                            style={styles.image}
                                            key={image + "_" + index}
                                        />
                                    ) : null;
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.productRow}>
                        <Text style={styles.subTitle}>
                            The most purchased products:
                        </Text>
                        {
                            products.length > 0 && (

                                <ScrollView horizontal>
                                    {products.map((product, productIndex) => (
                                        <View key={productIndex} style={{ marginRight: 10, marginTop: 20 }}>

                                            <Image
                                                source={{ uri: product.images[0] }}
                                                style={styles.productImage}
                                            />

                                            <View>
                                                <Text style={styles.subText}>{product.name}</Text>
                                                <Text style={styles.subText}>${product.price}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            )
                        }
                    </View>
                </ScrollView>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.btn} onPress={() => handleCatalog()}>
                        <Text style={styles.text}>
                            See catalog
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => handleModal()}>
                        <Text style={styles.text}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                showCatalog && <Catalog products={products} handleCatalog={handleCatalog} />
            }
        </Modal>
    )
};

export default StoreView;

const windowWidth = Dimensions.get('window').width;

let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37";
let gray = "#374151";
let white = "#e2e8f0";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: backgroundBase,
    },
    miniContainer: {
        paddingBottom: 15,
        backgroundColor: backgroundBase,
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    title: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    },
    subTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginRight: "auto",
        marginTop: 20,
    },
    productRow: {
        paddingHorizontal: 20,
        flexGrow: 1,
        flexShrink: 1,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
        width: windowWidth - 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: backgroundSecondBase,
    },
    box: {
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
        marginHorizontal: 10,
    },
    buttonRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5,
        paddingBottom: 10,
    },
    subText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 20,
    },
    col: {
        display: "flex",
        justifyContent: "center",
    },
    image: {
        paddingTop: 10,
        width: 250,
        height: 150,
        borderRadius: 15,
        borderColor: backgroundSecondBase,
        borderWidth: 2,
    },
    productImage: {
        borderRadius: 15,
        width: 125,
        height: 175,
    },
    btn: {
        backgroundColor: backgroundSecondBase,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 5,
        width: windowWidth / 2.4,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
});