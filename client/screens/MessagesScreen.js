import { StyleSheet, Text, View } from "react-native";
import MatchCard from "../components/MatchCard";
import { Colors } from "../utils/constants";
import { useSelector } from "react-redux";

const MessagesScreen = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Matches</Text>
        <MatchCard data={user.matches} direction="horizontal" />
      </View>
      <View style={styles.messagesContainer}>
        <Text style={styles.text}>Messages</Text>
        <MatchCard data={user.matches} direction="vertical" />
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
