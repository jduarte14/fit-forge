import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

const Map = ({ gyms }) => {
    console.log(gyms, "todo");
    const region = {
        latitude: -34.8545,
        longitude: -56.1820,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={region}>
                <Marker
                    coordinate={region}
                    title="Baltasar Vargas 1113"
                    description="Montevideo, Uruguay"
                >
                    <View style={styles.marker}>
                        <Text style={styles.text}>🏋️ Gym</Text>
                    </View>
                </Marker>

            </MapView>
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
