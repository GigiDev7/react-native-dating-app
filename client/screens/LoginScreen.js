import { Button, Text, View } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>login</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
