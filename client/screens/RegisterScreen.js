import { Button, Text, View } from "react-native";

const RegisterScreen = ({ navigation }) => {
  return (
    <View>
      <Text>register</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default RegisterScreen;
