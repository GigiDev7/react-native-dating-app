import { ImageBackground, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BASE_URL, Colors } from "../utils/constants";
import { launchImageLibraryAsync } from "expo-image-picker";

const ImagePickerCard = ({ imageInfo, addImage, removeImage, index }) => {
  const add = async () => {
    const res = await launchImageLibraryAsync({});
    if (!res.canceled) {
      addImage(index, res.assets[0]);
    }
  };

  const remove = () => {
    removeImage(index);
  };

  if (!imageInfo) {
    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <AntDesign onPress={add} name="plus" size={24} color="white" />
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: imageInfo?.uri ? imageInfo.uri : `${BASE_URL}/${imageInfo}`,
      }}
      style={styles.imageContainer}
    >
      <View style={styles.iconWrapperImage}>
        <AntDesign
          onPress={remove}
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
