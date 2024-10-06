# Makan Meter

### Team Information
**Team Name**: Makan Meter  
**Team ID**: 6194  
**Team Members**: Low Bing Heng, Tan Jun Yang Adrian  
**Proposed Level of Achievement**: Apollo 11  

---

## Overview

Makan Meter is a nutrition-focused mobile application designed to help users track their food intake, monitor their nutritional consumption, and achieve their dietary goals. By integrating food recognition technology and a customised meal planner, Makan Meter offers users a seamless experience for logging meals and making healthier food choices. 

Whether you’re looking to lose weight, gain muscle, or maintain a balanced diet, Makan Meter provides all the necessary tools to stay on track. The app leverages image recognition powered by OpenAI’s GPT-4o and the Nutritionix database to deliver accurate nutritional information, making the process of tracking food effortless.

---

## Features

### 1. User Account Authentication
- **Supabase Authentication**: Secure and efficient user sign-up, login, and session management.
- **Global Provider**: Persistent login, so users don’t need to log in repeatedly.
- **Multi-factor Authentication (MFA)** and security measures to protect user credentials.

### 2. Onboarding
- **Personalised Onboarding**: Collects user data such as age, weight, height, and dietary goals to estimate daily caloric needs using the revised Harris-Benedict equation.
- **Scroll Pickers**: Helps users input personal data accurately and avoid mistakes.

### 3. Food Recognition
- **Powered by GPT-4o**: Users can scan their meals using the camera feature, and Makan Meter will automatically identify the food items.
- **Nutritionix Integration**: Provides a comprehensive breakdown of the scanned meal's nutritional content, including calories, macronutrients, and vitamins.
- **Manual Search**: In cases where the food isn't recognised, users can manually search for their meals using the app’s search bar.

### 4. Meal Logger & Nutrition Analysis
- **Daily Summary**: A dashboard showing total caloric intake, macronutrients, and water consumption.
- **Meal Tracking**: Log meals under categories like breakfast, lunch, dinner, and snacks.
- **Trend Analysis**: Offers insights into user consumption patterns over time, helping to improve dietary habits.

### 5. Meal Plans
- **Customisable Diet Plans**: Users can choose from preset meal plans (e.g., Weight Loss, Vegan, Muscle Gain) or customise their own.
- **Active Plan Management**: The app allows users to track their active meal plan or modify it as needed.

### 6. Push Notifications
- **Daily Meal Reminder**: Sends a notification at 6:00 PM daily reminding users to log their meal if they haven’t already.
- **Notification History**: Users can access a history of past notifications by clicking the bell icon on the home screen.

### 7. Streak Counter
- **Daily Streak Tracking**: Encourages users to maintain consistency by tracking the number of consecutive days they log their meals. If a day is missed, the streak resets to 0.

---

## Tech Stack
- **Frontend**: React Native
- **Backend**: Supabase (authentication, database, and edge functions)
- **APIs**: Nutritionix, OpenAI GPT-4o for food recognition
- **Development Framework**: Expo
- **Version Control**: Git/GitHub

---

## How to Use

1. Download the **Expo Go** app from the [App Store](https://apps.apple.com) or [Google Play Store](https://play.google.com).
2. Scan the provided QR code (found in the app or project documentation) to access the Makan Meter application.

---

## Limitations
- **Limited API Calls**: The Nutritionix API has a limit of 200 calls per day, which may affect the app’s performance during peak usage.
- **Database Limitations**: Supabase's free tier limits storage to 500MB for the database and 1GB for file storage, which may become a constraint as the app scales.

---

## Project Report

For a detailed development timeline, feature breakdowns, and testing results, please refer to the full project report [here](https://docs.google.com/document/d/1YU5b168TGUmyyqrXZMGuJ5_R62FFju61csKV_JSUGqc/edit?usp=drive_link).
