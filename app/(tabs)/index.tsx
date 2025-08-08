import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#525151ff",
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
   button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});