import { TextInput, View, StyleSheet } from "react-native";
import { Colors } from "../../utils/constants";

const Input = ({ placeholder, type, onChangeText }) => {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        secureTextEntry={type === "password"}
        placeholder={placeholder}
        style={styles.input}
        keyboardType={type === "number" && "number-pad"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    backgroundColor: "white",
    padding: 14,
    marginTop: 16,
    width: 300,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 6 },
  },
});

export default Input;
