import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import authStack from './routes';
import GreetingScreen from './Index';
import EmployeeAuthStack from './EmployeeAuth/index.stack';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name={authStack.greetingScreen} component={GreetingScreen} />
      {EmployeeAuthStack()}
    </Stack.Navigator>
  );
}
