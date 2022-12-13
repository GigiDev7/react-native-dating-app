import { View, ImageBackground, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL, Colors } from "../utils/constants";
import ProfileModal from "./modals/ProfileModal";
import ProfileInfo from "./ProfileInfo";
import HeartIcon from "./HeartIcon";
import DislikeIcon from "./DislikeIcon";
import { useModal } from "../hooks/useModal";
import { apiDislikeUser, apiLikeUser } from "../api/likes";

const ProfileCard = ({
  changeIndex,
  firstname,
  age,
  location,
  bio,
  images,
  _id,
}) => {
  const { isModalShown, openModal, closeModal } = useModal();

  const likeUser = async () => {
    await apiLikeUser(_id);
    changeIndex();
  };

  const dislikeUser = async () => {
    await apiDislikeUser(_id);
    changeIndex();
  };

  return (
    <>
      <ProfileModal
        name={firstname}
        age={age}
        location={(location.calculated / 1000).toFixed()}
        closeModal={closeModal}
        visible={isModalShown}
        bio={bio}
      />
      <ImageBackground
        style={styles.bgImage}
        source={{ uri: `${BASE_URL}/${images[0]}` }}
      >
        <View style={styles.infoContainer}>
          <ProfileInfo
            name={firstname}
            age={age}
            location={(location.calculated / 1000).toFixed()}
          />
          <View>
            <Ionicons
              onPress={openModal}
              name="md-arrow-redo-circle-sharp"
              size={40}
              color={Colors.primary}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <DislikeIcon onPress={dislikeUser} />
          <HeartIcon onPress={likeUser} />
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
