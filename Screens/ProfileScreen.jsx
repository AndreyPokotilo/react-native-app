import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../redux/posts/posts-operations";
import { selectedUid, selectedUser } from "../redux/auth/auth-selectors";
import { selectedPosts } from "../redux/posts/posts-selectors";
import { logOut, } from "../redux/auth/auth-operations";
import { addLike } from "../redux/posts/posts-operations";


export default ProfileScreen = ({navigation}) => {
  const user = useSelector(selectedUser);
  const uid = useSelector(selectedUid);
  const postsArray = useSelector(selectedPosts);
  const dispatch = useDispatch();
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(fetchAllPosts(uid));
  // }, [dispatch, uid]);

  const addLikePost = (postId, likeUserId)=> {
    console.log("likeUserId:", likeUserId)
    console.log("id:", postId)
    console.log("uid:", uid)

 const userCheck = likeUserId.some(userId => userId === uid)
 console.log("userCheck:", userCheck)
if(!userCheck) {
  dispatch(addLike({postId, uid}))
}
    
  }

  const signOut = () => {
    dispatch(logOut());
  };
  if (!user) return;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={require("../assets/background.jpg")}
      >
        <View style={styles.profile}>
          <Image
            source={require("../assets/userpic.jpg")}
            style={styles.profileImage}
          />
          <Text style={styles.title}>{user.name}</Text>
          <MaterialIcons
            style={{ marginRight: 15, position: 'absolute', top: 22, right: 12, }}
            name="logout"
            size={24}
            color="#BDBDBD"
            onPress={signOut}
          />
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
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.infoSet}>
                        <Ionicons
                          style={{ marginRight: 7 }}
                          name="chatbubble-sharp"
                          size={22}
                          color="#FF6C00"
                          onPress={()=>{navigation.navigate("Comments",{id: item.id, image: item.image});}}
                        />
                        <Text style={styles.comments}>
                          {item.comments.length}
                        </Text>
                      </View>
                      <View style={{ ...styles.infoSet, marginLeft: 10 }}>
                        <TouchableOpacity onPress={()=>{addLikePost(item.id, item.likeUserId)}}>
                        <EvilIcons
                          style={{ marginRight: 4, color: "#FF6C00"}}
                          name="like"
                          size={30}
                          
                          
                        />
                         </TouchableOpacity>
                        <Text style={styles.comments}>{item.likes}</Text>
                      </View>
                    </View>
                    <View style={styles.infoSet}>
                      <SimpleLineIcons
                        style={{ marginRight: 5 }}
                        name="location-pin"
                        size={22}
                        color="#BDBDBD"
                      />
                      <Text style={styles.location}>{item.state}</Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  backImage: {
    flex: 1,
    resizeMode: "cover",
  },
  profile: {
    position: 'relative',
    marginTop: 147,
    position: "relative",
    flex: 1,
    alignItems: "center",
    paddingTop: 92,
    paddingBottom: 46,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
  },
  profileImage: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  postsList: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 32,
  },
  postItem: { height: 305, marginBottom: 25 },
  postImage: { width: "100%", height: 240, borderRadius: 8 },
  postTitle: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    textAlign: "left",
    fontSize: 16,
  },
  itemFooter: {
    width: 343,
    marginTop: 11,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoSet: { flexDirection: "row", alignItems: "center" },
  postComments: {
    fontFamily: "Roboto-Medium",
    color: "#BDBDBD",
    fontSize: 16,
  },
  postLocation: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 16,
  },
  footer: { width: 375, height: 83, backgroundColor: "#FFF" },
});
