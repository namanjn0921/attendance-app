# Geo-Fenced Attendance App

A React Native mobile application built using Expo that allows users to mark attendance only when they are physically present inside a predefined geo-fenced area.

This project was developed as part of the Mobile Engineer Intern Assessment.

---

# Features

## Core Features

* User onboarding with Name and Employee ID
* Real-time GPS location tracking
* Geo-fencing based attendance system
* Distance calculation using Haversine Formula
* GPS accuracy validation
* Attendance marking with timestamp and coordinates
* Attendance history screen
* Local storage using AsyncStorage
* Prevent duplicate attendance for the same employee on the same day
* Clear attendance history
* User switching / reset functionality

---

# Tech Stack

* React Native
* Expo
* JavaScript
* AsyncStorage
* Expo Location API
* React Navigation

---

# Project Structure

```bash
src/
 ├── components/
 │    └── CustomButton.js
 │
 ├── screens/
 │    ├── HomeScreen.js
 │    ├── HistoryScreen.js
 │    └── OnboardingScreen.js
 │
 ├── utils/
 │    ├── distance.js
 │    └── theme.js
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/namanjn0921/attendance-app
```

## 2. Navigate Into Project

```bash
cd attendance-app
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Install Required Packages

```bash
npm install @react-native-async-storage/async-storage
```

```bash
npx expo install expo-location
```

```bash
npm install @react-navigation/native
```

```bash
npx expo install react-native-screens react-native-safe-area-context
```

```bash
npm install @react-navigation/native-stack
```

## 5. Start Application

```bash
npm start
```

---

# Application Workflow

## 1. Onboarding

When the application opens for the first time:

* User enters Name
* User enters Employee ID
* Data is stored locally using AsyncStorage

The application skips onboarding on future launches unless the user changes profile.

---

## 2. Home Screen

The Home Screen displays:

* Current Latitude
* Current Longitude
* GPS Accuracy
* Accuracy Status
* Distance from Center Location
* Inside / Outside Status

The user can:

* Refresh Location
* Mark Attendance
* View Attendance History
* Change User

---

## 3. Attendance Marking Logic

Attendance is allowed only if:

* User is inside the allowed geo-fenced radius
* GPS accuracy is acceptable
* User has not already marked attendance for the same day

If any condition fails, attendance is rejected.

---

# Geo-Fencing Logic

A fixed center coordinate is defined inside the application.

```js
const CENTER = {
  latitude: 28.733653831115042,
  longitude: 77.13191403823008
};
```

The distance between the user's current location and the center location is calculated using the Haversine Formula.

Attendance is allowed only when:

```js
Distance <= 100 meters
```

---

# Distance Calculation Approach

The Haversine Formula was used to calculate the real-world distance between two geographic coordinates.

This formula accounts for the curvature of the Earth and provides accurate GPS distance calculations.

Implementation file:

```bash
src/utils/distance.js
```

---

# GPS Accuracy Handling

Real-world GPS values fluctuate frequently.

To handle inaccurate GPS data, the following logic was implemented:

| Accuracy Range | Status   | Behavior           |
| -------------- | -------- | ------------------ |
| <= 50m         | Good     | Attendance Allowed |
| 50m - 70m      | Moderate | Warning Displayed  |
| > 70m          | Poor     | Attendance Blocked |

This approach avoids sudden allow/reject behavior caused by minor GPS fluctuations.

---

# Duplicate Attendance Prevention

The application prevents multiple attendance submissions by the same employee on the same day.

Logic:

* Attendance history is loaded from AsyncStorage
* Employee ID and current date are compared
* If attendance already exists for the same employee on the same date, attendance is blocked

This simulates a real-world attendance system.

---

# Attendance History

The history screen displays:

* Employee Name
* Employee ID
* Timestamp
* Latitude
* Longitude

Additional Features:

* Clear attendance history
* Formatted timestamps
* Card-based UI layout

---

# UI Design

The UI was designed using a clean card-based layout.

Theme colors were inspired by the company branding:

* Green
* Black
* Yellow accents

Design Goals:

* Clean
* Minimal
* Professional
* Easy to read

Focus was placed on usability and clarity instead of excessive UI polish.

---

# Assumptions Made

* User grants location permission
* GPS data may fluctuate indoors
* One device may be used by multiple employees
* Internet connection is not required
* Attendance data is stored locally

---

# Known Limitations

* No backend/database integration
* No cloud synchronization
* No anti-spoofing detection
* No background location tracking
* Attendance data can be cleared locally

---

# Future Improvements

If more time were available, the following improvements would be added:

* Backend integration
* Secure authentication system
* Cloud attendance synchronization
* Live map integration
* Face verification
* GPS spoof detection
* Admin dashboard
* Background geo-fencing
* Push notifications

---

# Key Technical Decisions

## Why Expo?

Expo was used to simplify development and speed up testing.

## Why AsyncStorage?

The assignment allowed local storage, so AsyncStorage was chosen for simplicity and offline support.

## Why Haversine Formula?

It provides accurate real-world geographic distance calculations.

## Why Accuracy Buffer?

GPS values fluctuate frequently in real environments.

A buffer range improves user experience while still maintaining reliability.

---

# Screens Included

* Onboarding Screen
* Home Screen
* Attendance History Screen

---

# Demo Scenarios Covered

The application demonstrates:

* Successful attendance marking
* Rejected attendance outside radius
* GPS accuracy validation
* Duplicate attendance prevention
* Attendance history storage
* User switching

---

# APK + Demo Video

Submission includes:

* GitHub Repository
* APK File
* Walkthrough Video

---

# Author

Developed by Naman Jain
