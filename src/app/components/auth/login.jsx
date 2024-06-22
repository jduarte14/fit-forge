import { FontAwesome6, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Pressable, Modal, TouchableOpacity } from 'react-native';
import StepFields from './../stepFields'

const Login = () => {
    const [action, setAction] = useState("login");
    const [modal, setModal] = useState(true);
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState({
        1: 0,
        2: 0,
        3: 0,
    });

    const handleStep = (direction) => {
        setStep(prevStep => {
            let newStep = prevStep;
            if (direction === "next" && prevStep < 3) {
                newStep = prevStep + 1;
            } else if (direction === "back" && prevStep >= 1) {
                newStep = prevStep - 1;
            }

            setProgress(prevProgress => ({
                ...prevProgress,
                [newStep]: newStep > 0 ? 1 : 0,
                [prevStep]: newStep > prevStep ? 1 : 0
            }));

            return newStep;
        });
    };

    const sportData = {
        sports: [
            { name: "calisthenic", icon: <FontAwesome6 name="person-swimming" size={50} color="white" /> },
            { name: "pilates", icon: <MaterialCommunityIcons name="yoga" size={50} color="white" /> },
            { name: "boxing", icon: <MaterialCommunityIcons name="boxing-glove" size={50} color="white" /> },
            { name: "bjj", icon: <MaterialIcons name="sports-mma" size={50} color="white" /> },
            { name: "mma", icon: <MaterialCommunityIcons name="yoga" size={50} color="white" /> },
            { name: "wrestling", icon: <MaterialCommunityIcons name="yoga" size={50} color="white" /> },
            { name: "weightlifting", icon: <FontAwesome5 name="dumbbell" size={50} color="white" /> },
            { name: "yoga", icon: <MaterialCommunityIcons name="yoga" size={50} color="white" /> },
        ],
        facilities: [
            { name: "showers", icon: <MaterialCommunityIcons name="shower-head" size={50} color="white" /> },
            { name: "lockers", icon: <MaterialCommunityIcons name="boxing-glove" size={50} color="white" /> },
            { name: "canteen", icon: <MaterialIcons name="sports-mma" size={50} color="white" /> },
            { name: "pingpong", icon: <MaterialCommunityIcons name="yoga" size={50} color="white" /> },
            { name: "spa", icon: <MaterialCommunityIcons name="yoga" size={50} color="white" /> },
            { name: "sauna", icon: <FontAwesome5 name="dumbbell" size={50} color="white" /> },
        ]
    }

    const handleActions = () => {
        switch (action) {
            case "userRegister":
                return "";
            case "instructorLogin":
                return setAction("instructorLogin");
            case "instructorRegister":
                return setAction("instructorRegister");
            case "ownerLogin":
                return setAction("ownerLogin");
            case "ownerRegister":
                return setAction("ownerRegister");
            default:
                return "userLogin";
        }
    }
    const handleAuth = async (action) => {

    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
                Logo
            </Text>

            <Text style={styles.title}>
                Login
            </Text>
            <View style={styles.form}>
                <TextInput
                    placeholder="Email"
                    onChangeText=""
                    placeholderTextColor="white"
                    value=""
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry
                    onChangeText=""
                    value=""
                    style={styles.input}
                />
                <View style={styles.buttonRow}>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>{action === "login" ? "Login" : "Register"}</Text>
                    </Pressable>
                </View>
                <Text style={styles.infoText}>
                    You dont have an account? Register
                </Text>
                <View style={styles.buttonWrap}>
                    <Pressable style={styles.buttonWrapped}>
                        <Text style={styles.buttonText}>Im an instructor</Text>
                    </Pressable>
                    <Pressable style={styles.buttonWrapped} onPress={() => handleActions("ownerRegister")}>
                        <Text style={styles.buttonText}>Im a gym owner</Text>
                    </Pressable>
                </View>
            </View>
            {modal && (
                <Modal animationType='slide' visible={modal}>
                    <View style={styles.modal}>
                        <Text style={styles.centeredTitle}>
                            Choose your activities
                        </Text>
                        <View style={{ height: 400 }}>
                            {Object.keys(sportData).map((key, index) => (
                                <StepFields key={key + '' + index} fields={sportData[key]} />
                            ))}
                        </View>
                        <View style={styles.row}>
                            {/* {
                                progress ? Object.keys(progress).map((bar) => {
                                    <Progress.Bar progress={0} width={screenWidth / 4.7} height={10} borderColor='#2b2e37' color='#51565b' style={styles.progress} />
                                }) : null
                            } */}
                            <Progress.Bar progress={progress[1]} width={screenWidth / 4.7} height={10} borderColor='#2b2e37' color='#51565b' style={styles.progress} />
                            <Progress.Bar progress={progress[2]} width={screenWidth / 4.7} height={10} borderColor='#2b2e37' color='#51565b' style={styles.progress} />
                            <Progress.Bar progress={progress[3]} width={screenWidth / 4.7} height={10} borderColor='#2b2e37' color='#51565b' style={styles.progress} />
                        </View>
                        <View style={styles.navigationRow}>
                            <TouchableOpacity style={styles.touchable} onPress={() => { handleStep("back") }}>
                                <MaterialIcons name="navigate-before" size={45} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchable} onPress={() => { handleStep("next") }}>
                                <MaterialIcons name="navigate-next" size={45} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
            )}

        </View >
    )
}

export default Login;

let backgroundBase = "#1c2229"
let backgroundSecondBase = "#2b2e37"
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: screenHeight - 30,
    },
    row: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        gap: 40,
    },
    modal: {
        flex: 1,
        backgroundColor: backgroundBase,
        height: screenHeight,
        alignItems: "center",
        justifyContent: "space-around",
    },
    logo: {
        color: "white",
        fontWeight: "bold",
        fontSize: 35,
        color: "white",
        marginTop: 30,
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
        paddingVertical: 35,
    },
    centeredTitle: {
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        fontSize: 30,
    },
    form: {
        paddingTop: 10,
    },
    input: {
        width: screenWidth - 30,
        height: 55,
        borderWidth: 2,
        borderColor: backgroundSecondBase,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 15,
        paddingLeft: 20,
        fontWeight: "bold"
    },
    buttonRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    navigationRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    touchable: {
        backgroundColor: backgroundSecondBase,
        padding: 2,
        borderWidth: 2,
        borderColor: "#51565b",
        borderRadius: 15,
        margin: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    buttonWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,
    },
    button: {
        backgroundColor: "#2b2e37",
        borderWidth: 2,
        borderColor: backgroundSecondBase,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 25,
        width: screenWidth - 50,
    },
    buttonWrapped: {
        marginHorizontal: 10,
        backgroundColor: "#2b2e37",
        borderWidth: 2,
        borderColor: backgroundSecondBase,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
    text: {
        color: "white",
        paddingTop: 10,
        textAlign: "center",
    },
    infoText: {
        paddingVertical: 15,
        textAlign: "center",
        color: "white",
    }
})