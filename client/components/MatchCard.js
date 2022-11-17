import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import image from "../assets/profile.jpg";
import { Colors } from "../utils/constants";

const MatchCard = ({ onPress, direction }) => {
  return (
    <FlatList
      data={[image, image, image, image, image, image, image, image]}
      horizontal={direction === "horizontal"}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={() => Math.random()}
      renderItem={({ item }) => (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            direction === "vertical"
              ? styles.cardSecondary
              : styles.cardPrimary,
            pressed && styles.pressed,
          ]}
        >
          <Image
            style={
              direction === "vertical"
                ? styles.imageSecondary
                : styles.imagePrimary
            }
            source={item}
          />
          <Text
            style={
              direction === "vertical"
                ? styles.nameSecondary
                : styles.namePrimary
            }
          >
            Giorgi
          </Text>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },
  cardPrimary: {
    marginHorizontal: 14,
    borderRadius: 6,
  },
  imagePrimary: {
    width: 100,
    height: 150,
    borderRadius: 6,
  },
  namePrimary: {
    textAlign: "center",
    fontWeight: "bold",
  },
  cardSecondary: {
    flexDirection: "row",
    marginVertical: 26,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 12,
  },
  imageSecondary: {
    width: 100,
    height: 100,
    borderRadius: "50%",
  },
  nameSecondary: {
    marginTop: 24,
    marginLeft: 16,
    fontWeight: "bold",
  },
});

export default MatchCard;
