import { Pressable, StyleSheet, Text, View } from "react-native";

const RadioInput = ({ label, onPress, condition }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text>{label}</Text>
      <Pressable onPress={onPress} style={styles.radioButton}>
        {condition && <View style={styles.inner}></View>}
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 12,
    height: 12,
    backgroundColor: "white",
    borderRadius: "50%",
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 8,
    height: 8,
    backgroundColor: "black",
    borderRadius: "50%",
  },
});

export default RadioInput;
