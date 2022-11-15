import { useState } from "react";
import {
  Button,
  Pressable,
  Text,
  View,
  Keyboard,
  StyleSheet,
} from "react-native";
import Input from "../components/ui/Input";
import RadioInput from "../components/ui/RadioInput";

const RegisterScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    password: "",
    gender: "",
  });

  const selectGender = (value) => {
    setUserData((prev) => {
      return { ...prev, gender: value };
    });
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <Text style={styles.text}>Create a new account</Text>
      <Input placeholder="Firstname" />
      <Input placeholder="Lastname" />
      <Input placeholder="Age" type="number" />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <Text style={{ color: "white", marginTop: 24 }}>Choose gender</Text>
      <View style={styles.radioContainer}>
        <RadioInput
          condition={userData.gender === "Male"}
          onPress={() => selectGender("Male")}
          label="Male"
        />
        <RadioInput
          condition={userData.gender === "Female"}
          onPress={() => selectGender("Female")}
          label="Female"
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
  },
  radioContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
});

export default RegisterScreen;
