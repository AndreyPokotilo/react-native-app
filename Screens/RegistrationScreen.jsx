import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { register } from "../redux/auth/auth-operations";

const imgUrl =
  "https://s3-alpha-sig.figma.com/img/f6c9/a386/3060bf968d92368179ce26a756ce4271?Expires=1692576000&Signature=qrUy44TthC6gVW0tuTUUGCVq711Iw5l-Hzg1IGvJRZYcRUAK49R0dus-JxHYt~IJw9yPoKdGngAZH1r5mpsxDoqD-DY8Z65CtlIAU4BlvBooVE7ZKXd5PE~X0b79RKE03Mo67OodWmelq9SqL7uJ8vuNGcixNvKIOvJs1yUB~6bNhpxc4loRLUVeMlZcnOqUqxs-SSUARfiVHuHy~U8MBCWoNqmIGdxzJrKFTs~YvjgjLwIuzcupWFknKbaIxHFcldJw13b0blR62AjlfrKq~tbeKngWCxKYTBWBVZmRJse4bnG2CVM9FvftXCzbELOqIJHLV5VdET8gpa-95ooy~w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    // console.log({ name: name, email: email, password: password });
    dispatch(register({ name, email, password }));
    Keyboard.dismiss();
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground source={{ uri: imgUrl }} style={styles.image}>
          <View
            style={{
              ...styles.registration,
              marginTop: isShowKeyboard ? 147 : 263,
            }}
          >
            <View style={styles.addPhotoSquare}>
              <AntDesign
                style={styles.addPhotoCrossIcon}
                name="pluscircleo"
                size={22}
                color="#FF6C00"
              />
            </View>
            <Text style={styles.titel}>Реєстрація</Text>
            <View style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Логін"
                  placeholderTextColor={"#bdbdbd"}
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />

                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor={"#bdbdbd"}
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Пароль"
                  placeholderTextColor={"#bdbdbd"}
                  secureTextEntry={true}
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </KeyboardAvoidingView>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.botton}
                onPress={onSubmit}
              >
                <Text style={styles.textButtom}>Зареєстуватися</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
            onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.textLogin}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
            {/* <View style={styles.homeIndicator}>
              <Text style={styles.homeLine}></Text>
            </View> */}
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 812,
  },
  registration: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    paddingTop: 92,
    paddingBottom: 78,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  addPhotoSquare: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addPhotoCrossIcon: { position: "absolute", top: 80, left: 107 },
  titel: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#212121",
    textAlign: "center",
    // marginTop:32,
    marginBottom: 17,
  },
  form: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 15,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
  },
  botton: {
    width: 343,
    marginTop: 43,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  textButtom: {
    fontSize: 16,
    color: "white",
  },
  textLogin: {
    fontSize: 16,
    color: "#1B4371",
    marginBottom: 24,
  },
  // homeIndicator: {
  //   marginTop: 13,
  //   backgroundColor: "green",
  // },
  // homeLine: {
  //   width: 134,
  //   height: 5,
  //   backgroundColor: "black",
  //   borderRadius: 50,
  //   marginRight: "auto",
  //   marginLeft: "auto",
  // },
});
