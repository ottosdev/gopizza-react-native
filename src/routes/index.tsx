import { NavigationContainer } from "@react-navigation/native";
import UserRoutes from "./user.stack.routes";

export default function Routes() {
  return (
    <NavigationContainer>
        <UserRoutes/>
    </NavigationContainer>
  )
}
