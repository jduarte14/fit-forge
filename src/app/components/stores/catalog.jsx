import { View, Image, Text, ScrollView, StyleSheet, Modal, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
const Catalog = ({ products, handleCatalog }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    return (
        <Modal animationType="slide">
            <View style={styles.container}>
                <View style={{ position: "relative", width: "100%" }}>
                    <TouchableOpacity style={styles.close} onPress={() => handleCatalog()}>
                        <MaterialIcons name="close" color="white" style={{ fontSize: 30 }} />
                    </TouchableOpacity>

                </View>

                <Text style={styles.title}>Catalog</Text>

                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for a product..."
                    placeholderTextColor="#a0a0a0"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <ScrollView>
                    <View style={styles.productWrapper}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <View style={styles.productBox} key={product._id}>
                                    <Image
                                        source={{ uri: product.images[0] }}
                                        style={styles.productImage}
                                    />
                                    <View style={styles.info}>
                                        <Text style={styles.subText}>{product.name}</Text>
                                        <Text style={styles.subText}>${product.price}</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noResults}>No products found</Text>
                        )}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const screenWidth = Dimensions.get('window').width;

let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37";
let gray = "#374151";
let white = "#e2e8f0";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundBase,
        position: "relative",
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: "white",
        paddingTop: "10%",
        textAlign: "left",
        marginRight: "auto",
        paddingLeft: "5%",
    },
    searchBar: {
        width: "90%",
        height: 50,
        backgroundColor: backgroundSecondBase,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: white,
        marginVertical: 10,
        marginTop: 20,
        borderWidth: 2,
        borderColor: gray,
    },
    info: {
        paddingTop: 10,
    },
    subText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
    },
    productImage: {
        borderRadius: 15,
        width: 105,
        height: 155,
        backgroundColor: "white",
    },
    productWrapper: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingVertical: 30,
        flex: 2,
    },
    productBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundSecondBase,
        padding: 5,
        borderWidth: 2,
        borderColor: gray,
        borderRadius: 15,
        width: screenWidth / 2 - 30,
        height: 250,
    },
    noResults: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    close: {
        backgroundColor: backgroundSecondBase,
        position: 'absolute',
        right: 0,
        marginRight: 10,
        borderRadius: 20,
        padding: 5,
        marginTop: 15,
    },
});

export default Catalog;
