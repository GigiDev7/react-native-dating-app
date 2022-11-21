import { useState } from "react";
import { Pressable, Text, View, Keyboard, StyleSheet } from "react-native";
import Input from "../components/ui/Input";
import RadioInput from "../components/ui/RadioInput";
import Button from "../components/ui/Button";
import { Colors } from "../utils/constants";
import { registerUser } from "../store/auth";

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

  const handleChange = (text, fieldName) => {
    setUserData((prev) => {
      return { ...prev, [fieldName]: text };
    });
  };

  const submitForm = async () => {
    try {
      await registerUser(userData);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <Text style={styles.text}>Create a new account</Text>
      <Input
        onChangeText={(text) => handleChange(text, "firstname")}
        placeholder="Firstname"
      />
      <Input
        onChangeText={(text) => handleChange(text, "lastname")}
        placeholder="Lastname"
      />
      <Input
        onChangeText={(text) => handleChange(text, "age")}
        placeholder="Age"
        type="number"
      />
      <Input
        onChangeText={(text) => handleChange(text, "email")}
        placeholder="Email"
      />
      <Input
        onChangeText={(text) => handleChange(text, "password")}
        placeholder="Password"
        type="password"
      />
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

      <Button onPress={submitForm} style={styles.button}>
        Submit
      </Button>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
      >
        <Text style={{ color: "white" }}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            style={{ color: Colors.gray, fontWeight: "bold", marginLeft: 4 }}
          >
            Login
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
  button: {
    width: "80%",
    marginTop: 20,
    backgroundColor: Colors.primary500,
  },
});

export default RegisterScreen;
