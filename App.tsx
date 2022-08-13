import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import { AuthProvider } from "./src/context/AuthContext";
import Home from "./src/screens/Home";
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ DMSans_400Regular, DMSerifDisplay_400Regular });
      } catch {
        // handle error
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      {/* {!appIsReady && <View onLayout={onLayout} />} */}
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Home onLayout={onLayout}/>
          <StatusBar style="auto" />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
