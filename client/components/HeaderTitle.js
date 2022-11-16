import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../utils/constants";
import { Fontisto } from "@expo/vector-icons";

const HeaderTitle = () => {
  return (
    <View>
      <Text style={styles.text}>
        <Fontisto name="tinder" color={Colors.primary} size={24} /> tinder
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HeaderTitle;
