import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../components/modals/FilterModal";
import ProfileCard from "../components/ProfileCard";
import * as Location from "expo-location";
import { LOCATION_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../store/auth";
import { useModal } from "../hooks/useModal";

const HomeScreen = ({ navigation }) => {
  const { isModalShown, closeModal, openModal } = useModal();
  const dispatch = useDispatch();
  const userCoordinates = useSelector(
    (state) => state.auth.user.location.coordinates
  );
  const userId = useSelector((state) => state.auth.user._id);

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

      if (
        location.coords.longitude.toFixed(2) ===
          userCoordinates[0].toFixed(2) &&
        location.coords.latitude.toFixed(2) === userCoordinates[1].toFixed(2)
      ) {
        return;
      }
      const { data } = await axios.get(
        `${LOCATION_URL}query=${location.coords.latitude},${location.coords.longitude}`
      );
      dispatch(
        updateLocation(
          userId,
          location.coords.longitude,
          location.coords.latitude,
          data.data[0].county,
          data.data[0].country
        )
      );
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => (
        <Ionicons onPress={openModal} name="filter" color="gray" size={24} />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <FilterModal visible={isModalShown} closeModal={closeModal} />
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
