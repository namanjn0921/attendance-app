import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as Location from "expo-location";
import { getDistance } from "../utils/distance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { COLORS } from "../utils/theme";
import CustomButton from "../components/CustomButton";

//  Define center + radius 
const CENTER = {
  latitude: 28.733653831115042,
  longitude: 77.13191403823008
};

const RADIUS = 100;
export default function HomeScreen({ navigation, setUser }){


  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  // getLocation function
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied");
      return;
    }

    // let loc = await Location.getCurrentPositionAsync({});
    let loc = await Location.getCurrentPositionAsync({
       accuracy: Location.Accuracy.Highest
   });
    setLocation(loc.coords);
    setAccuracy(loc.coords.accuracy);

    // DISTANCE CALCULATION HERE
    const dist = getDistance(
      loc.coords.latitude,
      loc.coords.longitude,
      CENTER.latitude,
      CENTER.longitude
    );

    setDistance(dist);
  };

  // Inside / Outside logic
  const isInside = distance !== null && distance <= RADIUS;
  
  const markAttendance = async () => {
  if (accuracy > 95) {
  alert("GPS accuracy too low. Please move to open area.");
  return;
}

if (accuracy > 50 && accuracy <= 70) {
  alert("GPS is slightly inaccurate. Try again for better accuracy.");
}

  if (distance > 100) {
    alert("You are outside the allowed area.");
    return;
  }
  const userData = await AsyncStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : {};

  try {
    const record = {
     time: new Date().toISOString(),
     latitude: location.latitude,
     longitude: location.longitude,
     name: user.name,
     id: user.id
    };

    const existing = await AsyncStorage.getItem("attendance");

    let data = existing ? JSON.parse(existing) : [];
    const today = new Date().toDateString();

const alreadyMarked = data.some(
  (item) =>
    item.id === user.id &&
    new Date(item.time).toDateString() === today
);

if (alreadyMarked) {
  alert("Attendance already marked for today");
  return;
}

    data.push(record);

    await AsyncStorage.setItem("attendance", JSON.stringify(data));

    alert("Attendance Saved Successfully");
  } catch (error) {
    console.log(error);
    alert("Error saving attendance");
  }
}; 
const resetUser = async () => {
  await AsyncStorage.removeItem("user");


  setUser(null);
};

const getAccuracyStatus = () => {
  if (accuracy <= 50) return "Good";
  if (accuracy <= 70) return "Moderate";
  return "Poor";
};

return (
  <View style={styles.container}>
    
    <View style={styles.wrapper}>

      <Text style={styles.header}>Attendance Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>{location?.latitude}</Text>

        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.value}>{location?.longitude}</Text>

        <Text style={styles.label}>Accuracy Status:</Text>
  <Text style={styles.value}>
    {accuracy ? getAccuracyStatus() : "Loading..."}
  </Text>

        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>{distance?.toFixed(2)} m</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={[
          styles.status,
          { color: isInside ? COLORS.primary : COLORS.danger }
        ]}>
          {isInside ? "Inside Allowed Area" : "Outside Area"}
        </Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.buttons}>
        <CustomButton title="Refresh Location" onPress={getLocation} />
        <CustomButton title="Mark Attendance" onPress={markAttendance} />
        <CustomButton title="View History" onPress={() => navigation.navigate("History")} type="secondary" />
        <CustomButton title="Change User" onPress={resetUser} type="danger" />
      </View>

    </View>

  </View>
);

}


const styles = StyleSheet.create({
header: {
  fontSize: 22,
  fontWeight: "bold",
  color: COLORS.text,
  marginBottom: 15,
  textAlign: "center",   
},
 container: {
  flex: 1,
  backgroundColor: COLORS.background,
  alignItems: "center",   
  justifyContent: "center",
  padding: 20
},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.text
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff"
  },
  wrapper: {
  width: "100%",
  maxWidth: 400,  
},

card: {
   backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 2
},

buttons: {
  gap: 10,
},
row: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
},
label: {
  fontWeight: "bold",  
  color: COLORS.text,
},

value: {
  color: "#555",
},
});