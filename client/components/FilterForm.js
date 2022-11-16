import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../utils/constants";
import Checkbox from "./ui/Checkbox";

const FilterForm = () => {
  const [filterForm, setFilterForm] = useState({
    genders: [],
    ageMin: 18,
    ageMax: 80,
    distanceMin: 0,
    distanceMax: 50,
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

  const handleRangeChange = (num, property) => {
    setFilterForm((prev) => {
      return { ...prev, [property]: +num };
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
      <View style={styles.formControl}>
        <Text>
          Between {filterForm.ageMin} and {filterForm.ageMax}
        </Text>
        <View style={styles.rangeContainer}>
          <TextInput
            onChangeText={(text) => handleRangeChange(text, "ageMin")}
            value={filterForm.ageMin.toString()}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Text style={{ marginHorizontal: 12 }}>-</Text>
          <TextInput
            onChangeText={(text) => handleRangeChange(text, "ageMax")}
            value={filterForm.ageMax.toString()}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>
      </View>
      <Text style={styles.title}>Distance preference</Text>
      <View style={styles.formControl}>
        <Text>
          Between {filterForm.distanceMin}km and {filterForm.distanceMax}km
        </Text>
        <View style={styles.rangeContainer}>
          <TextInput
            onChangeText={(text) => handleRangeChange(text, "distanceMin")}
            value={filterForm.distanceMin.toString()}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Text style={{ marginHorizontal: 12 }}>-</Text>
          <TextInput
            onChangeText={(text) => handleRangeChange(text, "distanceMax")}
            value={filterForm.distanceMax.toString()}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  rangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: 6,
  },
});

export default FilterForm;
