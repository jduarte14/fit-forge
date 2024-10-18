import { MaterialIcons, Close } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions, Pressable, Modal, TouchableOpacity, Image } from "react-native";
import StepFields from "./../stepFields";
import { sportData, facilitiesData, schedulesData, pricesData, galleryData, infoForm, userData, avatarData } from "./../../../data/gymData";
import { useUser } from "../../contexts/user/UserContext.jsx"

const Login = ({ setUserLogged }) => {
  const { createUser, user } = useUser();

  const [modal, setModal] = useState(false);
  const [logged, setLogin] = useState(false);
  const [step, setStep] = useState(0);
  const [authStructure, setAuthStructure] = useState([]);
  const [typeAuth, setTypeAuth] = useState({});
  const [authSettings, setAuthSettings] = useState({});
  const [progress, setProgress] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });


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
        sportData,
        infoForm,
      }
    }
    setAuthSettings(typeData);
  }


  const handleStep = (direction) => {
    setStep((prevStep) => {
      let newStep;
      if (direction === "next" && prevStep < 5) {
        newStep = prevStep + 1;
      } else if (direction === "back" && prevStep >= 0) {
        newStep = prevStep - 1;
      }

      setProgress((prevProgress) => ({
        ...prevProgress,
        [newStep]: 0,
        [prevStep]: newStep > prevStep ? 1 : 0,
      }));

      return newStep;
    });
  };

  const getStepData = () => {
    const authKeys = Object.keys(authSettings);
    if (authKeys[step]) {
      const stepKey = authKeys[step];
      const stepData = authSettings[stepKey];
      return {
        tag: stepData?.tag,
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
  const handleAuthenticationResult = async (data) => {
    const response = createUser(data);
  }
  const logUser = () => {
    if (user) {
      setModal(false)
      setUserLogged(true);
    }
  }
  useEffect(() => {
    logUser();
  }, [user])
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
          onChangeText=""
          placeholderTextColor="white"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText=""
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <Pressable style={styles.button}>
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
              <Text style={styles.centeredTitle}>Choose your activities</Text>
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
              <View style={styles.row}>
                {Object.keys(progress).map((key) => (
                  <Progress.Bar
                    key={key}
                    progress={progress[key.items]}
                    width={screenWidth / 10}
                    height={10}
                    borderColor="#2b2e37"
                    color="#51565b"
                    style={styles.progress}
                  />
                ))}
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
