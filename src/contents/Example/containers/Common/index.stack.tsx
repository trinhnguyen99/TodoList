/* eslint-disable import/extensions */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import commonStack from './routes';
import DiaryAppStack from './DiaryApp/index.stack';
import MydayAppStack from './MyDay/index.stack';
import CalenderAppStack from './Calendar/index.stack';

const Stack = createStackNavigator();

export default function CommonExampleStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={commonStack.diary} component={DiaryAppStack} />
      <Stack.Screen name={commonStack.myday} component={MydayAppStack} />
      <Stack.Screen name={commonStack.calender} component={CalenderAppStack} />

    </Stack.Navigator>
  );
}
