import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { StyleSheet, View, TouchableOpacity,} from "react-native";
import { Ionicons, Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";


import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen2";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";





const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();





export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </MainStack.Navigator>
    );
  }

  return(
    <MainTab.Navigator
      screenOptions={{
        headerTitleStyle: {
          // fontFamily: "Roboto-Medium",
          fontSize: 17,
        },
        tabBarStyle: { height: 78,},
      }}
      >

      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          headerBackVisible: false,
          headerShown: false,
          
          tabBarIcon: ({ focused, size, color }) => (
            <View style={{...styles.iconBottomView, backgroundColor: focused ? "#FF6C00" : "#FFFFFF",}}>
               <Feather name="grid" size={size} color= {focused ? "white" : "#212121"} />
             </View>
            )
       }}
        name="Posts"
        component={PostsScreen}
      />
      
      <MainTab.Screen
        options={({ route, navigation: { goBack } }) => ({
          tabBarShowLabel: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {goBack()}}>
              <AntDesign
                style={{ marginLeft: 20 }}
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            // fontFamily: "Roboto-Medium",
            fontSize: 17,
          },
          title: "Створити публікацію",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={{...styles.iconBottomView, backgroundColor: focused ? "#FF6C00" : "#FFFFFF",}}>
               <MaterialIcons  name="add" size={size} color= {focused ? "white" : "#212121"}/>
             </View>
          )
        })}
        name="Create"
        component={CreatePostsScreen}
      />

      <MainTab.Screen
        options={{
          tabBarShowLabel: false,

          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
           <View style={{...styles.iconBottomView, backgroundColor: focused ? "#FF6C00" : "#FFFFFF",}}>
              <Feather name="user" size={size} color= {focused ? "white" : "#212121"} />
            </View>
          )
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  )
};


const styles = StyleSheet.create({
  logOutIcon: {
      color: "#BDBDBD",
      marginRight: 10,    
  },
  iconBottomView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'red',
  }
})