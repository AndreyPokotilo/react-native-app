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
import { logIn } from "../redux/auth/auth-operations";
import { useDispatch } from "react-redux";

const imgUrl = "https://s3-alpha-sig.figma.com/img/f6c9/a386/3060bf968d92368179ce26a756ce4271?Expires=1696809600&Signature=Z39U2RkomJaTwNklRQl1Khdwu6aDOy0pmwFo4pgD3m9LQmWK0iTmkNZ3cYlU859povPpJOZA~YUAA2Q-crZ5IFWdMWNE9N5el2MwIeakHLDKIq4iZCJjrBb9IyrA7drYMH1PQEAxJ016dyehWQJAPtD7rF5qeMpYLIdqbKdFtvHIUGWusBS687vX-Tj5QDlJ8mtqniN8QVh86lbcok3NsazEYmu-1E7SQdj94VCUAIahARe946tGrC5KqnVqEmiQTzECfwXPjcmJ03u2IPpIF30d5aOhw9qMR2vtIlkBQbXP1Njz3l8K4LenZx8bMx3resnv2pR4yV-htpXX-6gduQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"

export default function LoginScreen({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };


  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(logIn({email, password}));
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          source={{uri: imgUrl}}
          style={styles.image}
          resizeMode = "cover"
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
                  autoComplete="email"
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
    
    justifyContent: 'center',
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
