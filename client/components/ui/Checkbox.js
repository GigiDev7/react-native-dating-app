import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../utils/constants";

const Checkbox = ({ checked, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, checked && styles.checked]}
    >
      {checked && <FontAwesome name="check" color="white" size={12} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
});

export default Checkbox;
