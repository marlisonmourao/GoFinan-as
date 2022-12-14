import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "react-native";
import { View } from "react-native";
import "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { AuthProvider, useAuth } from "./src/hooks/auth";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { Routes } from "./src/routes";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";

export default function App() {
  const { userStoregeLoading } =  useAuth()

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
    if (appIsReady || userStoregeLoading) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </View>
  );
}
