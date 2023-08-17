import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

export default function CreatePostsScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>

        {/* <View style={styles.header}>
          <Text style={styles.titel}>Створити публікацію</Text>
        </View> */}

        <View style={styles.posters}>
          <View style={styles.poster}>
            <TouchableOpacity style={styles.camera}>
              <View>
                <MaterialIcons
                  style={styles.iconCamera}
                  name="camera-alt"
                  size={24}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.textPoster}>Завантажте фото</Text>

          <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
          <TextInput
            value={""}
            // onChangeText={setEmail}
            placeholder="Назва..."
            placeholderTextColor={"#bdbdbd"}
            style={styles.input}
            onFocus={() => setIsShowKeyboard(true)}
          />
          <TextInput
            value={""}
            // onChangeText={setEmail}
            placeholder="Місцевість..."
            placeholderTextColor={"#bdbdbd"}
            style={styles.inputLocation}
            onFocus={() => setIsShowKeyboard(true)}
          />
          <Feather style={styles.iconMapPin} name="map-pin" size={24} color="#bdbdbd" />
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.btnPost}>
            <Text style={styles.btnPostText}>Опубліковати</Text>
          </TouchableOpacity>

          
        

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.btnDelete}>
            <Text style={styles.btnText}>
              <Feather name="trash-2" size={24} color="#bdbdbd" />
            </Text>
          </TouchableOpacity>
        </View>

        </View>
    </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  header: {
    flex: 0,
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 11,
    paddingBottom: 11,
    paddingRight: 49,
    paddingLeft: 48,
  },
  titel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#212121",
    textAlign: "center",
    justifyContent: "center",
  },
  posters: {
    flex: 1,
    borderWidth: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
    borderTopColor: "#b2b2b2",
    borderRightColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderBottomColor: "#ffffff",
  },
  poster: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    marginBottom: 8,
  },
  camera: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 100,
    backgroundColor: "#ffffff",
  },
  iconCamera: {
    color: "#BDBDBD",
  },
  textPoster: {
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 32,
  },
  input: {
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 15,
    paddingRight: 16,
    borderWidth: 1,
    color: "#212121",
    fontSize: 16,
    width: "100%",
    height: 50,
    borderTopColor: "#ffffff",
    borderRightColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderBottomColor: "#b2b2b2",

  },
  inputLocation: {
    position: "relative",
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 28,
    paddingBottom: 15,
    paddingRight: 16,
    borderWidth: 1,
    color: "#212121",
    fontSize: 16,
    width: "100%",
    height: 50,
    borderTopColor: "#ffffff",
    borderRightColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderBottomColor: "#b2b2b2",
  },
  iconMapPin: {
    position: "absolute",
    top: 95,
    left: 0,
  },
  btnPost: {
    width: "100%",
    height: 51,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPostText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  tabBar: {
    alignItems: "center",
    justifyContent: "center",
    height: 58,
    marginTop: 120,
    flexDirection: "row",
  },
  btnDelete: {
    width: 70,
  },
  btnText: {
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  iconBtnAdd: {
    color: "white",
  },

  // homeIndicator: {
  //   marginTop: 10,
  //   alignItems: "center",
  // },
  // homeLine: {
  //   width: 134,
  //   height: 5,
  //   backgroundColor: "black",
  //   borderRadius: 50,
  // },
});
