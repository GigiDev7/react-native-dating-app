import { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BASE_URL, Colors } from "../utils/constants";
import { useRoute } from "@react-navigation/native";

const MessageBoxScreen = ({ navigation }) => {
  const route = useRoute();

  useLayoutEffect(() => {
    const match = route.params.match;

    navigation.setOptions({
      header: () => (
        <View style={styles.header}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={Colors.gray500}
            onPress={() => navigation.goBack()}
            style={styles.icon}
          />
          <View style={{ marginTop: 12 }}>
            <Image
              style={styles.headerImage}
              source={{ uri: `${BASE_URL}/${match.images[0]}` }}
            />
            <Text style={styles.name}>{match.firstname}</Text>
          </View>
        </View>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>message box</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 6,
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 4 },
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray500,
    backgroundColor: "white",
    padding: 16,
    justifyContent: "center",
    position: "relative",
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  icon: {
    position: "absolute",
    left: 25,
  },
  name: {
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
  },
});

export default MessageBoxScreen;
