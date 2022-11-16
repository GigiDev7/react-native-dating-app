import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalContainer from "../components/ModalContainer";
import ProfileCard from "../components/ProfileCard";

const HomeScreen = ({ navigation }) => {
  const [isFilterModalShown, setIsFilterModalShown] = useState(false);

  const showFilterModal = () => {
    setIsFilterModalShown(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalShown(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => (
        <Ionicons
          onPress={showFilterModal}
          name="filter"
          color="gray"
          size={24}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <ModalContainer
        visible={isFilterModalShown}
        closeModal={closeFilterModal}
      />
      <ProfileCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "1%",
    backgroundColor: "white",
  },
});

export default HomeScreen;
