import { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../utils/constants";
import ImagePickerCard from "../ImagePickerCard";
import Button from "../ui/Button";
import { uploadImages } from "../../store/auth";

const createFormData = (photos = [], body = {}) => {
  const data = new FormData();

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  photos.forEach((p) => {
    data.append("photo", {
      name: p.fileName,
      type: p.type,
      uri: Platform.OS === "ios" ? p.uri.replace("file://", "") : p.uri,
    });
  });

  return data;
};

const ProfileEditModal = ({ visible, closeModal }) => {
  const user = useSelector((state) => state.auth.user);

  const [bio, setBio] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    let initialImages = [];
    if (user?.images) initialImages = [...user.images];
    if (initialImages.length < 6) initialImages.length = 6;
    initialImages.fill("", user?.images?.length || 0);
    setImages(initialImages);
  }, [user]);

  const dispatch = useDispatch();

  const hasProfileUpdated = useRef(false);

  const handleTextChange = (text) => {
    hasProfileUpdated.current = true;
    if (bio.length === 100) {
      if (text.length < bio.length) {
        setBio(text);
      }
      return;
    }
    setBio(text);
  };

  const addImage = (indx, imageInfo) => {
    hasProfileUpdated.current = true;
    const newImages = [...images];
    newImages[indx] = imageInfo;
    setImages(newImages);
  };

  const removeImage = (indx) => {
    hasProfileUpdated.current = true;
    const newImages = [...images];
    newImages[indx] = "";
    setImages(newImages);
  };

  const handleModalClose = async () => {
    if (hasProfileUpdated.current) {
      const uploadedImages = images.filter((el) => typeof el !== "string");
      const existingImages = images.filter(
        (el) => typeof el === "string" && el !== ""
      );
      const data = createFormData(uploadedImages, {
        images: existingImages,
        bio,
      });
      dispatch(uploadImages(data, user._id));
    }
    closeModal();
    hasProfileUpdated.current = false;
  };

  return (
    <Modal style={styles.modal} animationType="slide" visible={visible}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Edit Info</Text>
              <Button
                onPress={handleModalClose}
                textStyle={{
                  color: Colors.gray500,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
                style={styles.headerBtn}
              >
                Done
              </Button>
            </View>
            <View style={styles.imageContainer}>
              {images.map((el, indx) => (
                <ImagePickerCard
                  imageInfo={el}
                  key={indx}
                  index={indx}
                  addImage={addImage}
                  removeImage={removeImage}
                />
              ))}
              <Text
                style={{
                  textAlign: "center",
                  width: "60%",
                  marginVertical: 24,
                }}
              >
                Add pictures and you may even get more Likes.
              </Text>
            </View>
            <View style={{ backgroundColor: Colors.gray100 }}>
              <Text
                style={{ marginLeft: 28, fontWeight: "bold", fontSize: 18 }}
              >
                ABOUT ME
              </Text>
              <TextInput
                value={user?.bio || bio}
                onChangeText={handleTextChange}
                style={styles.input}
                multiline={true}
              />
              <Text
                style={{
                  position: "absolute",
                  right: 10,
                  color: Colors.gray,
                  bottom: 0,
                }}
              >
                {100 - bio.length}
              </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: Colors.gray100 }} />
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    justifyContent: "flex-end",
    flex: 1,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: "25%",
  },
  headerBtn: {
    backgroundColor: "transparent",
    width: 60,
  },
  imageContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    flexWrap: true,
    backgroundColor: Colors.gray100,
    justifyContent: "center",
    paddingTop: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 40,
    marginTop: 18,
    paddingLeft: 6,
    position: "relative",
  },
});

export default ProfileEditModal;
