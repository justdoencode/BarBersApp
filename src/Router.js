import React from "react";
import { SafeAreaView, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./pages/HomePage/HomePage";
import BusinessLoginPage from "./pages/BusinessPages/BusinessLoginPage/BusinessLoginPage";
import CustomerLoginPage from "./pages/CustomerPages/CustomerLoginPage/CustomerLoginPage";
import BusinessSignInPage from "./pages/BusinessPages/BusinessSignInPage/BusinessSignInPage";
import CustomerSignInPage from "./pages/CustomerPages/CustomerSignInPage/CustomerSignInPage";

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{
          headerShown: false
        }} />

        <Stack.Screen name="BusinessLoginPage" component={BusinessLoginPage} options={{
          headerStyle: { backgroundColor: "#62825D" },
          headerTitleStyle: { color: "white" },
          headerTitle: "BarBers",
          headerTitleAlign: "center",
        }} />

        <Stack.Screen name="BusinessSignInPage" component={BusinessSignInPage} options={{
          headerStyle: { backgroundColor: "#62825D" },
          headerTitleStyle: { color: "white" },
          headerTitle: "BarBers",
          headerTitleAlign: "center",
        }} />



        <Stack.Screen name="CustomerLoginPage" component={CustomerLoginPage} options={{
          headerStyle: { backgroundColor: "#62825D" },
          headerTitleStyle: { color: "white" },
          headerTitle: "BarBers",
          headerTitleAlign: "center",
        }} />

        <Stack.Screen name="CustomerSignInPage" component={CustomerSignInPage} options={{
          headerStyle: { backgroundColor: "#62825D" },
          headerTitleStyle: { color: "white" },
          headerTitle: "BarBers",
          headerTitleAlign: "center",
        }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}




export default Router;