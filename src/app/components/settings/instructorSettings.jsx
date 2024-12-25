import React, { useState } from "react";
import StepFields from "../stepFields";
import { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { infoForm, specialtyData, instructorDescription } from "./../../../data/gymData";

const InstructorSettings = ({ field, emit, instructorData }) => {
    const [step, setStep] = useState(0);
    const [intialData, setInitialData] = useState(new Set);

    const typeData = {
        
        specialtyData,
        instructorDescription,
        specialtyData,
        infoForm,
    }

    const handleStep = (direction) => {
        setStep((prevStep) => {
            const maxSteps = Object.keys(typeData).length;
            let newStep;
            if (direction === "next" && prevStep < maxSteps) {
                newStep = prevStep + 1;
            } else if (direction === "back" && prevStep > 0) {
                newStep = prevStep - 1;
            } else {
                return;
            }
            return newStep;
        });
    };

    const getStepData = () => {
        const instructorKeys = Object.keys(typeData);

        if (instructorKeys[step]) {
            const stepKey = instructorKeys[step];
            const stepData = typeData[stepKey];

            return {
                tag: stepData.tag || "",
                fields: stepData.items || [],
                name: stepData.name || "",
            };
        }
    };


    const intialValue = () => {
        const stepData = getStepData();
        if (!stepData || !stepData.name) return;

        const instructorSection = instructorData[stepData.name];
        if (instructorSection) {
            const instructorKeys = Object.keys(instructorSection);
            if (instructorKeys.length > 0) {
                setInitialData(instructorSection);
            }
        }
    }


    useEffect(() => {
        const stepData = getStepData();
        if (stepData && stepData.name) {
            intialValue();
        }
    }, [step])

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Manage Instructor Settings</Text>
                <View style={{ height: 400 }}>
                    <StepFields
                        tag={getStepData().tag}
                        fields={getStepData().fields}
                        fieldName={getStepData().name}
                        structure={typeData}
                        handleStep={handleStep}
                        intialData={intialData}
                        onPatch={true}
                        emit={emit}
                    />
                </View>

            </View>
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
        </>

    );
};

export default InstructorSettings;


let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37"

const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c2229",
        height: screenHeight,
        paddingHorizontal: 15,
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
        marginBottom: 50,
        paddingBottom: 50,
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
