import { Modal, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../utils/constants";
import PriceCard from "../PriceCard";
import Button from "../ui/Button";

const PricingModal = ({ closeModal }) => {
  return (
    <>
      <View style={styles.backdrop}></View>
      <View style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.title}>Get Tinder Gold</Text>
          <View style={styles.priceCards}>
            <PriceCard months={12} price={8.33} total={99.99} />
            <PriceCard isPopular={true} months={6} price={12.5} total={74.99} />
            <PriceCard months={1} price={24.99} total={24.99} />
          </View>
          <View style={styles.btnContainer}>
            <Button
              textStyle={{ fontWeight: "bold" }}
              style={styles.continueBtn}
            >
              CONTINUE
            </Button>
            <Button
              onPress={closeModal}
              textStyle={{ color: Colors.gray500, fontWeight: "bold" }}
              style={styles.abortBtn}
            >
              NO THANKS
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 20,
  },
  modal: {
    zIndex: 20,
    alignItems: "center",
    paddingTop: 50,
    flex: 1,
    width: "100%",
  },
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    height: 400,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
  },
  continueBtn: {
    width: "80%",
    marginVertical: 12,
    backgroundColor: Colors.gold,
  },
  abortBtn: {
    width: "80%",
    backgroundColor: "transparent",
  },
  priceCards: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default PricingModal;
