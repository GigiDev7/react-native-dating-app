import {
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import Button from "../ui/Button";
import FilterForm from "../FilterForm";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../store/users";

const FilterModal = ({ visible, closeModal }) => {
  const [filterForm, setFilterForm] = useState({
    genders: [],
    ageMin: 18,
    ageMax: 80,
    distanceMax: 50,
  });

  const hasFormUpdated = useRef(false);
  const dispatch = useDispatch();

  const handleCheckGender = (gender) => {
    hasFormUpdated.current = true;
    setFilterForm((prev) => {
      let newGenders;
      if (prev.genders.includes(gender)) {
        newGenders = prev.genders.filter((el) => el !== gender);
      } else {
        newGenders = [...prev.genders, gender];
      }
      return { ...prev, genders: newGenders };
    });
  };

  const handleRangeChange = (num, property) => {
    hasFormUpdated.current = true;
    setFilterForm((prev) => {
      return { ...prev, [property]: +num };
    });
  };

  const handleModalClose = () => {
    if (hasFormUpdated.current) {
      dispatch(
        getUsers(
          filterForm.distanceMax,
          filterForm.genders.join(),
          filterForm.ageMin,
          filterForm.ageMax
        )
      );
    }
    closeModal();
    hasFormUpdated.current = false;
  };

  return (
    <Modal style={styles.modal} animationType="slide" visible={visible}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
        behavior="padding"
      >
        <ScrollView style={{ flex: 1 }}>
          <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
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
                  onPress={handleModalClose}
                >
                  Done
                </Button>
              </View>
              <View style={styles.formContainer}>
                <FilterForm
                  handleRangeChange={handleRangeChange}
                  handleCheckGender={handleCheckGender}
                  {...filterForm}
                />
              </View>
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
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
  formContainer: {
    marginTop: 32,
    width: "100%",
    flex: 1,
  },
});

export default FilterModal;
