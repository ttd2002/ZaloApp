import { Stack, Navigator } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack initialRouteName="home">
        <Stack.Screen name="home" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </>
  );
}