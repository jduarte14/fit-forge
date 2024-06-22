import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomBar from './../layout/BottomBar';

const screenWidth = Dimensions.get('window').width;

const userPanel = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profileRow}>
                <Image
                    style={styles.profileImage}
                    source={require('./../../../img/avatar.png')}
                />
                <Text style={styles.title}>Username</Text>
            </View>
            <View style={styles.settings}>
                <View style={styles.option}>
                    <Fontisto name="email" size={24} color="white" />
                    <Text style={styles.text}>
                        Change email
                    </Text>
                </View>
                <View style={styles.option}>
                    <MaterialCommunityIcons name="form-textbox-password" size={24} color="white" />
                    <Text style={styles.text}>
                        Change password
                    </Text>
                </View>
                <View style={styles.option}>
                    <MaterialIcons name="emoji-emotions" size={24} color="white" />
                    <Text style={styles.text}>
                        Change avatar
                    </Text>
                </View>
                <View style={styles.option}>
                    <Entypo name="credit-card" size={24} color="white" />
                    <Text style={styles.text}>
                        Payment settings
                    </Text>
                </View>
            </View>
            <BottomBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1d212a',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
    profileRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap:20,
        margin: 5,
        flexDirection: "row",
        width: screenWidth / 1.1,
    },
    profileImage: {
        width: 55,
        height: 55,
    },
    title: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    text: {
        color: "white",
    },
    option: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 20,
        alignItems: "center",
        width: screenWidth / 1.1,
    }
})

export default userPanel;