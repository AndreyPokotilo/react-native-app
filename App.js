import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity,} from "react-native";
import {useFonts} from "expo-font";

import { useRoute } from "./router/router";

export default function App() {
  const [fonts] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });
  const [auth, setAuth] = useState(true)
const routing = useRoute(auth)

if (!fonts) {
  return null;
}

  return (
    <NavigationContainer>
      {routing}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
