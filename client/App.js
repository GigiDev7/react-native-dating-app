import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageBoxScreen from "./screens/MessageBoxScreen";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import store from "./store";
import { Provider, useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const Root = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={MainStack}
        />
        <Stack.Screen name="MessageBox" component={MessageBoxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
