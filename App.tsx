import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { ThemeProvider } from "styled-components";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { Dashboard } from "./src/screens/Dashboard";
import { Register } from "./src/screens/Register";
import { CategorySelected } from "./src/screens/CategorySelect";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        console.log(err);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Register />
      </ThemeProvider>
    </View>
  );
}
