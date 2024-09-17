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
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const StepFields = ({ fields, tag, fieldName }) => {
  const [currentData, setCurrentData] = useState({
    sports: {},
    facilities: {},
    schedules: {},
    prices: {},
    gallery: {},
  });
  const [selectedItem, setSelectedItem] = useState([]);
  const [images, setImages] = useState([]);

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

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newImageUri = result.assets[0].uri;
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
      {tag == "confirmForm" ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            Please confirm the information you have provided:
          </Text>
          <Text style={styles.text}>
            {JSON.stringify(currentData, null, 2)}
          </Text>
        </View>
      ) : null}
    </View>
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
    marginBottom: 50,
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
