import { useEffect, useLayoutEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BASE_URL, Colors, SOCKET_URL } from "../utils/constants";
import { useRoute } from "@react-navigation/native";
import { capitalize } from "../utils/capitalize";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { Keyboard } from "react-native";
import { useState } from "react";

const MessageBoxScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const route = useRoute();
  const match = route.params.match;
  const socket = io(SOCKET_URL);

  const [message, setMessage] = useState("");

  const hideInput = (e) => {
    const isDisabled = e.target.viewConfig.validAttributes.disabled;
    if (!isDisabled) Keyboard.dismiss();
  };

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const handleMessageSend = () => {
    console.log(message);
    Keyboard.dismiss();
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("get-ids", user._id, match._id);
    });
    socket.on("get-messagebox", (messageBox) => {
      console.log(messageBox);
    });

    return () => {
      socket.close();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={styles.header}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={Colors.gray500}
            onPress={() => navigation.goBack()}
            style={styles.icon}
          />
          <View style={{ marginTop: 12 }}>
            <Image
              style={styles.headerImage}
              source={{ uri: `${BASE_URL}/${match.images[0]}` }}
            />
            <Text style={styles.name}>{capitalize(match.firstname)}</Text>
          </View>
        </View>
      ),
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={120}
    >
      <Pressable onPress={hideInput} style={styles.container}>
        <View style={styles.messageBox}>
          <Text>message box</Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder="Type a message"
            value={message}
            onChangeText={handleMessageChange}
          />
          <Pressable
            disabled={!message}
            onPress={handleMessageSend}
            style={styles.btnContainer}
          >
            <Text style={message ? styles.btn : styles.btnDisabled}>Send</Text>
          </Pressable>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
  },
  messageBox: {
    paddingTop: 25,
  },
  inputBox: {
    width: "90%",
    borderRadius: "20px",
    borderColor: Colors.gray,
    borderWidth: "1px",
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "80%",
    position: "relative",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  btn: {
    color: "blue",
    fontSize: 18,
  },
  btnDisabled: {
    fontSize: 18,
    color: Colors.gray,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 4 },
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray500,
    backgroundColor: "white",
    padding: 16,
    justifyContent: "center",
    position: "relative",
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  icon: {
    position: "absolute",
    left: 25,
  },
  name: {
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
  },
});

export default MessageBoxScreen;
