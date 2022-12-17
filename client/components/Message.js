import { Pressable, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";
import { Colors } from "../utils/constants";
import { useEffect, useRef, useState } from "react";

const Message = ({ message }) => {
  const user = useSelector((state) => state.auth.user);

  const [isDateShown, setIsDateShown] = useState(false);

  const timeout = useRef();

  const onMessageClick = () => {
    setIsDateShown((prev) => !prev);
    if (!isDateShown) {
      timeout.current = setTimeout(() => {
        setIsDateShown(false);
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <View
      style={{
        alignSelf: user._id === message.author ? "flex-end" : "flex-start",
      }}
    >
      <Pressable
        onPress={onMessageClick}
        style={({ pressed }) => [
          user._id === message.author
            ? styles.messageContainerPrimary
            : styles.messageContainerSecondary,
          pressed && styles.pressed,
        ]}
      >
        <Text
          style={
            user._id === message.author
              ? styles.messageTextPrimary
              : styles.messageTextSecondary
          }
        >
          {message.message}
        </Text>
      </Pressable>

      {isDateShown && (
        <Text
          style={{
            ...styles.dateText,
            textAlign: user._id === message.author ? "right" : "left",
          }}
        >
          {formatDate(message.date)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainerPrimary: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    alignSelf: "flex-end",
    marginTop: 12,
  },
  messageContainerSecondary: {
    backgroundColor: Colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    alignSelf: "flex-start",
    marginTop: 12,
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
  dateText: {
    color: Colors.gray,
    marginTop: 4,
    fontWeight: "500",
  },
});

export default Message;
