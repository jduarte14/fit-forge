//import { Octicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Octicons } from '@expo/vector-icons';
const screenWidth = Dimensions.get('window').width;

const HomeProfile = () => {

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.title}>Hi Joaco!</Text>
                        <Text style={styles.subTitle}>Good morning</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.icon}>
                        <Octicons name="bell" size={24} color="white" />
                    </TouchableOpacity>
                    <Image
                        style={styles.profileImage}
                        source={require('./../../../img/avatar.png')}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    },
    title: {
        color: "white",
        fontSize: 20,
    },
    rowContainer: {
        display: "flex",
        width: screenWidth - 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: "auto"
    },
    subTitle: {
        color: "white"
    },
    row: {
        paddingTop: "5%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    col: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    profileImage: {
        width: 55,
        height: 55,
    },
    icon: {
        marginRight: 20,
        backgroundColor: "#33353e",
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 50,
    }
})
export default HomeProfile;