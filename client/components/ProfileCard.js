import { View, ImageBackground, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/constants";
import ProfileModal from "./ProfileModal";
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import HeartIcon from "./HeartIcon";
import DislikeIcon from "./DislikeIcon";

const ProfileCard = () => {
  const [isProfileModalShown, setIsProfileModalShown] = useState(false);

  const showProfileModal = () => {
    setIsProfileModalShown(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalShown(false);
  };

  return (
    <>
      <ProfileModal
        name={"Giorgi"}
        age={25}
        location={50}
        closeModal={closeProfileModal}
        visible={isProfileModalShown}
      />
      <ImageBackground
        style={styles.bgImage}
        source={require("../assets/profile.jpg")}
      >
        <View style={styles.infoContainer}>
          <ProfileInfo name="Giorgi" age={25} location={50} />
          <View>
            <Ionicons
              onPress={showProfileModal}
              name="md-arrow-redo-circle-sharp"
              size={40}
              color={Colors.primary}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <DislikeIcon />
          <HeartIcon />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingBottom: 24,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 24,
  },
});

export default ProfileCard;
