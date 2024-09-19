import { Button, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Button
        onPress={async () => {
          const response = await fetch(
            "https://fam-githyppa-githyppas-projects.vercel.app/api/hello"
          );
          const data = await response.json();
          alert("Hello " + data.hello);
        }}
        title="Fetch hello"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
