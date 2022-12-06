import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BASE_URL, Colors } from "../utils/constants";
import Button from "../components/ui/Button";
import PricingModal from "../components/modals/PricingModal";
import { useSelector } from "react-redux";
import { useModal } from "../hooks/useModal";

const LikeScreen = () => {
  const { isModalShown, closeModal, openModal } = useModal();
  const user = useSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      {isModalShown && <PricingModal closeModal={closeModal} />}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {user?.likedBy.length} {user?.likedBy.length < 2 ? "Like" : "Likes"}
        </Text>
      </View>
      <Text style={styles.text}>
        Upgrade to Gold to see people who already liked you.
      </Text>
      <FlatList
        style={styles.list}
        data={user.likedBy}
        numColumns={2}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ImageBackground
            blurRadius={user?.accountType === "regular" ? 70 : 0}
            source={`${BASE_URL}/${item.images[0]}`}
            style={styles.image}
          >
            <View
              style={user?.accountType === "regular" ? styles.infoBlur : {}}
            >
              <Text style={styles.userInfo}>
                {item.firstname}, {item.age}
              </Text>
            </View>
          </ImageBackground>
        )}
      />
      {user?.accountType === "regular" && (
        <Button onPress={openModal} style={styles.button}>
          SEE WHO LIKES YOU
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingBottom: 16,
    marginTop: 32,
    width: "100%",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: Colors.gray500,
    textAlign: "center",
    width: "60%",
    marginTop: 15,
  },
  list: {
    width: "100%",
    marginTop: 16,
  },
  image: {
    width: 150,
    height: 250,
    marginLeft: 20,
    borderRadius: 6,
    justifyContent: "flex-end",
    padding: 16,
    overflow: "hidden",
  },
  infoBlur: {
    backgroundColor: "black",
    opacity: 0.5,
    borderRadius: 8,
  },
  infoShown: {
    backgroundColor: "transparent",
  },
  userInfo: {
    fontWeight: "bold",
  },
  button: {
    marginBottom: 24,
    backgroundColor: Colors.gold,
  },
});

export default LikeScreen;
