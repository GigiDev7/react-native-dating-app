import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageBoxScreen from "./screens/MessageBoxScreen";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import store from "./store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authActions, logoutUser, updatePushToken } from "./store/auth";
import axios from "axios";
import * as Notifications from "expo-notifications";
import NotificationModal from "./components/modals/NotificationModal";
import { useModal } from "./hooks/useModal";

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

axios.interceptors.request.use(
  async function (config) {
    const user = await AsyncStorage.getItem("user");

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

  const { isModalShown, closeModal, openModal } = useModal();

  const [notfType, setNotfType] = useState();

  const dispatch = useDispatch();

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async function () {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const expiresAt = await AsyncStorage.getItem("expiresAt");
        const remainingTime = +expiresAt - new Date().getTime();

        registerForPushNotificationsAsync().then((token) =>
          dispatch(updatePushToken(JSON.parse(user)._id, token))
        );

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notf) => {
            console.log(notf.request.content.data);
            if (notf.request.content.body.includes("match")) {
              setNotfType("match");
            } else {
              setNotfType("like");
            }
            openModal();
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
          });

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
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
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
      {isModalShown && (
        <NotificationModal type={notfType} closeModal={closeModal} />
      )}
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
