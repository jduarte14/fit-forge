import Map from "./components/gym/map";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";
import { useOwner } from "./contexts/owner/OwnerContext";
import { useState, useEffect } from "react";

const gymMap = () => {
    const { gyms, getGyms } = useOwner();
    const [gymList, setGymList] = useState([]);

    const getGymsInfo = async ()=>{
        const response = await getGyms();
        if(response) {
            setGymList(response);
        }
    }

    useEffect(()=>{
        getGymsInfo();
    }, []);
    
    return (
        <>
            <Map gyms={gyms}/>
            <View style={styles.row}>
                <TouchableOpacity style={styles.btn} >
                    <Link href="/">
                        <Text style={styles.text}>
                            Go back
                        </Text>
                    </Link>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default gymMap;



let backgroundBase = "#1c2229"
let backgroundSecondBase = "#2b2e37"

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "white",
    },
    btn: {
        padding: 10,
        backgroundColor: backgroundSecondBase,
        borderRadius: 5,
        margin: 5,
        width: screenWidth - 50,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
})