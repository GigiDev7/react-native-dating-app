import { useEffect, useLayoutEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BASE_URL, Colors, SOCKET_URL } from "../utils/constants";
import { useRoute } from "@react-navigation/native";
import { capitalize } from "../utils/capitalize";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { Keyboard } from "react-native";
import { useState } from "react";
import { messageBoxActions } from "../store/message";

const MessageBoxScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const messageBox = useSelector((state) => state.message.messageBox);
  const route = useRoute();
  const match = route.params.match;
  const socket = io(SOCKET_URL);

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const hideInput = (e) => {
    const isDisabled = e.target.viewConfig.validAttributes.disabled;
    if (!isDisabled) Keyboard.dismiss();
  };

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const handleMessageSend = () => {
    socket.emit(
      "send-message",
      messageBox._id,
      user._id,
      message,
      new Date().toLocaleString()
    );
    Keyboard.dismiss();
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("get-ids", user._id, match._id);
    });
    socket.on("get-messagebox", (messageBox) => {
      dispatch(messageBoxActions.setMessageBox(messageBox));
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
          {messageBox && messageBox.messages && (
            <FlatList
              data={messageBox.messages}
              keyExtractor={(item) => `${item.date}-${item.author}`}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    user._id === item.author
                      ? styles.messageContainerPrimary
                      : styles.messageContainerSecondary,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={
                      user._id === item.author
                        ? styles.messageTextPrimary
                        : styles.messageTextSecondary
                    }
                  >
                    {item.message}
                  </Text>
                </Pressable>
              )}
            />
          )}
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
    paddingVertical: 24,
  },
  messageBox: {
    flex: 1,
    width: "90%",
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
  messageContainerPrimary: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6,
    alignSelf: "flex-end",
    marginTop: 12,
  },
  messageContainerSecondary: {
    backgroundColor: Colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  messageTextPrimary: {
    color: "white",
  },
  messageTextSecondary: {
    color: "black",
  },
  pressed: {
    opacity: 0.85,
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
