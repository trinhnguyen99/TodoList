import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Icon, ListItem,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '@utils/navigation';
import {
  QuickView, Body, Container, Text,
} from '@components';
import { Color } from '@themes/Theme';
import { withTranslation } from 'react-i18next';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import { FlatList } from 'react-native-gesture-handler';
import { exampleList } from '../list';

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#cbd2d9',
    backgroundColor: '#fff',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#FD6B78',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

interface Props {
  t: any;
}
class ExampleList extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Container>
        <QuickView>
          <View style={styles.headerContainer}>
            <Icon color="white" name="clipboard-list" type="font-awesome-5" size={62} />
            <Text style={styles.heading}>
              {t('header:example')}
              {' '}
            </Text>
          </View>
          <QuickView row center position="absolute" right={15} top={160}>
            <Icon name="theme-light-dark" type="material-community" style={{ marginRight: 5 }} color={Color.white} />
            <SwitchChangeTheme />
          </QuickView>
        </QuickView>
        <Body backgroundImage={{ source: require('@assets/images/3.png') }} paddingVertical={15}>
          <QuickView style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            {exampleList.map((l: any, i: number) => (
              <QuickView
                onPress={() => {
                  if (l.stack || l.screen) {
                    NavigationService.navigate(l.stack, {
                      screen: l.screen,
                    });
                  }
                }}
                center
                backgroundColor={l.linearGradientColors[0]}
                borderRadius={10}
                marginBottom={20}
                height={150}
                row
                width="45%"
              >
                <Icon color="white" name={l.iconName} type="material-community" />
                <QuickView marginLeft={10}>
                  <Text bold color="white" type="title">{l.name}</Text>
                  <Text color="white">{l.subtitle}</Text>

                </QuickView>
              </QuickView>
            //   <ListItem
            //   leftAvatar={{ rounded: true, icon: { name: l.iconName, size: l.iconSize || 25, type: 'material-community' } }}
            //   key={i.toString()}
            //   activeOpacity={1}
            //   linearGradientProps={{
            //     colors: l.linearGradientColors,
            //     start: { x: 1, y: 0 },
            //     end: { x: 0.2, y: 0 },
            //   }}
            //   underlayColor="transparent"
            //   ViewComponent={LinearGradient as any}
            //   title={l.name}
            //   titleStyle={{ color: 'white', fontWeight: 'bold' }}
            //   subtitleStyle={{ color: 'white' }}
            //   subtitle={l.subtitle}
            //   // chevronColor="white"
            //   // chevron={!!((l.stack || l.screen))}
            //   containerStyle={{
            //     marginVertical: 8,
            //     borderRadius: 8,
            //     borderWidth:1,
            //     borderColor: 'red',
            //     flex:1
            //   }}
            //   onPress={() => {
            //     if (l.stack || l.screen) {
            //       NavigationService.navigate(l.stack, {
            //         screen: l.screen,
            //       });
            //     }
            //   }}
            // />
            ))}
          </QuickView>

        </Body>
      </Container>
    );
  }
}

export default withTranslation()(ExampleList as any);
