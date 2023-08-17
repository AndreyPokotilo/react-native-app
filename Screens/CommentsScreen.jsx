import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,

} from "react-native";

export default CommentsScreen = () => {
 const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(comment);
    setComment("");
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.commentsSection}>
          <Image
            style={styles.image}
            source={require("../assets/post-mauntains.jpg")}
          />
          <View style={styles.commentsList}>
            <View style={styles.commentItem}>
              <Image source={require("../assets/comment-avatar-1.png")} />
              <View style={styles.comment}>
                <Text style={styles.commentText}>
                  Really love your most recent photo. I’ve been trying to
                  capture the same thing for a few months and would love some
                  tips!
                </Text>
                <Text style={styles.commentDate}>09 липня, 2020 | 08:40</Text>
              </View>
            </View>
          </View>
        </View>
        <TextInput
          placeholder="Коментувати..."
          value={comment}
          style={styles.toComment}
          onFocus={() => setIsShowKeyboard(true)}
          onChangeText={setComment}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    width: 365,
    height: 88,
    paddingTop: 55,
    paddingBottom: 11,
  },
  title: {
    // fontFamily: "Roboto-Medium",
    color: "#212121",
    textAlign: "center",
    fontSize: 17,
  },
  commentsSection: {
    flex: 1,
    marginTop: 32,
  },
  image: { width: "100%", height: 240, borderRadius: 8 },
  commentsList: { marginTop: 32 },
  commentItem: { flexDirection: "row" },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: "50%",
  },
  comment: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginLeft: 16,
    padding: 16,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    // fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "rgba(33, 33, 33, 1)",
  },
  commentDate: {
    // fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "rgba(189, 189, 189, 1)",
    textAlign: "right",
    marginTop: 8,
  },
  toComment: {
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    color: "#000000",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginBottom: 16,
    width: "100%",
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 15,
  },
});