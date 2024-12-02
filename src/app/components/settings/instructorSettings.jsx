import React, { useState } from "react";
import StepFields from "../stepFields";
import { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { infoForm, specialtyData, instructorDescription } from "./../../../data/gymData";

const InstructorSettings = ({ field, emit }) => {
    const [step, setStep] = useState(0);

    const typeData = {
        instructorDescription,
        specialtyData,
        infoForm,
    }

    const handleStep = (direction) => {
        setStep((prevStep) => {
            const maxSteps = Object.keys(field).length - 1;
            let newStep;

            if (direction === "next" && prevStep < maxSteps) {
                newStep = prevStep + 1;
            } else if (direction === "back" && prevStep > 0) {
                newStep = prevStep - 1;
            } else {
                newStep = prevStep;
            }
            return newStep;
        });
    };

    const getStepData = () => {
        const authKeys = Object.keys(typeData);

        if (authKeys[step]) {
            const stepKey = authKeys[step];
            const stepData = typeData[stepKey];
            return {
                tag: stepData.tag,
                fields: stepData.items,
                name: stepData.name,
            };
        }
        return {};
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Manage Instructor Settings</Text>
            <StepFields
                tag={getStepData().tag}
                fields={getStepData().fields}
                fieldName={getStepData().name}
                structure={typeData}
                handleStep={handleStep}
                emit={emit}
            />
            <View style={styles.navigationRow}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                        handleStep("back");
                    }}
                >
                    <MaterialIcons name="navigate-before" size={45} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                        handleStep("next");
                    }}
                >
                    <MaterialIcons name="navigate-next" size={45} color="white" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default InstructorSettings;


let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c2229",
    },
    title: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        marginVertical: 10,
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
});
