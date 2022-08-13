import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AuthProps {
  email: string;
  password: string;
}

const USER_COLLETION = "@gopizza";

type User = {
  id: string;
  name: string;
  isAdmin: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  isLoggin: boolean;
  user: User | null;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggin, setIsLoggin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe e-mail e a senha");
    }

    setIsLoggin(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection("users")
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              };
              await AsyncStorage.setItem(
                USER_COLLETION,
                JSON.stringify(userData)
              );
              setUser(userData);
            }
          })
          .catch(() =>
            Alert.alert(
              "Login",
              "Não foi possivel buscar os dados de perfil do usuario"
            )
          );
      })
      .catch((error) => {
        const { code } = error;
        if (code == "auth/user-not-found" || "auth/wrong-password") {
          return Alert.alert("Login", "E-mail e/ou senha invalida");
        } else {
          return Alert.alert("Login", "Não foi possivel realizar o login");
        }
      })
      .finally(() => {
        setIsLoggin(false);
      });
  }

  async function laodUserStorageData() {
    setIsLoggin(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLETION);
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLoggin(false);
  }

  async function logout() {
    await auth().signOut();
    AsyncStorage.removeItem(USER_COLLETION);
    setUser(null);
  }

  async function resetPassword(email: string) {
    if (!email) {
      return Alert.alert("Redefinir senha", "Informe um e-mail");
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Redefinir senha",
          "Enviamos um link no seu e-mail para redefinição de senha"
        );
      })
      .catch(() =>
        Alert.alert(
          "Refefinir senha",
          "Não foi possivel redefinir a senha, por favor contate o suporte!"
        )
      );
  }

  useEffect(() => {
    laodUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, isLoggin, user, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
