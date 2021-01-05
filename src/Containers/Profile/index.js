import React from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AppHeader from '../../Components/AppHeader/index';
import AsyncStorage from '@react-native-community/async-storage';
import {resetProperties} from '../Dashboard/actions';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {Images} from '../../utils';
import {ExpApi} from '../../services/';
import styles from './styles';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [
        {
          title: 'Full Name',
          subtitle: 'loading...',
          chevron: Images.chevronRight,
        },
        {title: 'Email', subtitle: 'loading...'},
        {
          title: 'Password',
          subtitle: 'New Password',
          chevron: Images.chevronRight,
        },
        {
          title: 'Wires',
          subtitle: 'View Instructions',
          chevron: Images.chevronRight,
        },
        {
          title: 'Contact',
          subtitle: 'Contact Us',
          chevron: Images.chevronRight,
        },
        {title: 'Version', subtitle: DeviceInfo.getVersion()},
      ],
      loaded: false,
      token: '',
      modalVisible: false,
      data: [],
    };
  }

  async componentDidMount() {
    let token = '';
    await AsyncStorage.getItem('userToken').then(value => {
      if (value !== null) {
        token = `Bearer ${JSON.parse(value)}`;
        this.setState({
          token: token,
        });
      } else {
        console.log('null');
      }
    });
    ExpApi.GetProfile(this.state.token, {})
      .then(response => {
        this.setState({
          data: [
            {
              firstName: response.data.data.user.firstName,
              lastName: response.data.data.user.lastName,
              email: response.data.data.user.email,
            },
          ],
        });
        const fullName = response.data.data.user.name;
        const email = response.data.data.user.email;
        const {profile} = this.state;
        this.setState(prevState => ({
          itemList: prevState.profile.map(obj =>
            obj.title === 'Full Name'
              ? Object.assign(obj, {subtitle: fullName})
              : obj,
          ),
        }));
        this.setState(prevState => ({
          itemList: prevState.profile.map(obj =>
            obj.title === 'Email' ? Object.assign(obj, {subtitle: email}) : obj,
          ),
          loaded: true,
        }));
      })
      .catch(error => {
        alert(
          'We have Unexpected Error ' +
            JSON.stringify(error.response.status) +
            ', Kindly Contact Support',
        );
      });
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  logoutHandler = async () => {
    this.setState({modalVisible: false});
    await AsyncStorage.removeItem('userToken').then(() => {
      AsyncStorage.clear();
      this.props.resetProperties();
      this.props.navigation.navigate('Auth');
    });
  };

  render() {
    const {modalVisible, profile, loaded} = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View style={{backgroundColor: '#f6f8fd', flex: 1}}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <AppHeader showLeftIcon={false} title={'Profile'} />
        <View style={styles.aboutContainer}>
          <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            presentationStyle={'overFullScreen'}
            statusBarTranslucent={true}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Logout of Expetitle</Text>
                <View
                  style={{
                    borderBottomColor: '#F3F3F3',
                    borderBottomWidth: 1,
                    width: 285,
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.logoutHandler()}
                  style={{margin: 20}}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#FF816D',
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                    }}>
                    Logout
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: '#F3F3F3',
                    borderBottomWidth: 1,
                    width: 285,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                  style={{margin: 20}}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#B5B5B5',
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <FlatList
            data={profile}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (index === 0 && loaded === true) {
                      navigate('FullName', {
                        data: this.state.data,
                        profile: this.componentDidMount.bind(this),
                      });
                    }
                    if (index === 2) {
                      navigate('Password');
                    }
                    if (index === 3) {
                      navigate('WireInstructions');
                    }
                    if (index === 4 && loaded === true) {
                      navigate('ContactUs', {data: this.state.data});
                    }
                  }}
                  key={index}
                  style={styles.flatListStyle}>
                  <Text style={styles.titleLabel}>{item.title}</Text>
                  <Text style={styles.subtitleLabel}>{item.subtitle}</Text>
                  <Image source={item.chevron} style={styles.chevronStyle} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={{justifyContent: 'center'}}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {} = state.dashboardState;
  return {};
};

const mapDispatchToProps = (dispatch: (...any) => void) => ({
  dispatch,
  resetProperties: () => {
    dispatch(resetProperties());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
