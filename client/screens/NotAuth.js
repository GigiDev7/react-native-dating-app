import { View, ImageBackground, StyleSheet, Text } from "react-native";
import Button from "../components/ui/Button";

const NotAuth = () => {
  return (
    <ImageBackground
      source={require("../assets/tinder.png")}
      style={styles.bgImage}
    >
      <Text style={styles.title}>Meet new people</Text>
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <Button type="login">Login</Button>
        </View>
        <View>
          <Button type="register">Register</Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnContainer: {
    width: "70%",
    marginBottom: 60,
  },
  btn: {
    marginBottom: 12,
  },
  title: {
    marginTop: 60,
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default NotAuth;
