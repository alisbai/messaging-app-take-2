import React, { useContext } from "react";
import Home from "../screens/Home";
import Files from "../screens/Files";
import Inbox from "../screens/Inbox";
import Profile from "../screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants/theme";

import { TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Tab = createBottomTabNavigator();

function NavigationTabs() {
  const { logout } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: FONT.regular,
        },

        headerLeft: () => {
          return (
            <TouchableOpacity>
              <MaterialIcons
                style={{ marginLeft: SIZES.large }}
                name="menu"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          );
        },

        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => logout()}>
              <MaterialIcons
                style={{ marginRight: SIZES.large }}
                // name="search"
                name="logout"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          );
        },
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />

      <Tab.Screen
        name="Files"
        component={Files}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="folder" color={color} size={size} />
          ),
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />

      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inbox" color={color} size={size} />
          ),
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    marginBottom: 5,
    fontFamily: FONT.regular,
  },
});

export default NavigationTabs;
