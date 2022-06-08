import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Screen1 from "./components/Screen1.js"
import Screen2 from "./components/Screen2.js"
import BigPhoto from './components/BigPhoto.js'
import CameraComp from './components/Camera.js'

const Stack = createNativeStackNavigator();

function App() {
  return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="s1" component={Screen1} options={{headerShown: false}} />
                <Stack.Screen name="s2" component={Screen2}  />
                <Stack.Screen name="Wybrane zdjecie" component={BigPhoto}  />
                <Stack.Screen name="Camera" component={CameraComp} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;