import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/theme";

export default function CustomButton({ title, onPress, type = "primary" }) {
  let bgColor = COLORS.primary;

  if (type === "secondary") bgColor = COLORS.accent;
  if (type === "danger") bgColor = COLORS.danger;

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  }
});