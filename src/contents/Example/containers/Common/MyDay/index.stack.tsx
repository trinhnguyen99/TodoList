import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import mydayStack from './router';
import MydayApp from './screens/index';

const Stack = createStackNavigator();

export default function MydayAppStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={mydayStack.myday} component={MydayApp} />
    </Stack.Navigator>
  );
}
