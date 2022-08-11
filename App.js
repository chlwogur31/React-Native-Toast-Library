import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useToast, ToastProvider } from "./src/hook/useToastContainer";

export default function App() {
  return (
    <ToastProvider>
      <Test />
    </ToastProvider>
  );
}

const Test = () => {
  const toast = useToast();
  const showToast = () => {
    toast.show("hello world!", {
      duration: 4000,
      backgroundColor: "blue",
      messageColor: "black",
      placement: "center",
    });
  };
  const showToast2 = () => {
    toast.show("toast", {
      duration: 3000,
      backgroundColor: "orange",
      messageColor: "blue",
    });
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.6, alignItems: "center" }}>
        <Text>Toast Library TEST</Text>
        <TouchableOpacity onPress={showToast}>
          <Text style={{ fontSize: 40 }}>click me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showToast2}>
          <Text style={{ fontSize: 40 }}>click me 2</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
