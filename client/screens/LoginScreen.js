import { Pressable, StyleSheet, Text, View, Keyboard } from "react-native";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Colors } from "../utils/constants";
import { useState } from "react";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (text, type) => {
    if (type === "email") {
      setEmail(text);
    } else if (type === "password") {
      setPassword(text);
    }
  };

  const handleSubmit = () => {
    console.log(email, password);
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <Text style={styles.text}>Login to your account</Text>
      <Input
        onChangeText={(text) => handleChange(text, "email")}
        placeholder="Email"
      />
      <Input
        onChangeText={(text) => handleChange(text, "password")}
        type="password"
        placeholder="Password"
      />
      <Button onPress={handleSubmit} style={styles.button}>
        Login
      </Button>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
  },
  button: {
    width: "80%",
    marginTop: 24,
    backgroundColor: Colors.primary500,
  },
});

export default LoginScreen;
