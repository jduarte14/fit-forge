import { MaterialIcons, Close } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions, Pressable, Modal, TouchableOpacity, Image } from "react-native";
import StepFields from "./../stepFields";
import { sportData, facilitiesData, schedulesData, pricesData, galleryData, infoForm, userData, specialtyData, gymDescription, instructorDescription } from "./../../../data/gymData";
import { useUser } from "../../contexts/user/UserContext.jsx"
import { useInstructor } from "./../../contexts/instructor/InstructorContext.jsx";
import { useOwner } from "./../../contexts/owner/OwnerContext.jsx"

const Login = ({ setUserLogged }) => {
  const { createUser, user, logUser, getToken, getUser } = useUser();
  const { createInstructor } = useInstructor();
  const { createGym } = useOwner();
  
  const [modal, setModal] = useState(false);
  const [logged, setLogin] = useState(false);
  const [step, setStep] = useState(0);
  const [authStructure, setAuthStructure] = useState([]);
  const [typeAuth, setTypeAuth] = useState({});
  const [authSettings, setAuthSettings] = useState({});
  const [logData, setLogData] = useState({});

  // This funciton handles the type of user on the authentication process
  const handleAutenticationSettings = (type) => {
    let typeData;
    if (type == "userRegister") {
      typeData = { userData };
    }
    if (type == "ownerRegister") {
      typeData = {
        userData,
        sportData,
        gymDescription,
        facilitiesData,
        schedulesData,
        pricesData,
        galleryData,
        infoForm
      }
    }
    if (type == "instructorRegister") {
      typeData = {
        userData,
        instructorDescription,
        specialtyData,
        infoForm,
      }
    }
    setAuthSettings(typeData);
  }


  const handleStep = (direction) => {
    setStep((prevStep) => {
      const maxSteps = Object.keys(authSettings).length - 1;
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
    const authKeys = Object.keys(authSettings);
    if (authKeys[step]) {
      const stepKey = authKeys[step];
      const stepData = authSettings[stepKey];
      return {
        tag: stepData.tag,
        fields: stepData.items,
        name: stepData.name,
      };
    }
  };

  const handleAuth = async (action) => {
    setTypeAuth(action);
    setModal(true);
    handleAutenticationSettings(action);
  };

  const handleModal = () => {
    if (modal) {
      setAuthSettings({});
      setModal(false);
    } else {
      setModal(true);
    }
  }
  const setIntialData = (structure) => {
    let structureObject = {};
    structure.forEach(key => {
      structureObject[key] = {};
    })
    setAuthStructure(structureObject);
  }
  const handleAuthenticationResult = async (userData, userCreator) => {
    let userResponse;
    let response;
     userResponse = await createUser(userData);
    if (typeAuth == "instructorRegister") {
      response = await createInstructor(userCreator, user["_id"]);
    }
    else if (typeAuth == "ownerRegister") {
      response = await createGym(userCreator, user["_id"]);
    }
    if (response) {
      return response && userResponse;
    } else {
      //logUser();
      return userResponse;
    }
  }
  const login = async () => {
    await logUser(logData);
    if (user) {
      setModal(false)
      setUserLogged(true);
    }
  } 
  const handleToken = async () => {
    let token = await getToken();
    await getUser(token);
    if(user) {
      setUserLogged(true);
    }

  }

  useEffect(() => {
    handleToken();
  }, [])
  useEffect(() => {
    const authKeys = Object.keys(authSettings);
    const keyNames = [];
    authKeys.forEach(key => {
      keyNames.push(authSettings[key].name);
    });
    setIntialData(keyNames);
  }, [authSettings])


  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("./../../../img/logo_white.png")}
      ></Image>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          style={styles.input}
          onChangeText={(value) => setLogData(prevData => ({ ...prevData, email: value }))}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={(value) => setLogData(prevData => ({ ...prevData, password: value }))}
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={() => { login() }}>
            <Text style={styles.buttonText}>
              Login
            </Text>
          </Pressable>
        </View>
        <Text style={styles.infoText} onPress={() => { handleAuth("userRegister") }}>You don't have an account? Register</Text>
        <View style={styles.buttonWrap}>
          <Pressable style={styles.buttonWrapped} onPress={() => { handleAuth("instructorRegister") }}>
            <Text style={styles.buttonText}>Register as an instructor</Text>
          </Pressable>
          <Pressable
            style={styles.buttonWrapped}
            onPress={() => handleAuth("ownerRegister")}
          >
            <Text style={styles.buttonText}>Register your gym</Text>
          </Pressable>
        </View>
      </View>
      {
        modal && (
          <Modal animationType="slide" visible={modal}>
            <View style={styles.modal}>
              <Pressable style={styles.close} onPress={() => handleModal()}>
                <MaterialIcons name="close" color="white" style={{ fontSize: 30 }} />
              </Pressable>
              <Text style={styles.centeredTitle}>Add your data</Text>
              <View style={{ height: 400 }}>
                {
                  <StepFields
                    tag={getStepData().tag}
                    fields={getStepData().fields}
                    fieldName={getStepData().name}
                    structure={authStructure}
                    action={typeAuth}
                    handleStep={handleStep}
                    emit={handleAuthenticationResult}
                  />
                }
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
            </View>
          </Modal>
        )
      }
    </View >
  );
};

export default Login;

let backgroundBase = "#1c2229";
let backgroundSecondBase = "#2b2e37";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
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
    gap: 4,
  },
  modal: {
    flex: 1,
    backgroundColor: backgroundBase,
    height: screenHeight,
    alignItems: "center",
    justifyContent: "space-around",
  },
  logo: {
    marginTop: 30,
    width: 250,
    height: 150,
    marginBottom: 40,
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
    fontSize: 25,
    paddingBottom: 50,
  },
  close: {
    backgroundColor: backgroundSecondBase,
    position: 'absolute',
    right: 0,
    marginRight: 10,
    borderRadius: 20,
    padding: 5,
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
    fontWeight: "bold",
    color: "white",
    marginHorizontal: "auto",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 13,
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
  },
  progress: {
    margin: 5,
  },
});
