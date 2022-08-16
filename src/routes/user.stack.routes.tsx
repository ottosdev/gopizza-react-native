import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import Home from "../screens/Home";
import Order from "../screens/Order";
import Products from "../screens/Products";
import UserTabRoutes from "./user.tab.routes";
const { Navigator, Screen, Group } = createNativeStackNavigator();
export default function UserRoutes() {
  const { user } = useAuth();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
        <Group>
          <Screen name="home" component={Home} />
          <Screen name="product" component={Products} />
        </Group>
      ) : (
        <Group>
          <Screen name="UserTabRoutes" component={UserTabRoutes} />
          <Screen name="order" component={Order} />
        </Group>
      )}
    </Navigator>
  );
}
