import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { addComment, fetchAllPosts } from "../redux/posts/posts-operations";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "../components/Comment/Comment";
import { selectedUid } from "../redux/auth/auth-selectors";
import uuid from "react-native-uuid";
import { selectedPosts } from "../redux/posts/posts-selectors";

export default CommentsScreen = ({ route, setTabBarStyle }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsArray, setCommentsArray] = useState([]);

  const dispatch = useDispatch();

  const currentId = route.params.id;
  const imgUrl = route.params.image;

  const uid = useSelector(selectedUid);
  const postsArray = useSelector(selectedPosts);

  const postCurrent = postsArray.filter((post) => post.id === currentId);

  useEffect(() => {
    const value = postCurrent.map(({ comments }) => comments);
    setCommentsArray(...value);
  }, [postsArray]);

  useEffect(() => {
    setTabBarStyle("none");

    return () => {
      setTabBarStyle("flex");
    };
  });

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (comment === "") {
      Alert.alert("Please add comment");
      return;
    }
    const newComment = {
      id: uuid.v4(2),
      text: comment,
      date: Date.now(),
    };
    dispatch(addComment({ currentId, comment: newComment }));

    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.commentsSection}>
          <Image style={styles.image} source={{ uri: imgUrl }} />
          <View style={styles.commentsList}>
            {commentsArray.map((comment, indx) => (
              <Comment key={indx} comment={comment} />
            ))}
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Коментувати..."
            value={comment}
            style={styles.toComment}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) => setComment(value)}
          />
          <AntDesign
            name="arrowup"
            size={26}
            style={styles.commentIcon}
            onPress={onSubmit}
          />
        </View>
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
    fontFamily: "Roboto-Medium",
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

  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: "50%",
  },
  toComment: {
    position: "relative",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    color: "#000000",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginBottom: 16,
    width: "100%",
    paddingLeft: 16,
    paddingRight: 45,
    paddingTop: 16,
    paddingBottom: 15,
  },
  commentIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 4,
    borderRadius: 50,
    color: "#FFFFFF",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
  },
});
