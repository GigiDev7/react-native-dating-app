import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../utils/constants";
import image from "../assets/profile.jpg";
import Button from "../components/ui/Button";
import PricingModal from "../components/modals/PricingModal";
import { useState } from "react";

const LikeScreen = () => {
  const [isPricingModalShown, setIsPricingModalShown] = useState(false);

  const showModal = () => {
    setIsPricingModalShown(true);
  };

  const closeModal = () => {
    setIsPricingModalShown(false);
  };

  return (
    <View style={styles.container}>
      {isPricingModalShown && <PricingModal closeModal={closeModal} />}
      <View style={styles.header}>
        <Text style={styles.headerText}>1 Like</Text>
      </View>
      <Text style={styles.text}>
        Upgrade to Gold to see people who already liked you.
      </Text>
      <FlatList
        style={styles.list}
        data={[image, image]}
        numColumns={2}
        keyExtractor={() => Math.random()}
        renderItem={({ item }) => (
          <ImageBackground blurRadius={70} source={item} style={styles.image}>
            <View style={styles.infoBlur}>
              <Text style={styles.userInfo}>Giorgi, 25</Text>
            </View>
          </ImageBackground>
        )}
      />
      <Button onPress={showModal} style={styles.button}>
        SEE WHO LIKES YOU
      </Button>
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
