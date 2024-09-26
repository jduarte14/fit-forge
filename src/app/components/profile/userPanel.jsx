import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Dimensions, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomBar from './../layout/BottomBar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const userPanel = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.wrapper}>
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
                </View>
                <BottomBar />
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1d212a',
        flex: 1,
    },
    wrapper:{
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: screenHeight - 100,
        marginTop: 50,
        flex: 1,
        position: 'relative',
    },
    profileRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        margin: 5,
        flexDirection: "row",
        width: screenWidth / 1.1,
        paddingLeft: 5,
        marginBottom: 50,
        position: 'absolute',
        top: '10%',
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
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 5,
        borderColor: "#51565b",
        borderWidth: 2,
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 20,
        alignItems: "center",
        width: screenWidth / 1.1,
    }
})

export default userPanel;