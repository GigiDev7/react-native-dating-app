import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </>
  );
}
