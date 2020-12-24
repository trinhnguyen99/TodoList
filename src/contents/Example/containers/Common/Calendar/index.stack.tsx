import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalenderApp from './screens/index';
import AgendaApp from './screens/agendarScreen';

import calenderStack from './router';

const Stack = createStackNavigator();

export default function CalenderAppStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={calenderStack.calender} component={AgendaApp} />
    </Stack.Navigator>
  );
}
