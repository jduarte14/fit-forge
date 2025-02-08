import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const Map = () => {

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
                />

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
});
