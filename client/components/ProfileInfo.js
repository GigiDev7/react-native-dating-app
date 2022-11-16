import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../utils/constants";
import { Ionicons } from "@expo/vector-icons";

const ProfileInfo = ({ name, age, location }) => {
  return (
    <View>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{name},</Text>
        <Text style={styles.age}>{age}</Text>
      </View>
      <View style={styles.wrapper}>
        <Ionicons name="location" size={16} color={Colors.primary} />
        <Text style={styles.location}>{location}km away</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "center",
  },
  name: {
    fontSize: 32,
    fontWeight: "900",
  },
  age: {
    fontSize: 30,
    fontWeight: "700",
    marginLeft: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 4,
  },
});

export default ProfileInfo;
