/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, Image,
} from '@components';
import { Dimensions, StatusBar } from 'react-native';
import EventCalendar from 'react-native-events-calendar'


let { width } = Dimensions.get('window')


class MydayApp extends PureComponent {
  eventTapped = ()=> {console.log('123');
  }
  // private _eventTapped: any;
  render() {
    const events = [
      { start: '2020-09-07 00:30:00', end: '2020-09-07 01:30:00', title: 'Go to school', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-07 01:30:00', end: '2020-09-07 02:20:00', title: 'Go to school', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-07 04:10:00', end: '2020-09-07 04:40:00', title: 'Go to school', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-07 01:05:00', end: '2020-09-07 01:45:00', title: 'Go to school', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-07 14:30:00', end: '2020-09-07 16:30:00', title: 'Picnic', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-08 01:20:00', end: '2020-09-08 02:20:00', title: 'Picnic', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-08 04:10:00', end: '2020-09-08 04:40:00', title: 'Picnic', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-08 00:45:00', end: '2020-09-08 01:45:00', title: 'Homework', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-08 11:30:00', end: '2020-09-08 12:30:00', title: 'Homework', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-09 01:30:00', end: '2020-09-09 02:00:00', title: 'Play card game', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-09 03:10:00', end: '2020-09-09 03:40:00', title: 'Go to bed', summary: '3412 Piedmont Rd NE, GA 3032' },
      { start: '2020-09-09 00:10:00', end: '2020-09-09 01:45:00', title: 'Go to bed', summary: '3412 Piedmont Rd NE, GA 3032' }
    ]
    return (
      <Container>
        <Header backIcon title="My day"   />
        <EventCalendar
      eventTapped={this.eventTapped}
      events={events}
      width={width}
      initDate={'2020-09-08'}
    />
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MydayApp);
