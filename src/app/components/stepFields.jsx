import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const StepFields = ({ fields, tag, fieldName, structure, action, handleStep, emit }) => {
  const [currentData, setCurrentData] = useState(structure);
  const [selectedItem, setSelectedItem] = useState([]);
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState([]);

  const handleSelectedItem = (item) => {
    let itemData = [];
    setSelectedItem((prevSelectedItem) => {
      if (prevSelectedItem.includes(item.name)) {
        return prevSelectedItem.filter((name) => name !== item.name);
      } else {
        itemData = [...prevSelectedItem, item.name];
        setCurrentData((prevData) => ({
          ...prevData,
          [fieldName]: itemData,
        }));
        return itemData;
      }
    });
  };

  const handleUser = () => {
    if (action == "userRegister") {
      console.log("va a emitir currentData");
      emit(currentData);
    } else {
      handleStep("next");
    }
  }

  const pickImage = async (width, height, type) => {
    let aspect;
    if (width && height) {
      aspect = [width, height];
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: aspect?.length ? aspect : [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newImageUri = result.assets[0].uri;
        if (type) {
          setAvatar(newImageUri);
          setCurrentData((prevData) => ({
            ...prevData,
            credentials: {
              ...prevData.credentials,
              avatar: newImageUri,
            },
          }));
        }
      } else {
        setImages((prevImages) => {
          const updatedImages = [...prevImages, newImageUri];
          setCurrentData((prevData) => ({
            ...prevData,
            [fieldName]: updatedImages,
          }));
          return updatedImages;
        });
      }
    } catch (error) {
    console.error(error);
  }
};

const deleteImage = (index) => {
  setImages((prevImages) => {
    const newImages = [...prevImages];
    newImages.splice(index, 1);
    setCurrentData((prevData) => ({
      ...prevData,
      gallery: newImages,
    }));
    return newImages;
  });
};
return (
  <View style={styles.container}>
    {fields ? (
      <ScrollView horizontal>
        {tag == "double_row" && fields["first_row"]
          ? fields["first_row"].map((item) => {
            return (
              <TouchableOpacity
                style={
                  selectedItem.includes(item.name)
                    ? styles.selected
                    : styles.touchable
                }
                key={item.name}
                onPress={() => handleSelectedItem(item)}
              >
                <>{item.icon}</>
                <Text style={styles.text} key={item}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })
          : null}
      </ScrollView>
    ) : null}
    {fields ? (
      <ScrollView horizontal>
        {tag == "double_row" && fields["second_row"]
          ? fields["second_row"].map((item) => {
            return (
              <TouchableOpacity
                style={
                  selectedItem.includes(item.name)
                    ? styles.selected
                    : styles.touchable
                }
                key={item.name}
                onPress={() => handleSelectedItem(item)}
              >
                <>{item.icon}</>
                <Text style={styles.text} key={item}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })
          : null}
      </ScrollView>
    ) : null}
    {tag == "schedules_form" ? (
      <View style={styles.form}>
        <View>
          <Text style={styles.inputText}>Opening hours:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              setCurrentData((prevData) => ({
                ...prevData,
                schedules: {
                  ...prevData.schedules,
                  startHours: text,
                },
              }));
            }}
            placeholder="example 8:30"
            placeholderTextColor="white"
          />
        </View>

        <View>
          <Text style={styles.inputText}>Closing hours:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              setCurrentData((prevData) => ({
                ...prevData,
                schedules: {
                  ...prevData.schedules,
                  endHours: text,
                },
              }));
            }}
            placeholder="example 22:00"
            placeholderTextColor="white"
          />
        </View>
        <View>
          <Text style={styles.inputText}>Available days:</Text>
          <View style={styles.row}>
            <View style={styles.pickerContainer}>
              <Picker style={{ color: "white" }}>
                {fields.days.reverse().map((day) => {
                  return <Picker.Item label={day} value={day} key={day} />;
                })}
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Picker style={{ color: "white" }}>
                {fields.days.reverse().map((day) => {
                  return <Picker.Item label={day} value={day} key={day} />;
                })}
              </Picker>
            </View>
          </View>
        </View>
      </View>
    ) : null}
    {tag == "prices_form" ? (
      <View style={styles.form}>
        {Object.keys(fields).map((key) => {
          return (
            <View style={styles.numberInput} key={key}>
              <MaterialIcons
                name="attach-money"
                size={30}
                color="white"
                style={{
                  backgroundColor: "#facc15",
                  borderRadius: 100,
                  marginRight: 10,
                }}
              />
              <TextInput
                placeholder={key.toLowerCase()}
                placeholderTextColor="white"
                keyboardType="numeric"
                color="white"
                onChangeText={(value) => {
                  setCurrentData((prevData) => ({
                    ...prevData,
                    prices: {
                      ...prevData.prices,
                      [key]: value,
                    },
                  }));
                }}
                style={{ fontSize: 18 }}
              />
            </View>
          );
        })}
      </View>
    ) : null}
    {tag == "gallery_form" ? (
      <View style={styles.galleryContainer}>
        <View style={styles.previewImageContainer}>
          <ScrollView horizontal>
            {images.length > 0 ? (
              images.map((image, index) => {
                return image ? (
                  <View
                    style={{ position: "relative" }}
                    key={"image_" + index}
                  >
                    <TouchableOpacity
                      style={styles.deleteImage}
                      onPress={() => deleteImage(index)}
                    >
                      <AntDesign name="close" size={20} color="white" />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: image }}
                      style={styles.previewImage}
                      key={image}
                    />
                  </View>
                ) : null;
              })
            ) : (
              <>
                <TouchableOpacity style={styles.touchable}>
                  <FontAwesome5 name="image" size={70} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable}>
                  <FontAwesome5 name="image" size={70} color="white" />
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.touchable} onPress={pickImage}>
          <View style={styles.row}>
            <FontAwesome6
              name="images"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.text}>Pick an image</Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : null}
    {tag == "info_form" ? (
      <View style={styles.container}>
        <Text style={styles.text}>
          Please confirm the information you have provided:
        </Text>

        {Object.entries(currentData).map(([key, value]) => (
          <View key={key} style={styles.infoRow}>
            <Text style={styles.infoKey}>{key}:</Text>
            <Text style={styles.infoValue}>
              {Array.isArray(value) ? value : JSON.stringify(value)}
            </Text>
          </View>
        ))}


      </View>
    ) : null}
    {
      tag == "user_data" ? (
        <>
          <View style={styles.galleryContainer}>
            <TouchableOpacity onPress={() => pickImage(4, 4, "credentials")} style={styles.previewAvatar}>
              {
                avatar.length ? (<>
                  <Image
                    source={{ uri: avatar }}
                    style={styles.avatar}
                  />
                  <TouchableOpacity
                    style={styles.deleteImage}
                    onPress={() => deleteImage(index)}
                  >
                    <AntDesign name="close" size={20} color="white" />
                  </TouchableOpacity>
                </>
                ) : (
                  <>
                    <AntDesign name="user" size={55} color="white" />
                    <View styles={{ position: 'absolute', right: 10 }}>
                      <FontAwesome6 name="add" size={24} color="white" />
                    </View>
                  </>
                )
              }
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="white"
              style={styles.input}
              onChangeText={(value) => {
                setCurrentData((prevData) => ({
                  ...prevData,
                  credentials: {
                    ...prevData.credentials,
                    name: value,
                  },
                }));
              }}
            />
            <TextInput
              placeholder="Username"
              onChangeText={(value) => {
                setCurrentData((prevData) => ({
                  ...prevData,
                  credentials: {
                    ...prevData.credentials,
                    username: value,
                  },
                }));

              }}
              placeholderTextColor="white"
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              onChangeText={(value) => {
                setCurrentData((prevData) => ({
                  ...prevData,
                  credentials: {
                    ...prevData.credentials,
                    email: value,
                  },
                }));
              }}
              placeholderTextColor="white"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
              onChangeText={(value) => {
                setCurrentData((prevData) => ({
                  ...prevData,
                  credentials: {
                    ...prevData.credentials,
                    password: value,
                  },
                }));
              }}
              style={styles.input}
            />
            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={() => handleUser()}>
                <Text style={styles.buttonText}>
                  {
                    action == "userRegister" ? "Register" : "Next"
                  }
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : null
    }
  </View >
);
};

export default StepFields;

const backgroundBase = "#1c2229";
const backgroundSecondBase = "#2b2e37";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginTop: 50,
  },
  touchable: {
    backgroundColor: backgroundSecondBase,
    padding: 10,
    width: screenWidth - 100,
    borderWidth: 2,
    borderColor: "#51565b",
    borderRadius: 15,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  previewAvatar: {
    backgroundColor: backgroundSecondBase,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 100,
    marginBottom: 20,
    height: 100,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selected: {
    backgroundColor: backgroundSecondBase,
    padding: 10,
    width: screenWidth - 100,
    borderWidth: 3,
    borderColor: "#51565b",
    borderRadius: 15,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderColor: "white",
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    width: screenWidth - 30,
    height: 50,
    borderWidth: 2,
    borderColor: backgroundSecondBase,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 15,
    paddingLeft: 20,
    fontWeight: "bold",
    color: "white",
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
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: backgroundBase
  },
  inputText: {
    color: "white",
    fontSize: 20,
    paddingVertical: 20,
  },
  textInput: {
    backgroundColor: backgroundSecondBase,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#51565b",
    width: screenWidth - 50,
    color: "white",
  },
  numberInput: {
    backgroundColor: backgroundSecondBase,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#51565b",
    width: screenWidth - 50,
    color: "white",
    marginVertical: 10,
    flexDirection: "row",
  },
  pickerContainer: {
    backgroundColor: backgroundSecondBase,
    borderColor: "white",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 10,
    width: screenWidth - 220,
    color: "white",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  previewImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  previewImage: {
    width: screenWidth / 1.5,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 50,
    position: "relative",
  },
  galleryContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  deleteImage: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: backgroundSecondBase,
    padding: 5,
    borderRadius: 100,
    zIndex: 1,
  },
});
