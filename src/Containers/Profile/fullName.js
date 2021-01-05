import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import AppHeader from '../../Components/AppHeader/index';
import AsyncStorage from '@react-native-community/async-storage';
import {ExpApi} from '../../services/';
import {Images} from '../../utils';
import styles from './styles';

class FullName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.route.params.data[0].firstName,
      lastName: this.props.route.params.data[0].lastName,
      firstNameEmpty: false,
      lastNameEmpty: false,
      modalVisible: false,
      token: '',
      showIndicator: false,
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
  }

  componentWillUnmount() {
    const {params} = this.props.route;
    params.profile();
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  saveChanges = () => {
    const {firstName, lastName, token} = this.state;
    if (firstName.length == 0) {
      this.setState({firstNameEmpty: true});
    }
    if (lastName.length == 0) {
      this.setState({lastNameEmpty: true});
    }
    if (firstName.length !== 0 && lastName.length !== 0) {
      this.setState({showIndicator: true});
      var data = {
        firstName: firstName,
        lastName: lastName,
      };
      ExpApi.UpdateProfile(data, token, {})
        .then(response => {
          if (response.status === 200) {
            this.setState({
              firstName: response.data.data.user.firstName,
              lastName: response.data.data.user.lastName,
            });
            this.setModalVisible(true);
            if (this.state.modalVisible === true) {
              setTimeout(() => {
                this.setState({modalVisible: false});
              }, 3000);
            }
          } else {
            alert(
              'We have Unexpected Error ' +
                JSON.stringify(response.status) +
                ', Kindly Contact Support',
            );
          }
          this.setState({showIndicator: false});
        })
        .catch(error => {
          alert(
            'We have Unexpected Error ' +
              JSON.stringify(error.response.status) +
              ', Kindly Contact Support',
          );
          this.setModalVisible(false);
          this.setState({showIndicator: false});
        });
    }
  };

  emptyFieldWarning = () => {
    return (
      <View style={styles.warningView}>
        <Image source={Images.warn} style={styles.warnImage} />
        <Text style={styles.warnText}> Input required</Text>
      </View>
    );
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View style={{backgroundColor: '#F6F8FD', flex: 1}}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <AppHeader
          title={'Full Name'}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={Images.tick2}
                  style={{height: 120, width: 120, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'Roboto-Medium',
                    color: '#2b3d5b',
                  }}>
                  Saved!
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={{padding: 20, top: 40}}>
          <Text style={styles.fullNameLables}>First Name</Text>
          <TextInput
            placeholder={'First Name'}
            placeholderTextColor={'#bcbcbc'}
            value={this.state.firstName}
            style={styles.textInput}
            maxLength={40}
            onChangeText={text => {
              this.setState({firstName: text});
              if (this.state.firstName.length > 1) {
                this.setState({firstNameEmpty: false});
              }
            }}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              this.lastName.focus();
            }}
          />
          {this.state.firstNameEmpty && this.emptyFieldWarning()}

          <Text style={styles.fullNameLables}>Last Name</Text>
          <TextInput
            ref={ref => {
              this.lastName = ref;
            }}
            placeholder={'Last Name'}
            placeholderTextColor={'#bcbcbc'}
            value={this.state.lastName}
            style={styles.textInput}
            maxLength={40}
            onChangeText={text => {
              this.setState({lastName: text});
              if (this.state.lastName.length > 1) {
                this.setState({lastNameEmpty: false});
              }
            }}
            returnKeyType={'done'}
          />
          {this.state.lastNameEmpty && this.emptyFieldWarning()}

          <TouchableOpacity
            onPress={() => this.saveChanges()}
            style={styles.fullNameButton}>
            {this.state.showIndicator === true ? (
              <ActivityIndicator color={'#FFF'} size={'large'} />
            ) : (
              <Text style={styles.fullNameButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default FullName;
