import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import uuid from 'react-native-uuid';
import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addPost, uploadPhotoToServer } from "../redux/posts/posts-operations";
import { selectedUid } from "../redux/auth/auth-selectors";

export default function CreatePostsScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [convertedCoordinate, setConvertedCoordinate] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [namePost, setNamePost] = useState("");
  console.log("namePost:", namePost)

  const [isDisabledPublishBtn, setIsDisabledPublishBtn] = useState(false);
  const uid = useSelector(selectedUid);
  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const disabled =
      capturedPhoto !== null &&
      namePost !== "" &&
      convertedCoordinate !== null &&
      location !== null
        ? false
        : true;

    setIsDisabledPublishBtn(disabled);
  }, [capturedPhoto, namePost, convertedCoordinate, location]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled && result.assets.length > 0) {
      await MediaLibrary.createAssetAsync(result.assets[0].uri);
      setCapturedPhoto(result.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const { region, country } = address[0];

      setConvertedCoordinate({ region, country });
    }
  };
  const openGallery = async () => {
    const galleryResult = await ImagePicker.launchImageLibraryAsync();

    if (!galleryResult.canceled && galleryResult.assets.length > 0) {
      setCapturedPhoto(galleryResult.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const { region, country } = address[0];

      setConvertedCoordinate({ region, country });
    }
  };

  const publishPhoto = async () => {
    if (location) {

      const photo = await uploadPhotoToServer(capturedPhoto);

      const newPost={
          id: uuid.v4(8),
          userId: uid,
          titel: namePost,
          image: photo,
          comments: [],
          likeUserId: [],
          likes: 0,
          location: {latitude: location.latitude, longitude: location.longitude},
          region: convertedCoordinate.region,
          state: convertedCoordinate.country,
        };
        if(photo) {
        dispatch(addPost({uid,newPost}));
      navigation.navigate("Posts");
    }

      setCapturedPhoto(null);
      setNamePost("");
      setLocation(null);
      setConvertedCoordinate(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.posters}>
          <View style={styles.poster}>
            <TouchableOpacity style={styles.camera} onPress={openCamera}>
              <View>
                <MaterialIcons
                  style={styles.iconCamera}
                  name="camera-alt"
                  size={24}
                />
              </View>
            </TouchableOpacity>
            {capturedPhoto ? (
              <Image
                style={styles.previewImage}
                source={{ uri: capturedPhoto }}
              />
            ) : null}
          </View>

          <TouchableOpacity onPress={openGallery}>
            <Text style={styles.cameraText}>
              {capturedPhoto ? "Редагувати фото" : "Завантажте фото"}
            </Text>
          </TouchableOpacity>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              value={namePost.trimStart()}
              onChangeText={setNamePost}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              value={
                convertedCoordinate
                  ? `${convertedCoordinate.region}, ${convertedCoordinate.country}`
                  : null
              }
              placeholder="Місцевість..."
              placeholderTextColor={"#bdbdbd"}
              style={styles.inputLocation}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <Feather
              style={styles.iconMapPin}
              name="map-pin"
              size={24}
              color="#bdbdbd"
              onPress={() => navigation.navigate("Map")}
            />
          </KeyboardAvoidingView>

          <TouchableOpacity
            style={
              isDisabledPublishBtn
                ? styles.btnPostDisabled
                : styles.btnPostCreate
            }
            onPress={publishPhoto}
            disabled={isDisabledPublishBtn}
          >
            <Text
              style={
                isDisabledPublishBtn
                  ? styles.btnPostText
                  : { ...styles.btnPostText, color: "#ffffff" }
              }
            >
              Опубліковати
            </Text>
          </TouchableOpacity>

          <View style={styles.tabBar}>
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => {
                setCapturedPhoto(null);
                setNamePost("");
                setConvertedCoordinate(null);
                console.log("Delete");
              }}
            >
              <Text style={styles.btnText}>
                <Feather name="trash-2" size={24} color="#bdbdbd" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  header: {
    flex: 0,
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 11,
    paddingBottom: 11,
    paddingRight: 49,
    paddingLeft: 48,
  },
  titel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#212121",
    textAlign: "center",
    justifyContent: "center",
  },
  posters: {
    flex: 1,
    borderWidth: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
    borderTopColor: "#b2b2b2",
    borderRightColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderBottomColor: "#ffffff",
  },
  poster: {
    position: "relative",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    marginBottom: 8,
  },
  camera: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 1,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 100,
    backgroundColor: "#ffffff",
  },
  iconCamera: {
    color: "#BDBDBD",
  },
  previewImage: {
    height: 240,
    borderRadius: 8,
  },
  textPoster: {
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 32,
  },
  cameraText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  input: {
    marginTop: 32,
    paddingTop: 16,
    paddingLeft: 0,
    paddingBottom: 15,
    paddingRight: 0,
    borderWidth: 1,
    color: "#212121",
    fontSize: 16,
    width: "100%",
    height: 50,
    borderTopColor: "#ffffff",
    borderRightColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderBottomColor: "#b2b2b2",
  },
  inputLocation: {
    position: "relative",
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 28,
    paddingBottom: 15,
    paddingRight: 16,
    borderWidth: 1,
    color: "#212121",
    fontSize: 16,
    width: "100%",
    height: 50,
    borderTopColor: "#ffffff",
    borderRightColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderBottomColor: "#b2b2b2",
  },
  iconMapPin: {
    position: "absolute",
    top: 110,
    left: 0,
  },
  btnPostDisabled: {
    width: "100%",
    height: 51,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  btnPostCreate: {
    width: "100%",
    height: 51,
    marginTop: 32,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  btnPostText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  tabBar: {
    alignItems: "center",
    justifyContent: "center",
    height: 58,
    marginTop: 120,
    flexDirection: "row",
  },
  btnDelete: {
    width: 70,
  },
  btnText: {
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  iconBtnAdd: {
    color: "white",
  },

  // homeIndicator: {
  //   marginTop: 10,
  //   alignItems: "center",
  // },
  // homeLine: {
  //   width: 134,
  //   height: 5,
  //   backgroundColor: "black",
  //   borderRadius: 50,
  // },
});
