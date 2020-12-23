import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import diaryStack from './routes';
import AddDiary from './screens/AddDiary';
import DiaryApp from './screens';

const Stack = createStackNavigator();

export default function DiaryAppStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={diaryStack.auth} component={DiaryApp} />
      <Stack.Screen name={diaryStack.add} component={AddDiary} />
    </Stack.Navigator>
  );
}
