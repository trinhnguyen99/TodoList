/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { QuickView, Text, Container, Header, Body, Image } from '@components';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };
class MydayApp extends PureComponent {
  eventTapped = () => {
    console.log('123');
  };
  render() {
    return (
      <Container>
        <Header backIcon title="Calendar" />
        <CalendarList
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months: any) => {
            console.log('now these months are visible', months);
          }}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MydayApp);
