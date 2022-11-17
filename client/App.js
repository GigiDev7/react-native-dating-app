import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageBoxScreen from "./screens/MessageBoxScreen";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainStack} />
          <Stack.Screen name="Messages" component={MessageBoxScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
