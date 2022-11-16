import { useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalContainer from "../components/ModalContainer";

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
    <View>
      <Text>Home</Text>
      <ModalContainer
        visible={isFilterModalShown}
        closeModal={closeFilterModal}
      />
    </View>
  );
};

export default HomeScreen;
