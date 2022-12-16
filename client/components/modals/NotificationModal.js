import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Button from "../ui/Button";
import { Colors } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

const NotificationModal = ({ type, closeModal }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (type === "match") {
      closeModal();
      navigation.navigate("Messages");
    } else {
      closeModal();
      navigation.navigate("Likes");
    }
  };

  return (
    <>
      <View style={styles.backdrop}></View>
      <View style={styles.modal}>
        <View style={styles.container}>
          <AntDesign
            onPress={closeModal}
            name="close"
            size={24}
            style={styles.icon}
          />
          <Text style={styles.title}>
            {type === "match" ? "You got a new match" : "You got a new like"}
          </Text>
          <Button onPress={handleNavigation} style={styles.btn}>
            {type === "match" ? "SEE MATCHES" : "SEE WHO LIKES YOU"}
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 20,
    position: "absolute",
  },
  modal: {
    zIndex: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: "white",
    height: 200,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  btn: {
    backgroundColor: Colors.gold,
    width: "80%",
  },
});

export default NotificationModal;
