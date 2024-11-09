import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Dimensions, ScrollView, Touchable } from 'react-native';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomBar from './../layout/BottomBar';
import UserSettings from './../settings/userSettings';
import { useUser } from "./../../contexts/user/UserContext";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const userPanel = () => {
    const [modal, setModal] = useState("");
    const [userData, setUserData] = useState(null);
    const [patchData, setPatchData] = useState({});

    const { user, patchUser } = useUser();

    const modifyUser = async (userData)=>{ 
        await patchUser(userData, user["_id"]);
    }

    const typeSettings = {
        credentials: {
            title: "Update Your Credentials",
            button: "Submit change",
            emit: modifyUser,
            fields: [
                {
                    tag: "password",
                    item: "input",
                    placeholder: "Enter your new password",
                    keyboardType: "default"
                },
                {
                    tag: "email",
                    item:"input",
                    placeholder: "Enter your new email address",
                    keyboardType: "email-address"
                }
            ],
        },
        avatar: {
            type: "avatar",
            item: "avatar",
            value: "",
            title: "Change your avatar",
            button: "Submit change"
        }
    };
    
    const handleModal = (tag) => {
        if (tag) {
            let seted = typeSettings[tag];
            setUserData(seted);
            setModal(tag);
        } else {
            setModal("");
            setUserData(null);
        }
    }

    const handleSettings = (value, tag) => {
        setPatchData(prevData => {
            const newData = { ...prevData, [tag]: value };
            return newData;
        });
    }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.profileRow}>
                        <Image
                            style={styles.profileImage}
                            source={user.avatar ? { uri: user.avatar } : require('./../../../img/avatar.png')}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{user.username}</Text>
                            <Text style={styles.subTitle}>{user.email}</Text>
                        </View>
                    </View>
                    <View style={styles.settings}>
                        <TouchableOpacity style={styles.option} onPress={() => { handleModal("credentials") }}>
                            <Fontisto name="email" size={24} color="white" />
                            <Text style={styles.text}>
                                Change credentials
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => { handleModal("email") }}>
                            <MaterialCommunityIcons name="form-textbox-password" size={24} color="white" />
                            <Text style={styles.text}>
                                Change password
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => { handleModal("avatar") }}>
                            <MaterialIcons name="emoji-emotions" size={24} color="white" />
                            <Text style={styles.text}>
                                Change avatar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Entypo name="credit-card" size={24} color="white" />
                            <Text style={styles.text}>
                                Payment settings
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        modal != "" ? (
                            <Modal animationType="slide">
                                <View style={styles.modal}>
                                    <TouchableOpacity style={styles.back} onPress={() => handleModal("")}>
                                        <Ionicons style={{ margin: "auto" }} name="chevron-back" size={24} color="white" />
                                    </TouchableOpacity>
                                    <UserSettings field={userData} handleSettings={handleSettings} data={patchData}/>
                                </View>
                            </Modal>) : null
                    }

                </View>
                <BottomBar />
            </View>

        </>
    )
}
const backgroundBase = "#1c2229";
const backgroundSecondBase = "#2b2e37";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1d212a',
        flex: 1,
    },
    modal: {
        backgroundColor: backgroundBase,
        flex: 1,
    },
    back: {
        padding: 10,
        borderRadius: 25,
        backgroundColor: backgroundSecondBase,
        width: 45,
        height: 45,
        margin: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
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
        top: '5%',
    },
    profileImage: {
        width: 65,
        height: 65,
        borderRadius: 100,
        borderColor: "#51565b",
        borderWidth: 2,
    },
    infoContainer: {
        display: "flex",

    },
    title: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 16,
        color: "white",
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