import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../components/modals/FilterModal";
import ProfileCard from "../components/ProfileCard";
import * as Location from "expo-location";

const HomeScreen = ({ navigation }) => {
  const [isFilterModalShown, setIsFilterModalShown] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Insufficient permissions",
          "You need to grant location permission to use this app properly"
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      console.log(location);
    })();
  }, []);

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
      <FilterModal visible={isFilterModalShown} closeModal={closeFilterModal} />
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
