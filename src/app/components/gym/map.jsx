import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import GymView from './GymView';

const Map = ({ gyms }) => {
    const [selectedGym, setSelectedGym] = useState(null);

    const region = {
        latitude: -34.8545,
        longitude: -56.1820,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const selectGym = (gymToSelect) => {
        setSelectedGym((prevGym) => (prevGym === gymToSelect ? null : gymToSelect));
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={region}>
                {
                    gyms && gyms.map((gym, index) => {
                        let credentials = gym.credentials;
                        let prices = [...Object.values(gym.prices).pop()];
                        return (
                                <Marker
                                    key={`${index}_+ ${credentials.name}`}
                                    coordinate={region}
                                    title={credentials.name}
                                    description={credentials.address}
                                    onPress={() => selectGym(gym)}>

                                    {/* Marker showcase of info */}
                                    <View style={styles.marker}>
                                        <Text style={styles.text}>{credentials.name}</Text>
                                        <Text style={styles.text}> ${prices} </Text>
                                    </View>
                                </Marker>
                        )
                    })
                }
            </MapView>
            {
                selectedGym && <GymView gym={selectedGym} handleModal={selectGym} />
            }
        </View>
    );
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    marker: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
    },
    text: {
        color: "black",
        fontWeight: "bold",
    },
});
