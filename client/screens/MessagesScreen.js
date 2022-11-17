import { StyleSheet, Text, View } from "react-native";
import MatchCard from "../components/MatchCard";
import { Colors } from "../utils/constants";

const MessagesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Matches</Text>
        <MatchCard
          onPress={() => navigation.navigate("MessageBox")}
          direction="horizontal"
        />
      </View>
      <View style={styles.messagesContainer}>
        <Text style={styles.text}>Messages</Text>
        <MatchCard
          onPress={() => navigation.navigate("MessageBox")}
          direction="vertical"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 10,
    flex: 1,
  },
  text: {
    marginLeft: 14,
    marginBottom: 10,
    color: Colors.primary,
    fontWeight: "bold",
  },
  messagesContainer: {
    marginTop: 50,
    flex: 1,
  },
});

export default MessagesScreen;
