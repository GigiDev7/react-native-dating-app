import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Colors } from "../utils/constants";

const DislikeIcon = ({ style, onPress }) => {
  return (
    <Ionicons
      onPress={onPress}
      name="heart"
      size={24}
      style={[styles.icon, style]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    borderWidth: 2,
    padding: 12,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "black",
    borderColor: Colors.primary500,
    color: Colors.primary500,
  },
});

export default DislikeIcon;
