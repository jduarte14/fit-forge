import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { useInstructor } from './../../contexts/instructor/InstructorContext';
import BottomBar from './../layout/BottomBar';
import InstructorView from './InstructorView';

const InstructorsList = () => {
    const { getInstructors, instructorsList } = useInstructor();
    const [loading, setLoading] = useState(true);
    const [selectedInstructor, setSelectedInstructor] = useState({});
    const [modal, setModal] = useState(false);

    const fetchInstructors = async () => {
        try {
            await getInstructors();
            if (instructorsList.length > 0) {
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching instructors:", error);
        }
    };

    const handleSelectedInstructor = (instructor) => {
        console.log(" se llama")
        setSelectedInstructor(instructor);
        handleModal();
        console.log(selectedInstructor, instructor);
    }

    const handleModal = () => {
        setModal((prevModal) => !prevModal);
    }

    useEffect(() => {
        fetchInstructors();
    }, [instructorsList]);

    return (
        <Modal>
            {<View style={styles.container}>
                <ScrollView>
                    {!loading && instructorsList?.length > 0 ? (
                        instructorsList.map((instructor, index) => {
                            return (
                                <View style={styles.rowItem}>
                                    <>
                                        <View>
                                            <View style={styles.avatarContainer}>
                                                <Image source={{ uri: instructor.avatar }} style={styles.avatar} />
                                                <Text style={styles.text}>
                                                    {instructor.name}
                                                </Text>
                                            </View>
                                            <View style={styles.row}>
                                                <View style={styles.specialty}>
                                                    {
                                                        Object.keys(instructor.specialty).map(specialty => {
                                                            return (
                                                                <Text style={styles.subText}>
                                                                    {specialty}
                                                                </Text>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </View>

                                        </View>
                                    </>
                                    <TouchableOpacity style={styles.btn} onPress={() => { handleSelectedInstructor(instructor) }}>
                                        <Text style={styles.smallText}>
                                            See more
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        })) : null
                    }
                </ScrollView>
                {
                    modal ?
                        <InstructorView instructor={selectedInstructor} handleModal={handleModal} /> : null
                }
            </View>}
            <BottomBar />
        </Modal>
    );
};

let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37";
let gray = "#374151";
let white = "#e2e8f0";

const screenWidth = Dimensions.get("window").width;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundBase,
    },
    subText: {
        color: white,
        fontSize: 12,
        backgroundColor: gray,
        borderRadius: 30,
        maxWidth: "max-content",
        textAlign: "center",
        paddingHorizontal: 5,
        marginTop: 10,
        marginRight: 5,
        fontWeight: "bold",
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    smallText: {
        color: "white",
        fontSize: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        position: "relative",
    },
    rowItem: {
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        position: "relative",
        padding: 10,
        backgroundColor: backgroundSecondBase,
        marginTop: 20,
        borderRadius: 10,
        width: screenWidth - 50,
    },
    avatar: {
        borderRadius: 100,
        width: 55,
        height: 55,
        marginRight: 10,
        borderWidth: 2,
        borderColor: gray,
    },
    specialty: {
        display: "flex",
        flexDirection: "row"
    },
    btn: {
        borderRadius: 15,
        backgroundColor: gray,
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    avatarContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
});

export default InstructorsList;
