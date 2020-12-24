/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Body,
  QuickView,
  Button,
  Text,
  Input,
  Header,
  DateTimePicker,
} from '@components';
import { ColorPicker } from 'react-native-color-picker';
import firestore from '@react-native-firebase/firestore';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import NavigationService from '@utils/navigation';
import RNCalendarEvents from 'react-native-calendar-events';
import { Alert } from 'react-native';
interface Props {}
interface State {
  color: string;
}

// RNCalendarEvents.requestPermissions((readonly: false))
class AddDiary extends PureComponent<Props, State> {
  title: any;

  content: any;

  datePickerRef: any;

  starttimePickerRef: any;
  endTimePickerRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      color: lightPrimaryColor,
    };
    // fs.readFile('credentials.json', (err, content: any) => {
    //   if (err) return console.log('Error loading client secret file:', err);
    //   // Authorize a client with credentials, then call the Google Calendar API.
    //   this.authorize(JSON.parse(content), this.listEvents);
    // });
    RNCalendarEvents.requestPermissions(true).then(
      (result) => {
        Alert.alert('Read-only Auth requested', result);
      },
      (result) => {
        console.error(result);
      },
    );
  }

  // getAccessToken = (oAuth2Client: any, callback: any) => {
  //   const authUrl = oAuth2Client.generateAuthUrl({
  //     access_type: 'offline',
  //     scope: SCOPES,
  //   });
  //   console.log('Authorize this app by visiting this url:', authUrl);
  //   const rl = readline.createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //   });
  //   rl.question('Enter the code from that page here: ', (code) => {
  //     rl.close();
  //     oAuth2Client.getToken(code, (err: any, token: any) => {
  //       if (err) return console.error('Error retrieving access token', err);
  //       oAuth2Client.setCredentials(token);
  //       // Store the token to disk for later program executions
  //       // fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
  //       //   if (err) return console.error(err);
  //       //   console.log('Token stored to', TOKEN_PATH);
  //       // });
  //       callback(oAuth2Client);
  //     });
  //   });
  // };

  handleAddDiary = () => {
    const { color } = this.state;
    const title = this.title.getText();
    const content = this.content.getText();
    const date = this.datePickerRef.getText();
    const startTime = this.starttimePickerRef.getText();
    const endTime = this.endTimePickerRef.getText();
    console.log('payload', title, content, date, startTime, endTime, color);
    const eventFromNow: object = {
      summary: 'Poc Dev From Now',
      time: 480,
    };

    RNCalendarEvents.findCalendars().then(
      (result) => {
        Alert.alert(
          'Calendars',
          result
            .reduce((acc: any, cal: any) => {
              acc.push(cal.title);
              return acc;
            }, [])
            .join('\n'),
        );
      },
      (result) => {
        console.error(result);
      },
    );
    firestore()
      .collection('Diaries')
      .add({
        title,
        content,
        date,
        time: startTime,
        color,
        status: 0,
      })
      .then(() => {
        console.log('Diary added!');
      });
  };

  render() {
    return (
      <Container>
        <Header backIcon title="Add your task" />
        <Body scroll>
          <Input
            marginTop={10}
            ref={(ref: any) => {
              this.title = ref;
            }}
            placeholder="Add title"
          />
          <Input
            ref={(ref: any) => {
              this.content = ref;
            }}
            marginTop={10}
            placeholder="Add a note"
          />
          <Text color="#4a148c" fontSize={18}>
            Pick a day
          </Text>
          <DateTimePicker
            height={50}
            marginTop={10}
            ref={(ref) => {
              this.datePickerRef = ref;
            }}
            value={new Date()}
            // minimumDate={new Date('2020-08-12')}
            // maximumDate={new Date('2020-08-20')}
            placeholder="Pick a date"
            shadow
          />
          <Text color="#4a148c" fontSize={18}>
            Begin time
          </Text>
          <DateTimePicker
            height={50}
            mode="time"
            shadow
            value={new Date()}
            ref={(ref) => {
              this.starttimePickerRef = ref;
            }}
          />
          <Text color="#4a148c" fontSize={18}>
            End time
          </Text>
          <DateTimePicker
            height={50}
            mode="time"
            shadow
            value={new Date()}
            ref={(ref) => {
              this.endTimePickerRef = ref;
            }}
          />
          <QuickView height={400}>
            <ColorPicker
              onColorSelected={(color) =>
                // Alert.alert(`Color selected: ${color}`)
                this.setState({ color })
              }
              style={{ flex: 1 }}
            />
          </QuickView>
        </Body>
        <Button
          center
          width={400}
          height={60}
          title="Add task"
          onPress={() => {
            this.handleAddDiary();
            NavigationService.goBack();
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddDiary);
