import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const Bottombar = () => {
    return (
        <View style={styles.row}>
            <TouchableOpacity>
                <Link href="/" style={styles.btn}>
                    <View style={styles.btn}>
                        <FontAwesome6 name="dumbbell" size={24} color="white" />
                        <Text style={styles.text}>Gyms</Text>
                    </View>

                </Link>
            </TouchableOpacity>
            <TouchableOpacity>
                <Link href="/instructors" style={styles.btn}>
                    <View style={styles.btn}>
                        <FontAwesome name="tasks" size={24} color="white" />
                        <Text style={styles.text}>Instructors</Text>
                    </View>

                </Link>
            </TouchableOpacity>
            <TouchableOpacity>
                <Link href="/gymMap" style={styles.btn}>
                    <View style={styles.btn}>
                        <FontAwesome name="map-pin" size={24} color="white" />
                        <Text style={styles.text}>Gym map</Text>
                    </View>

                </Link>
            </TouchableOpacity>
            <TouchableOpacity>
                <Link href="/profile" style={styles.btn}>
                    <View style={styles.btn}>
                    <MaterialIcons name="local-grocery-store" size={24} color="white" />
                        <Text style={styles.text}>Stores</Text>
                    </View>

                </Link>
            </TouchableOpacity>
            <TouchableOpacity>
                <Link href="/profile" style={styles.btn}>
                    <View style={styles.btn}>
                        <FontAwesome name="user" size={24} color="white" />
                        <Text style={styles.text}>Profile</Text>
                    </View>
                </Link>
            </TouchableOpacity>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 20,
        paddingHorizontal: 30,
        paddingBottom: 5,
        width: screenWidth,
        position:"absolute",
        bottom: 0,
        backgroundColor:"#1c2229",
    },
    btn: {
        paddingTop: 5,
        paddingVertical: 3,
        display: "flex",
        alignItems: "center"
    },
    text: {
        color: "white",
        textAlign: "center",
    }
})

export default Bottombar;