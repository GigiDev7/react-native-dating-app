import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import NotAuth from "./screens/NotAuth";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NotAuth />
    </>
  );
}

const styles = StyleSheet.create({});
