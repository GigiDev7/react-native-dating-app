import { View, ImageBackground, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/constants";

const ProfileCard = () => {
  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../assets/profile.jpg")}
    >
      <View style={styles.infoContainer}>
        <View>
          <View style={styles.wrapper}>
            <Text style={styles.name}>Giorgi,</Text>
            <Text style={styles.age}>25</Text>
          </View>
          <View style={styles.wrapper}>
            <Ionicons name="location" size={16} color={Colors.primary} />
            <Text style={styles.location}>50km away</Text>
          </View>
        </View>
        <View>
          <Ionicons
            name="md-arrow-redo-circle-sharp"
            size={40}
            color={Colors.primary}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Ionicons
          name="close"
          size={24}
          style={[styles.icon, styles.iconClose]}
        />
        <Ionicons
          name="heart"
          size={24}
          style={[styles.icon, styles.iconHeart]}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingBottom: 24,
    alignItems: "center",
  },
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 24,
  },
  icon: {
    borderWidth: 2,
    padding: 12,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "black",
  },
  iconClose: {
    borderColor: Colors.primary500,
    color: Colors.primary500,
  },
  iconHeart: {
    borderColor: "green",
    color: "green",
  },
});

export default ProfileCard;
