import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Button,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../utils/theme";

export default function HistoryScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  // Load attendance data
  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem("attendance");

      if (stored) {
        setData(JSON.parse(stored));
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("Load Error:", error);
    }
  };

  // Clear all attendance history
const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem("attendance");
    setData([]);
    alert("History Cleared Successfully");
  } catch (error) {
    console.log("Delete Error:", error);
  }
};

  // Format date properly
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  // Empty history UI
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Attendance History</Text>

        <View style={{ marginTop: 20 }}>
          <Button title="Clear History" onPress={clearHistory} color="#D32F2F" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
        <Button
          title="Clear History"
          onPress={clearHistory}
          color="#D32F2F"
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.info}>
              Employee ID: {item.id}
            </Text>

            <Text style={styles.info}>
              {formatTime(item.time)}
            </Text>

            <Text style={styles.info}>
              Latitude: {item.latitude}
            </Text>

            <Text style={styles.info}>
              Longitude: {item.longitude}
            </Text>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  buttonContainer: {
    marginBottom: 15,
  },

  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },

  info: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 20,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
});