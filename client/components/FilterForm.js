import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../utils/constants";
import Checkbox from "./ui/Checkbox";

const FilterForm = () => {
  const [filterForm, setFilterForm] = useState({
    genders: [],
  });

  const handleCheckGender = (gender) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who you want to date</Text>
      <View style={styles.formControl}>
        <View style={styles.checkboxContainer}>
          <Text>Men</Text>
          <Checkbox
            onPress={() => handleCheckGender("Male")}
            checked={filterForm.genders.includes("Male")}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Women</Text>
          <Checkbox
            onPress={() => handleCheckGender("Female")}
            checked={filterForm.genders.includes("Female")}
          />
        </View>
      </View>
      <Text style={styles.title}>Age</Text>
      <View style={styles.formControl}></View>
      <Text style={styles.title}>Distance preference</Text>
      <View style={styles.formControl}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginLeft: "5%",
  },
  title: {
    marginVertical: 12,
    color: Colors.gray500,
  },
  formControl: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.gray,
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});

export default FilterForm;
