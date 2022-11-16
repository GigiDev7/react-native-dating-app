import { useLayoutEffect, useState } from "react";
import { Text, View, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/ui/Button";

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
      <Modal
        style={styles.modal}
        animationType="slide"
        visible={isFilterModalShown}
      >
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Date filters</Text>
            <Button
              textStyle={{
                color: "black",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              style={styles.button}
              onPress={closeFilterModal}
            >
              Done
            </Button>
          </View>
          <View></View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "transparent",
    width: 80,
    position: "absolute",
    right: -120,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeScreen;
