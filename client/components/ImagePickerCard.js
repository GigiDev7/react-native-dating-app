import { ImageBackground, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../utils/constants";

const ImagePickerCard = ({ hasImage = false }) => {
  if (!hasImage) {
    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <AntDesign name="plus" size={24} color="white" />
        </View>
      </View>
    );
  }
  return (
    <ImageBackground
      source={require("../assets/profile.jpg")}
      style={styles.imageContainer}
    >
      <View style={styles.iconWrapperImage}>
        <AntDesign
          style={styles.icon}
          name="close"
          size={24}
          color={Colors.primary}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    backgroundColor: Colors.gray,
    borderRadius: 6,
    borderStyle: "dashed",
    borderWidth: 1,
    position: "relative",
    marginHorizontal: 6,
    marginVertical: 12,
  },
  iconWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
  },
  imageContainer: {
    width: 100,
    height: 150,
    borderRadius: 6,
    marginHorizontal: 6,
    marginVertical: 12,
    position: "relative",
    overflow: "hidden",
  },
  iconWrapperImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
  },
});

export default ImagePickerCard;
