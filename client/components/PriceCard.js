import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../utils/constants";

const PriceCard = ({ months, price, total, isPopular }) => {
  return (
    <View style={[styles.container, isPopular && styles.popularContainer]}>
      {isPopular && <Text style={styles.popularText}>Most Popular</Text>}
      <Text style={styles.month}>{months}</Text>
      <Text style={styles.priceText}>months</Text>
      <Text style={styles.priceText}>${price}/mo</Text>
      <Text style={styles.total}>${total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 12,
    position: "relative",
  },
  popularContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.gold,
  },
  popularText: {
    fontWeight: "bold",
    position: "absolute",
    fontSize: 12,
    textAlign: "center",
    top: -15,
  },
  month: {
    fontSize: 40,
    color: Colors.gray500,
    marginVertical: 10,
  },
  priceText: {
    color: Colors.gray500,
  },
  total: {
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default PriceCard;
