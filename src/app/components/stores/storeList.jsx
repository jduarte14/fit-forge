import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { useStore } from '../../contexts/store/StoreContext';
import BottomBar from '../layout/BottomBar';
import StoreView from './storeView';

const StoresList = () => {
    const { getStores, storesList } = useStore();
    const [loading, setLoading] = useState(true);
    const [selectedStore, setSelectedStore] = useState({});
    const [modal, setModal] = useState(false);

    const fetchStores = async () => {
        try {
            await getStores();
            if (storesList.length > 0) {
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching stores:", error);
        }
    };

    const handleSelectedStore = (store) => {
        setSelectedStore(store);
        handleModal();
    };

    const handleModal = () => {
        setModal((prevModal) => !prevModal);
    };

    useEffect(() => {
        fetchStores();
    }, [storesList]);

    return (
        <Modal>
            <View style={styles.container}>
                <ScrollView>
                    {!loading && storesList?.length > 0 ? (
                        storesList.map((store, index) => (
                            <View key={index} style={styles.rowItem}>
                                <View>
                                    <View style={styles.avatarContainer}>
                                        <Image source={{ uri: store.storeImages?.[0] || "https://via.placeholder.com/100" }} style={styles.avatar} />
                                        <Text style={styles.text}>{store.name}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.btn} onPress={() => handleSelectedStore(store)}>
                                    <Text style={styles.smallText}>See more</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.text}>No stores available</Text>
                    )}
                </ScrollView>

                {modal && <StoreView store={selectedStore} handleModal={handleModal} />}
            </View>
            <BottomBar />
        </Modal>
    );
};

let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37";
let gray = "#374151";
let white = "#e2e8f0";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundBase,
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    smallText: {
        color: "white",
        fontSize: 12,
    },
    rowItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: backgroundSecondBase,
        marginTop: 20,
        borderRadius: 10,
        width: screenWidth - 50,
    },
    avatar: {
        borderRadius: 100,
        width: 55,
        height: 55,
        marginRight: 10,
        borderWidth: 2,
        borderColor: gray,
    },
    btn: {
        borderRadius: 15,
        backgroundColor: gray,
        alignItems: "center",
        marginLeft: "auto",
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
});

export default StoresList;
