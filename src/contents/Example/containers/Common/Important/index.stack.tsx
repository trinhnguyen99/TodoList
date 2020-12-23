import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ImportantScreen from './screens';
import importantStack from './routes';

const Stack = createStackNavigator();

export default function MailStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={importantStack.index} component={ImportantScreen} />
    </Stack.Navigator>
  );
}
