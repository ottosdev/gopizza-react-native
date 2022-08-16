import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import SignIn from "../screens/Signin";
import UserRoutes from "./user.stack.routes";

export default function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <UserRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
