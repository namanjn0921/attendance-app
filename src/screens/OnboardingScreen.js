import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../utils/theme";
import CustomButton from "../components/CustomButton";

export default function OnboardingScreen({ navigation, setUser }){
  const [name, setName] = useState("");
  const [id, setId] = useState("");

const saveUser = async () => {
  if (!name || !id) {
    alert("Enter all fields");
    return;
  }

  const userData = { name, id };

  await AsyncStorage.setItem("user", JSON.stringify(userData));


  setUser(userData);
};

return (
  <View style={styles.container}>
    
    <View style={styles.wrapper}>
 <Text style={styles.title}>👋 Welcome</Text>
<Text style={styles.subtitle}>Mark your attendance seamlessly</Text>

      <View style={styles.card}>

        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>Employee ID</Text>
        <TextInput
          placeholder="Enter ID"
          value={id}
          onChangeText={setId}
          style={styles.input}
        />

        <CustomButton title="Save" onPress={saveUser} />

      </View>

    </View>

  </View>
);
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  wrapper: {
    width: "100%",
    maxWidth: 400,
  },
  title: {
  fontSize: 26,
  fontWeight: "700",
  textAlign: "center",
  marginBottom: 20,
  color: COLORS.primary,
  letterSpacing: 1,
},
  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  subtitle: {
  textAlign: "center",
  color: "#666",
  marginBottom: 20,
},
});