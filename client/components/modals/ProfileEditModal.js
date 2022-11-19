import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Colors } from "../../utils/constants";
import ImagePickerCard from "../ImagePickerCard";
import Button from "../ui/Button";

const ProfileEditModal = ({ visible, closeModal }) => {
  const [bio, setBio] = useState("");

  const handleTextChange = (text) => {
    if (bio.length === 100) {
      if (text.length < bio.length) {
        setBio(text);
      }
      return;
    }
    setBio(text);
  };

  return (
    <Modal style={styles.modal} animationType="slide" visible={visible}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Edit Info</Text>
              <Button
                onPress={closeModal}
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
              {Array.from(Array(1).keys()).map((el) => (
                <ImagePickerCard key={el} hasImage={true} />
              ))}
              {Array.from(Array(5).keys()).map((el) => (
                <ImagePickerCard key={el} hasImage={false} />
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
                value={bio}
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
