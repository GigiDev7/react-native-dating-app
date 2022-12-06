import { FlatList, Image, StyleSheet, Text, Pressable } from "react-native";
import { BASE_URL, Colors } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { capitalize } from "../utils/capitalize";

const MatchCard = ({ direction, data }) => {
  const navigation = useNavigation();

  const handleNavigation = (match) => {
    navigation.navigate("MessageBox", { match });
  };

  return (
    <FlatList
      data={data}
      horizontal={direction === "horizontal"}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleNavigation(item)}
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
            source={`${BASE_URL}/${item.images[0]}`}
          />
          <Text
            style={
              direction === "vertical"
                ? styles.nameSecondary
                : styles.namePrimary
            }
          >
            {capitalize(item.firstname)}
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
