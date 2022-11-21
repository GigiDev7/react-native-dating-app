import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageBoxScreen from "./screens/MessageBoxScreen";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import store from "./store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authActions } from "./store/auth";

const Stack = createNativeStackNavigator();

const Root = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const user = await AsyncStorage.getItem("user");
      dispatch(authActions.setUser(JSON.parse(user)));
    })();
  }, []);

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
