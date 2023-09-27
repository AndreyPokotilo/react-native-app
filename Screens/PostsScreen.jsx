import React from "react";
// import { useDispatch } from "react-redux";
import { StyleSheet, View, ImageBackground } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CommentsScreen from "./CommentsScreen.jsx";
import MapScreen from "./MapScreen.jsx";
import HomeScreen from "./HomeScreen.jsx";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import app from "../firebase/config.js";

import { TouchableOpacity } from "react-native-gesture-handler";

// import { authSignOutUser } from "../redux/auth/authOperations.js";

const NestedScreen = createStackNavigator();
const MainTab = createBottomTabNavigator();


export default PostsScreen = ({ setTabBarStyle }) => {
//   const dispatch = useDispatch();

  const signOut = () => {
    // dispatch(authSignOutUser);
  };

  return (
    <View style={styles.container}>
      
        <NestedScreen.Navigator>
          <NestedScreen.Screen
            options={({ route, navigation }) => ({
              headerBackVisible: false,
              headerBackTitleVisible: false,
              headerTitle: 'Публікації',
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: "Roboto-Medium",
                fontSize: 17,
              },
              headerRight: () => (
                <TouchableOpacity onPress={signOut}>
                  <MaterialIcons
                    style={{ marginRight: 10 }}
                    name="logout"
                    size={24}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
              ),
            })}
            name="Home"
            component={HomeScreen}
          />
          <NestedScreen.Screen
            options={{
              headerTitleStyle: {
                fontFamily: "Roboto-Medium",
                fontSize: 17,
              },
              headerBackTitleVisible: false,
              headerBackImage: () => (
                <AntDesign
                  style={{ marginLeft: 20 }}
                  name="arrowleft"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              ),
            }}
            title="Коментарі"
            name="Comments"
          >
            {({ route, navigation }) => (
          <CommentsScreen
            route={route}
            navigation={navigation}
            setTabBarStyle={setTabBarStyle}
          />
        )}
          </NestedScreen.Screen>

          <NestedScreen.Screen
            name="Map"
            options={{
              title: "Карта",
              headerTitleStyle: {
                // fontFamily: "Roboto-Medium",
                fontSize: 17,
              },
              
              headerBackTitleVisible: false,
              headerBackImage: () => (
                <AntDesign
                  style={{ marginLeft: 20 }}
                  name="arrowleft"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              ),
            }}
          >
            {({ route, navigation }) => (
          <MapScreen
            route={route}
            navigation={navigation}
            setTabBarStyle={setTabBarStyle}
          />
        )}
          </NestedScreen.Screen>
        </NestedScreen.Navigator>
        
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
    },
    
  });