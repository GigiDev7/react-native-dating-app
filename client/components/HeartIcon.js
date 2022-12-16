import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const HeartIcon = ({ style, onPress }) => {
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
    borderColor: "green",
    color: "green",
  },
});

export default HeartIcon;
