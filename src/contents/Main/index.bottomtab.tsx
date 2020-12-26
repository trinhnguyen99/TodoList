/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Icon, withTheme } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bottomNavigationBarHeight, shadowViewLight } from '@themes/ThemeComponent/Common/CommonProps';
import { withTranslation } from 'react-i18next';
import { compose } from 'recompose';
import { lightTheme } from '@themes';
import { useSelector } from 'react-redux';
import { applyObjectSelector } from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Index/Login/redux/selector';
import { StyleSheet } from 'react-native';
import mainBottomTab from './routes';
import HomeStack from './containers/Home/index.stack';
import MoreStack from './containers/More/index.stack';
import ImportantStack from '../Example/containers/Common/Important/index.stack';

const BottomTabs = createBottomTabNavigator();

function MainBottomTab(props: any) {
  const { theme: { colors: { bgColor, primary } }, t } = props;
  const loginSelectorData = useSelector((state) => applyObjectSelector(loginSelector, state));
  const isNotLogin = !loginSelectorData.data.get('token');

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: primary,
        inactiveTintColor: primary,
        style: StyleSheet.flatten([
          {
            height: bottomNavigationBarHeight,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 5,
            borderTopColor: 'transparent',
            padding: 10,
            backgroundColor: bgColor,
          },
          {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
          },
        ]),
        tabStyle: {
          backgroundColor: bgColor,
          height: 55,
          paddingTop: 8,
          borderRadius: 20,
        },
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTabs.Screen
        name={mainBottomTab.homeStack}
        component={HomeStack}
        options={{
          tabBarLabel: t('bottom_tab:home'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="home"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon name="home-outline" type="material-community" color={color} size={22} />
          )),
        }}
      />
      {/* <BottomTabs.Screen
        name={mainBottomTab.bookmarkStack}
        component={SavedStack}
        options={{
          tabBarLabel: t('bottom_tab:saved'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="bookmark"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon name="bookmark-outline" type="material-community" color={color} size={22} />
          )),
        }}
      /> */}
      {/* <BottomTabs.Screen
        name={mainBottomTab.mailStack}
        component={MailStack}
        options={{
          tabBarLabel: t('bottom_tab:mail'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="email"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon name="email-outline" type="material-community" color={color} size={22} />
          )),
        }}
      /> */}
      <BottomTabs.Screen
        name={mainBottomTab.importantStack}
        component={ImportantStack}
        options={{
          tabBarLabel: t('bottom_tab:Done'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="text-box-check"
              type="material-community"
              color={color}
            />
          ) : (
            <Icon name="text-box-check-outline" type="material-community" color={color} size={22} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={mainBottomTab.moreStack}
        component={MoreStack}
        options={{
          tabBarLabel: t('bottom_tab:more'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon name="bars" type="font-awesome" color={color} size={20} />
          ) : (
            <Icon name="bars" type="font-awesome" color={color} size={16} />
          )),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default compose(
  withTheme,
  withTranslation(),
)(MainBottomTab);
