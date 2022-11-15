import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../utils/constants";

const Button = ({ children, type, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        type === "login" ? styles.loginBtn : styles.registerBtn,
      ]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  loginBtn: {
    backgroundColor: Colors.primary,
  },
  registerBtn: {
    backgroundColor: Colors.secondary,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Button;
