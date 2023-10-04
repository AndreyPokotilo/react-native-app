import React, {  useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";

import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { selectedUid, selectedUser } from "../redux/auth/auth-selectors";
import { selectedPosts } from "../redux/posts/posts-selectors";
import { fetchAllPosts } from "../redux/posts/posts-operations";


export default HomeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectedUser);
  const uid = useSelector(selectedUid);
  const  postsArray  = useSelector(selectedPosts);
  // console.log("postsArray:", postsArray)

  useEffect(() => {
      dispatch(fetchAllPosts(uid));
  }, [dispatch, uid]);

  if (!user) return;
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image source={require("../assets/userpic.jpg")} style={styles.image} />
        <View style={styles.userInformation}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.postsList}>
        <FlatList
          data={postsArray}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <Image
                source={{ uri: item.image, width: 60, height: 60 }}
                style={styles.postImage}
              />
              <Text style={styles.postTitle}>{item.title}</Text>
              <View style={styles.itemFooter}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.postInfoSet}
                  onPress={() => {
                    navigation.navigate("Comments", {id: item.id, image: item.image});
                  }}
                >
                  <Ionicons
                    style={{ marginRight: 9 }}
                    name="md-chatbubble-outline"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.comments}>{item.comments.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.postInfoSet}
                  onPress={() => {
                    navigation.navigate("Map");
                  }}
                >
                  <SimpleLineIcons
                    style={{ marginRight: 7 }}
                    name="location-pin"
                    size={22}
                    color="#BDBDBD"
                  />
                  <Text style={styles.location}>
                    {item.region}, {item.state}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, indx) => indx.toString()}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    textAlign: "center",
    fontSize: 17,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 32,
    backgroundColor: "#FFF",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  userInformation: { marginLeft: 8 },
  userName: { fontFamily: "Roboto-Bold" },
  userEmail: {},
  postsList: { flex: 1, marginTop: 32 },
  postItem: { height: 305, marginBottom: 25 },
  postImage: { width: "100%", height: 240, borderRadius: 8 },
  // postThumb: { height: 55 },
  postTitle: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    textAlign: "left",
    fontSize: 16,
  },
  itemFooter: {
    width: 343,
    marginTop: 9,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postInfoSet: { flexDirection: "row", alignItems: "center" },
  comments: {
    fontFamily: "Roboto-Medium",
    color: "#BDBDBD",
    fontSize: 16,
  },
  location: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 16,
  },
});
