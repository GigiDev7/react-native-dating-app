import { StatusBar } from "expo-status-bar";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import NotAuthScreen from "./screens/NotAuthScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "./utils/constants";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Stack.Screen name="Home" component={NotAuthScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="tinder" color={color} size={size} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </>
  );
}
