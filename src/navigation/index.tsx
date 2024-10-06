import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import Splashscreen from '../screens/splash-screen';
import Baymaxscreen from '../screens/baymax-screen';
import {navigationRef} from '../utils/navigation-utils';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <GestureHandlerRootView style={styles.container}>
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
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigation;
