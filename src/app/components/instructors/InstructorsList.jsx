import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, View, Text, StyleSheet } from "react-native";
import { useInstructor } from './../../contexts/instructor/InstructorContext';
import BottomBar from './../layout/BottomBar';

const InstructorsList = () => {
    const { getInstructors, instructorsList } = useInstructor();
    const [loading, setLoading] = useState(true);

    const fetchInstructors = async () => {
        try {
             await getInstructors();
             if(instructorsList.length > 0 ) {
                setLoading(false);
             }
        } catch (error) {
            console.error("Error fetching instructors:", error);
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, [instructorsList]);

    return (
        <Modal>
            { <View style={styles.container}>
                <ScrollView>
                    { !loading ?  (
                        instructorsList.map(instructor =>{
                            return (
                                <View>
                                    <Text style={styles.text}>
                                        {instructor.name}
                                    </Text>
                                </View>
                            )
                        }) ) : null
                    }
                </ScrollView>
            </View> }
            <BottomBar />
        </Modal>
    );
};

let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: backgroundBase,
    },
    item: {
        padding: 10,
        backgroundColor: backgroundBase,
        marginVertical: 5,
        borderRadius: 5,
    },
    text: {
        color: "white",
        fontSize: 20,
    }
});

export default InstructorsList;
