import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../utils/constants";
import Checkbox from "./ui/Checkbox";

const FilterForm = ({
  handleCheckGender,
  handleRangeChange,
  genders,
  ageMin,
  ageMax,
  distanceMax,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who you want to date</Text>
      <View style={styles.formControl}>
        <View style={styles.checkboxContainer}>
          <Text>Men</Text>
          <Checkbox
            onPress={() => handleCheckGender("Male")}
            checked={genders.includes("Male")}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Women</Text>
          <Checkbox
            onPress={() => handleCheckGender("Female")}
            checked={genders.includes("Female")}
          />
        </View>
      </View>
      <Text style={styles.title}>Age</Text>
      <View style={styles.formControl}>
        <Text>
          Between {ageMin} and {ageMax}
        </Text>
        <View style={styles.rangeContainer}>
          <TextInput
            onChangeText={(text) => handleRangeChange(text, "ageMin")}
            value={ageMin.toString()}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Text style={{ marginHorizontal: 12 }}>-</Text>
          <TextInput
            onChangeText={(text) => handleRangeChange(text, "ageMax")}
            value={ageMax.toString()}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>
      </View>
      <Text style={styles.title}>Distance preference</Text>
      <View style={styles.formControl}>
        <Text>Max distance {distanceMax}km</Text>
        <View style={styles.rangeContainer}>
          <TextInput
            onChangeText={(text) => handleRangeChange(text, "distanceMax")}
            value={distanceMax.toString()}
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
