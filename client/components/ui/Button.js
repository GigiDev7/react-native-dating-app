import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({ children, type }) => {
  return (
    <Pressable
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
    backgroundColor: "#C73F3F",
  },
  registerBtn: {
    backgroundColor: "#AB3737",
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
