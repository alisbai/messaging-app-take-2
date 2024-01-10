import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";

const Stack = createNativeStackNavigator();
const showBackButton = {
  headerShown: true,
  title: "",
  headerTransparent: true,
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />

      <Stack.Screen options={showBackButton} name="Login" component={Login} />

      <Stack.Screen
        options={showBackButton}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
