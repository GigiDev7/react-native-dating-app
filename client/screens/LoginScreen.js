import { Pressable, StyleSheet, Text, Keyboard, View } from "react-native";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Colors } from "../utils/constants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const handleChange = (text, type) => {
    if (type === "email") {
      setEmail(text);
    } else if (type === "password") {
      setPassword(text);
    }
  };

  const handleSubmit = () => {
    setIsValid(true);
    if (!email || !password) {
      setIsValid(false);
      return;
    }
    dispatch(loginUser(email, password));
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

      {error && <Text style={{ marginTop: 4, color: "white" }}>{error}</Text>}
      {!isValid && (
        <Text style={{ marginTop: 4, color: "white" }}>
          Please enter email and password
        </Text>
      )}

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
      >
        <Text style={{ color: "white" }}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text
            style={{ color: Colors.gray, fontWeight: "bold", marginLeft: 4 }}
          >
            Register
          </Text>
        </Pressable>
      </View>
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
