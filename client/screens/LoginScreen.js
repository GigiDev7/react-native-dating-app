import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from "react-native";
import Input from "../components/ui/Input";

const LoginScreen = ({ navigation }) => {
  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <Text style={styles.text}>Login to your account</Text>
      <Input placeholder="Email" />
      <Input type="password" placeholder="Password" />
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
});

export default LoginScreen;
