import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";

import HomePage from "./pages/HomePage/HomePage";
import BusinessLoginPage from "./pages/BusinessPages/BusinessLoginPage/BusinessLoginPage";
import BusinessSignInPage from "./pages/BusinessPages/BusinessSignInPage/BusinessSignInPage";
import BusinessHomePage from "./pages/BusinessPages/BusinessHomePage/BusinessHomePage";
import CustomerLoginPage from "./pages/CustomerPages/CustomerLoginPage/CustomerLoginPage";
import CustomerSignInPage from "./pages/CustomerPages/CustomerSignInPage/CustomerSignInPage";
import CustomerHomePage from "./pages/CustomerPages/CustomerHomePage/CustomerHomePage";

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{
          headerShown: false
        }} />


        {/* Business Pages */}

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

        <Stack.Screen name="BusinessHomePage" component={BusinessHomePage} options={{
          headerShown:false,
        }} />



        {/* Customer Pages */}

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

        <Stack.Screen name="CustomerHomePage" component={CustomerHomePage} options={{
          headerShown:false,
        }} />


      </Stack.Navigator>
      <FlashMessage position={"center"} />
    </NavigationContainer>
  )
}




export default Router;