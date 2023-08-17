// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

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

const imgUrl = "https://s3-alpha-sig.figma.com/img/f6c9/a386/3060bf968d92368179ce26a756ce4271?Expires=1692576000&Signature=qrUy44TthC6gVW0tuTUUGCVq711Iw5l-Hzg1IGvJRZYcRUAK49R0dus-JxHYt~IJw9yPoKdGngAZH1r5mpsxDoqD-DY8Z65CtlIAU4BlvBooVE7ZKXd5PE~X0b79RKE03Mo67OodWmelq9SqL7uJ8vuNGcixNvKIOvJs1yUB~6bNhpxc4loRLUVeMlZcnOqUqxs-SSUARfiVHuHy~U8MBCWoNqmIGdxzJrKFTs~YvjgjLwIuzcupWFknKbaIxHFcldJw13b0blR62AjlfrKq~tbeKngWCxKYTBWBVZmRJse4bnG2CVM9FvftXCzbELOqIJHLV5VdET8gpa-95ooy~w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";


export default function LoginScreen({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [state, setState] = useState(initialState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // setState(initialState);
  };


  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // dispatch(authSignInUser(state));
    navigation.navigate("Posts");
    // setState(initialState);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          source={{uri: imgUrl}}
          style={styles.image}
        >
          <View
            style={{ ...styles.login, marginTop: isShowKeyboard ? 273 : 323 }}
          >
            <Text style={styles.titel}>Увійти</Text>
            <View style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
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
                  secureTextEntry
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </KeyboardAvoidingView>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.botton}
                onPress={handleSubmit}
              >
                <Text style={styles.textButtom}>Увійти</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
              <Text style={styles.textRegistration}>
                Немає акаунту? Зареєструватися
              </Text>
            </TouchableOpacity>

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
  login: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 144,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titel: {
    fontSize: 30,
    fontWeight: "500",
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
  textRegistration: {
    fontSize: 16,
    color: "#1B4371",
    marginBottom: 90,
  },
  homeIndicator: {
    marginTop: 13,
    alignItems: "center",
  },
  homeLine: {
    width: 134,
    height: 5,
    backgroundColor: "black",
    borderRadius: 50,
  }
});
