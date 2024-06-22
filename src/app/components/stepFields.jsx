import { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Image, Modal, StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const StepFields = ({ fields, actions }) => {
    function dividirArrayEnDos(array) {
        const half = Math.floor(array.length / 2);
        const firstHalf = array.slice(0, mitad);
        const secondHalf = array.slice(mitad);

        return [primeraMitad, segundaMitad];
    }
    const [selectedItem, setSelectedItem] = useState([]);

    const handleSelectedItem = (item) => {
        setSelectedItem(prevSelectedItem => {
            if (prevSelectedItem.includes(item.name)) {
                return prevSelectedItem.filter(name => name !== item.name);
            } else {
                return [...prevSelectedItem, item.name];
            }
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                {
                    fields.length > 0 ?
                        fields.map((item) => {
                            return (
                                <TouchableOpacity style={selectedItem.includes(item.name) ? styles.selected : styles.touchable} key={item.name} onPress={() => handleSelectedItem(item)}>
                                    <>
                                        {item.icon}
                                    </>
                                    <Text style={styles.text} key={item}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                        : null
                }
            </ScrollView>
        </View>


    )
}

export default StepFields;

let backgroundBase = "#1c2229"
let backgroundSecondBase = "#2b2e37"

const styles = StyleSheet.create({
    touchable: {
        backgroundColor: backgroundSecondBase,
        padding: 10,
        width: screenWidth - 100,
        borderWidth: 2,
        borderColor: "#51565b",
        borderRadius: 15,
        margin: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    selected: {
        backgroundColor: backgroundSecondBase,
        padding: 10,
        width: screenWidth - 100,
        borderWidth: 3,
        borderColor: "#51565b",
        borderRadius: 15,
        margin: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderColor:"white",
    },
    container: {
        flex: 1,
        backgroundColor: backgroundBase,
        width: screenWidth,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },
})