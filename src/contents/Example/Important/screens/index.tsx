/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {
  Container,
  Body,
  QuickView,
  Button,
  Text,
  Header,
} from '@components';
import { Alert } from 'react-native';
import { lightPrimaryColor, Color, lightSecondaryColor } from '@themes/ThemeComponent/Common/Color';
import NavigationService from '@utils/navigation';
import firestore from '@react-native-firebase/firestore';
import FlatList from '@components/Common/FlatList/DefaultFlatList';
import { Icon, ListItem, Overlay } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import diaryStack from '../routes';

interface Props {}
interface State {
  loggedIn: boolean;
  user: any;
  diaries: Array<any>;
  isOverlayVisible: boolean;
  idDelete: string | null;
}
class ImportantScreen extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: null,
      diaries: [],
      isOverlayVisible: false,
      idDelete: null,
    };
  }

  onResult = (QuerySnapshot: any) => {
    console.log('Got Users collection result.', QuerySnapshot._docs);
    this.setState({ diaries: QuerySnapshot._docs });
  };

  onError = (error: any) => {
    console.error(error);
  };

  async componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '93820640477-fs1d7ttjqf3ncdpo3vjdhns3k2lp2ens.apps.googleusercontent.com',
      offlineAccess: false,
    });
    auth().onAuthStateChanged((user: any) => this.onAuthStateChanged(user));
    firestore().collection('Diaries').onSnapshot(this.onResult, this.onError);
  }

  onAuthStateChanged = (user: any) => {
    this.setState({ user });
    if (user) this.setState({ loggedIn: true });
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      this.setState({ loggedIn: true, user: idToken });
      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
    } catch (error) {
      console.log('DiaryApp -> signIn -> error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  signOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ loggedIn: false, user: [] });
    } catch (error) {
      console.error(error);
    }
  };

  renderItem = ({ item, index }: { item: any; index: number }) => {
    if (item._data.status) {
      return (
        <TouchableOpacity>
          <QuickView
            backgroundColor={item._data.color}
            borderRadius={10}
            padding={20}
            marginVertical={10}
          >
            <QuickView row justifyContent="space-between">
              <QuickView>
                <Text fontSize={25} bold color={Color.white}>{item._data.title}</Text>
                <Text color={Color.white}>{item._data.content}</Text>
                <Text fontSize={17} color={Color.white}>{item._data.date}</Text>
                <QuickView row>
                  <Text fontSize={19} color={Color.white}>
                    {item._data.time}
                    {' '}
                    -
                    {' '}
                  </Text>
                  <Text fontSize={19} color={Color.white}>{item._data.time}</Text>
                </QuickView>
              </QuickView>
              <Icon
                name="staro"
                type="antdesign"
                color="#FFFFFF"
                size={30}
              />
            </QuickView>
          </QuickView>
        </TouchableOpacity>
      );
    }
    return null;
  };

  toggleOverlay = () => {
    this.setState((prevState: any) => ({
      isOverlayVisible: !prevState.isOverlayVisible,
    }));
  };

  handleDelete = () => {
    const { idDelete } = this.state;
    console.log('1!!!!', idDelete);
    if (idDelete) {
      firestore()
        .collection('Diaries')
        .doc(idDelete)
        .delete()
        .then(() => {
          console.log('User deleted!');
          this.setState({ isOverlayVisible: false });
        });
    }
  };

  render() {
    const {
      loggedIn, user, diaries, isOverlayVisible,
    } = this.state;
    console.log('DiaryApp -> render -> user', diaries[0]?._ref?.id);
    return (
      <Container>
        <Overlay isVisible={isOverlayVisible} onBackdropPress={this.toggleOverlay}>
          <QuickView>
            <Text center bold fontSize={20} type="title">Thông báo</Text>
            <Text fontSize={18}>Vui lòng chọn trạng thái !</Text>
            <QuickView justifyContent="space-between" row>
              <Button title="Xong" width={100} onPress={this.toggleOverlay} />
              <Button title="Xóa" width={100} onPress={this.handleDelete} />
            </QuickView>
          </QuickView>
        </Overlay>
        <Header backIcon title="Let's plan" />
        <Body>
          <QuickView center>
            {/* {loggedIn && user && user?.displayName ? (
              <Text>{`Xin chào ${user?.displayName}`}</Text>
            ) : null} */}
            {loggedIn ? null : (
              <GoogleSigninButton
                onPress={this.signIn}
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
              />
            )}
            {/* {!loggedIn && <Text>You are currently logged out</Text>} */}
          </QuickView>
          {loggedIn && (
            <>

            </>
          )}
          {loggedIn ? (
            <FlatList
              data={diaries}
              renderItem={this.renderItem}
            />
          ) : null}
        </Body>

      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ImportantScreen);
