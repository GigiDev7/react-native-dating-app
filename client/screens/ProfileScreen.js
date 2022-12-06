import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { BASE_URL, Colors } from "../utils/constants";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import PricingModal from "../components/modals/PricingModal";
import ProfileEditModal from "../components/modals/ProfileEditModal";
import { logoutUser } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../hooks/useModal";
import { capitalize } from "../utils/capitalize";

const ProfileScreen = () => {
  const user = useSelector((state) => state.auth.user);

  const pricingModal = useModal();
  const editModal = useModal();

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={styles.container}>
      {pricingModal.isModalShown && (
        <PricingModal closeModal={pricingModal.closeModal} />
      )}
      <ProfileEditModal
        closeModal={editModal.closeModal}
        visible={editModal.isModalShown}
      />
      <View style={styles.infoContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${BASE_URL}/${user.images[0]}` }}
        />
        <MaterialIcons
          onPress={editModal.openModal}
          style={styles.icon}
          name="edit"
          size={24}
        />
        <MaterialIcons
          name="logout"
          size={32}
          color="black"
          style={styles.logoutIcon}
          onPress={logout}
        />
        <Text style={styles.name}>
          {capitalize(user.firstname)}, {user.age}
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerTitle}>
            <Fontisto name="tinder" size={24} color={Colors.gold} /> Get Tinder
            Gold
          </Text>
          <Text style={styles.footerText}>See Who Likes You & More</Text>
        </View>
        <Button
          onPress={pricingModal.openModal}
          textStyle={{ color: Colors.gold, fontWeight: "bold" }}
          style={styles.button}
        >
          Get Tinder Gold
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: "75%",
    marginBottom: 10,
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 30,
    right: 0,
    color: Colors.gray500,
    backgroundColor: "white",
    padding: 6,
    borderRadius: 18,
    overflow: "hidden",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  footer: {
    backgroundColor: Colors.gray100,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "60%",
  },
  footerTextContainer: {
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginVertical: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    width: "70%",
    backgroundColor: "white",
    borderRadius: "50%",
  },
  logoutIcon: {
    position: "absolute",
    right: -80,
    top: 40,
  },
});

export default ProfileScreen;
