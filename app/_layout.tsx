import { Stack } from "expo-router";
import "./globals.css"
import {StatusBar} from "react-native";
import {UserProvider} from "@/app/contexts/UserContext";

export default function RootLayout() {
  return (
        <UserProvider>
          <StatusBar hidden={true} />
          <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="movies/[id]"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                  name="(auth)"
                  options={{ headerShown: false }}
              />
          </Stack>
      </UserProvider>
    );
}
