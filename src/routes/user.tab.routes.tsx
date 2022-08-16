import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components";
import BottomMenu from "../components/BottomMenu";
import Home from "../screens/Home";
import Orders from "../screens/Orders";
import firestore from "@react-native-firebase/firestore";

const { Navigator, Screen } = createBottomTabNavigator();

export default function UserTabRoutes() {
  const [notifications, setNotifications] = useState("0");
  const { COLORS } = useTheme();

  useEffect(() => {
    const subscribe = firestore()
      .collection("order")
      .where("status", "==", "Pronto")
      .onSnapshot((querySnapShot) => {
        setNotifications(String(querySnapShot.docs.length));
      });

    return () => subscribe();
  }, []);
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardapio" color={color} />
          ),
        }}
      />
      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Pedidos" color={color} notifications={notifications} />
          ),
        }}
      />
    </Navigator>
  );
}
