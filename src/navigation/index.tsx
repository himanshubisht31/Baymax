import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import Splashscreen from '../screens/splash-screen';
import Baymaxscreen from '../screens/baymax-screen';
import {navigationRef} from '../utils/navigation-utils';

const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splashscreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen
          name="Baymaxscreen"
          options={{
            animation: 'fade',
          }}
          component={Baymaxscreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
