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
import { authActions, logoutUser } from "./store/auth";
import axios from "axios";

axios.interceptors.request.use(
  async function (config) {
    const user = await AsyncStorage.getItem("user");
    console.log(user);

    if (user) {
      config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

const Stack = createNativeStackNavigator();

const Root = () => {
  const user = useSelector((state) => state.auth.user);
  const timer = useSelector((state) => state.auth.timer);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const expiresAt = await AsyncStorage.getItem("expiresAt");
        const remainingTime = +expiresAt - new Date().getTime();

        if (remainingTime > 60 * 1000) {
          const newTimer = setTimeout(() => {
            dispatch(logoutUser());
          }, remainingTime);

          dispatch(authActions.setTimer(newTimer));
        } else {
          dispatch(logoutUser());
        }
      }

      dispatch(authActions.setUser(JSON.parse(user)));
    })();

    return () => {
      clearTimeout(timer);
    };
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
