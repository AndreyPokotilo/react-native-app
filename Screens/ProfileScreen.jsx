import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const POSTS = [
  {
    id: "1",
    title: "Ліс",
    image: "https://s3-alpha-sig.figma.com/img/10eb/cad8/e6009416f2009943b9cd5d7f02695269?Expires=1693180800&Signature=JzQn3IxJmdO22ucg3SJxkjzBq335NdStPYajxFuDFnpnA5RV9s~fDXH3uanAB6S0vbYSrOt9fhF9AIAl-09dz-ImUNYIubDPYvzYTQFawn5Ohy0gk3rS~yeuRBpBbdRqZyJopzSnwU-DDUeBctZeO4F9luu1qKAKdZ6qxju-7KONnWeK9axHTD14z7rr8ormFOvtEmWBtt~VAsqViqqUn~euvg0B~P4gWhX7gAI3dEDK6rShjjaho6RRUmpkIgEOhHi~n7mq3~Fgktv68LKp2gXc8ALfzDfuIAn852~zit~RyG-94ThZ7iKbiE4dfo9aF6beUD3e4V6Zog55eYx5-w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    comments: "8",
    likes: "153",
    region: "Ivano-Frankivs'k Region",
    state: "Ukraine",
  },
  {
    id: "2",
    title: "Захід сонця над Чорним морем",
    image: "https://s3-alpha-sig.figma.com/img/f15d/159f/a6ce3338a59841e1e3f926d58a5f2ae7?Expires=1693180800&Signature=qXou9ZEwqxgAXSUuXaRIILt606OVobW41v~ZyB9Eq-XZcaWswgV12~pDSBKOSnHNDpIox9Aj-we9g-w36-Xm2TAsWc6BLFZwym4YSqljYhV4WSuA72QUYnA11tMlZ-INFUlcloNYEuJ~zxCWZUAxbIuWHRH6G4vRLXrlD2YbqlwjDes6mFXpOQmixaH24aZHC4vXHb1KohCNBeIM2X3t7cpCFwcKNxeCwtAaRO2gCt0M~p5DTR6TEFp-U00TSS1Ezg7ZYKJpMf470P2nL33k7exAMcPpgV0Dn6Yj~6PUK0BLVPYiaQFCe1Nw9OCzs~-lAzhPcADyq0xJ4mGeS6yxMw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    comments: "3",
    likes: "201",
    region: "Kherson region",
    state: "Ukraine",
  },
  {
    id: "3",
    title: "Маленький будиночок у Венеції",
    image: "https://s3-alpha-sig.figma.com/img/5e97/0c74/9cd3abbfbe6ba44f66a368baac9c2839?Expires=1693180800&Signature=StqwMPnb4ur5Bo3ua6r0KJOtm8TY3rYXcecrNXhCcrTXsi6na4DHaHWm4PUZbUNnJ4QQwFKTAlli015NK-80xGDL7tuqe1oSct6~cxiSkzRmscW8X7P3RDeE3eIiRWbbe4J9qyKqoUsVTu2mvGFo7Lpr2PcY2OYA7TxfqCRLIIa0wofatIPJA6SY0j8Xs2y1nBNgCSBAFQE4ME3NeXiQ8sidk0~c7n291AeTbTy3tEbXFFHfIjBCGaIMcgNBW-9Eo4Yq2J0sfjJ8pYkuSbnBzY9uZ~k92g-R~bUe7KFxPq6usbUm0SvtQhqmGZ7oD2Q8PuBT40I6QmfIutgHVfxDAQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    comments: "50",
    likes: "200",
    region: "Venecia",
    state: "Italy",
  },
];

export default ProfileScreen = () => {
  const [posts, setPosts] = useState(POSTS);

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
          <Text style={styles.title}>Natali Romanova</Text>
          <SafeAreaView style={styles.postsList}>
            <FlatList
              data={posts}
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
                        />
                        <Text style={styles.comments}>{item.comments}</Text>
                      </View>
                      <View style={{ ...styles.infoSet, marginLeft: 10 }}>
                        <EvilIcons
                          style={{ marginRight: 4 }}
                          name="like"
                          size={30}
                          color="#FF6C00"
                        />

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
