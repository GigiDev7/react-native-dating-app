import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { Colors } from "../utils/constants";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import PricingModal from "../components/modals/PricingModal";
import { useState } from "react";
import ProfileEditModal from "../components/modals/ProfileEditModal";

const ProfileScreen = () => {
  const [isPricingModalShown, setIsPricingModalShown] = useState(false);
  const [isEditModalShown, setIsEditModalShown] = useState(true);

  const openPricingModal = () => {
    setIsPricingModalShown(true);
  };

  const closePricingModal = () => {
    setIsPricingModalShown(false);
  };

  const openEditModal = () => {
    setIsEditModalShown(true);
  };

  const closeEditModal = () => {
    setIsEditModalShown(false);
  };

  return (
    <View style={styles.container}>
      {isPricingModalShown && <PricingModal closeModal={closePricingModal} />}
      <ProfileEditModal
        closeModal={closeEditModal}
        visible={isEditModalShown}
      />
      <View style={styles.infoContainer}>
        <Image style={styles.image} source={require("../assets/profile.jpg")} />
        <MaterialIcons
          onPress={openEditModal}
          style={styles.icon}
          name="edit"
          size={24}
        />
        <Text style={styles.name}>Giorgi, 25</Text>
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
          onPress={openPricingModal}
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
});

export default ProfileScreen;
