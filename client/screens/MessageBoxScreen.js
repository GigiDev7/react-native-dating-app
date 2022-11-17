import { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../utils/constants";

const MessageBoxScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      /* headerLeft: ({}) => (
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color={Colors.gray500}
          onPress={() => navigation.goBack()}
        />
      ),
      headerTitle: () => (
        <View>
          <Image
            style={styles.headerImage}
            source={require("../assets/profile.jpg")}
          />
        </View>
      ), */
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
              source={require("../assets/profile.jpg")}
            />
            <Text style={styles.name}>Giorgi</Text>
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
