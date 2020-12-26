/* eslint-disable import/prefer-default-export */
import exampleStack from './routes';
import commonStack from './containers/Common/routes';

export const exampleList = [
  {
    name: 'My day',
    iconName: 'fan',
    subtitle: 'Your plan today',
    linearGradientColors: ['#fdbb2d', '#eeaeca'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.myday,
  },
  {
    name: 'Calendar',
    iconName: 'calendar',
    subtitle: 'See more plan',
    linearGradientColors: ['#94bbe9', '#eeaeca'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.calender,
  },
  {
    name: 'To do list',
    iconName: 'flower',
    subtitle: 'Set up your plan',
    linearGradientColors: ['#689f38', '#ba4e9d'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.diary,
  },

];
