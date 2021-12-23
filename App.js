import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import login from './Screen/login'
import photo_list from './Screen/photo_list'
import photo_detail from './Screen/photo_detail'
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false }}>
        <Stack.Screen name='login' component={login}></Stack.Screen>
        <Stack.Screen name='photo_list' component={photo_list}></Stack.Screen>
        <Stack.Screen name='photo_detail' component={photo_detail}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;