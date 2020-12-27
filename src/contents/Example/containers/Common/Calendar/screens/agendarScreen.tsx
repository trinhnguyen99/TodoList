import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';

interface State {
  items: any;
}
export default class AgendaScreen extends Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: {},
    };
  }

  render() {
    return (
      <Agenda
        loadItemsForMonth={this.loadItems.bind(this)}
        selected="2020-12-24"
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        items={{
          '2020-12-28': [{ name: 'Add new Task - Bao ve Do an', height: 80 }],
          '2020-12-29': [{ name: 'item 2 - any js object', height: 80 }],
        }}
        // markingType={'period'}
        markedDates={{
          '2020-12-28': { textColor: '#43515c' },
          '2017-05-09': { textColor: '#43515c' },
          '2017-05-14': { startingDay: true, endingDay: true, color: 'blue' },
          '2017-05-26': { endingDay: true, color: 'gray' },
        }}
        monthFormat={'yyyy'}
        renderDay={(day, item) => <Text>{day ? day.day : 'item'}</Text>}
        // hideExtraDays={false}
      />
    );
  }

  loadItems(day: any) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: `Item for ${strTime} #${j}`,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems: any = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item: any) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1: any, r2: any) {
    return r1.name !== r2.name;
  }

  timeToString(time: any) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
