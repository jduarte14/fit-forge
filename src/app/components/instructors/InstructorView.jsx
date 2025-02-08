import { Modal, ScrollView, TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Fontsito from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const InstructorView = ({instructor, handleModal}) => {
    const [selectedInstructor, setInstructor] = useState(instructor);

    return (
        <Modal animationType="slide">
            <View style={styles.container}>
                <View style={{ marginBottom: "20%", alignItems:"center", display: "flex", gap: 15 }}>
                    <Image source={{ uri: selectedInstructor.avatar }} style={styles.avatar} />
                    <Text style={styles.title}>
                        {selectedInstructor.name}
                    </Text>
                </View>
                <View style={styles.col}>
                    <View style={styles.row}>
                        <FontAwesome name="whatsapp" size={24} color="white" style={{ marginRight: 10 }} />
                        <Text style={styles.text}>
                            {selectedInstructor.phone}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="white" style={{ marginRight: 10 }} />
                        <Text style={styles.text}>
                            {selectedInstructor.email}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="white" style={{ marginRight: 10 }} />
                        <Text style={styles.text}>
                            {selectedInstructor.phone}
                        </Text>
                    </View>
                    <View style={styles.box}>
                        {
                            Object.keys(selectedInstructor.specialty).map((specialty, index) => {
                                return (
                                    <Text style={styles.subText} key={index}>
                                        {specialty}
                                    </Text>
                                )
                            })
                        }
                    </View>
             
              
                </View>
                
            </View>
            <View style={styles.miniContainer}>
            <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.btn} onPress={()=> handleModal()}>
                        <Text style={styles.text}>
                            Contact
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={()=> handleModal()}>
                        <Text style={styles.text}>
                            Close
                        </Text>
                    </TouchableOpacity>
                    </View>
            </View>
           
        </Modal>
    )
};

export default InstructorView;

const windowWidth = Dimensions.get('window').width;

let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37";
let gray = "#374151";
let white = "#e2e8f0";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: backgroundBase,
    },
    miniContainer:{
        paddingBottom: 15,
        backgroundColor: backgroundBase,
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    title: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
        width: windowWidth - 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: backgroundSecondBase,
    },
    box: {
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
        width: windowWidth - 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: backgroundSecondBase,
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
    },
    buttonRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5,
      },
    subText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 20,
    },
    col: {
        display: "flex",
        justifyContent: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: backgroundSecondBase,
        borderWidth: 2,
    },
    btn:{
        backgroundColor: backgroundSecondBase,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 5,
        width: windowWidth / 2.7,
        textAlign:"center",
        display: "flex",
        justifyContent:"center",
        alignItems: "center",

    },
});