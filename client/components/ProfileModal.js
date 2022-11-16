import { Modal, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/constants";
import ProfileInfo from "./ProfileInfo";
import DislikeIcon from "./DislikeIcon";
import HeartIcon from "./HeartIcon";

const ProfileModal = ({ visible, closeModal, name, age, location }) => {
  return (
    <Modal visible={visible} animationType="fade" style={styles.modal}>
      <ScrollView style={{}}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../assets/profile.jpg")}
          />
          <Ionicons
            name="md-arrow-down-circle-sharp"
            size={50}
            style={styles.icon}
            onPress={closeModal}
          />
        </View>
        <View style={styles.infoContainer}>
          <ProfileInfo name={name} age={age} location={location} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 6 }}>
            My bio
          </Text>
          <Text>
            dcasencasiecnasicenasocsaoicenasocenoascneoascneoascneoascineoasicneoiascneoaiscneoascnasocnasc
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <DislikeIcon />
          <HeartIcon />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  image: {
    height: 400,
    width: "100%",
    position: "relative",
  },
  icon: {
    color: Colors.primary,
    position: "absolute",
    bottom: -25,
    right: 25,
  },
  infoContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  btnContainer: {
    marginVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ProfileModal;
