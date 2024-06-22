import { View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Pressable, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const screenWidth = Dimensions.get('window').width;

const SearchField = () => {
    return (
        <>
            <TouchableOpacity style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for a gym"
                    placeholderTextColor="white"

                />
                <Pressable style={styles.searchBtn} >
                    <FontAwesome name="search" size={16} color="white" />
                </Pressable>
            </TouchableOpacity>

        </>
    )
}
let gray = "#2b2e37";
let slate = "white";
const styles = StyleSheet.create({
    searchBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    searchText: {
        fontWeight: "bold",
        color: "white",
    },
    searchBar: {
        width: screenWidth / 1.3,
        paddingLeft: 20,
        paddingRight: 20,
        color: "white",
    },
    searchContainer: {
        backgroundColor: gray,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "#51565b",
        borderRadius: 15,
    },
})

export default SearchField