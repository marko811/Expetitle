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
import {Images} from '../../utils';
import {ExpApi} from '../../services/';
import styles from './styles';

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      newPasswordEmpty: false,
      confirmPasswordEmpty: false,
      passwordMatched: false,
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

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  saveChanges = async () => {
    const {newPassword, confirmPassword, token, showIndicator} = this.state;
    if (newPassword.length == 0) {
      this.setState({newPasswordEmpty: true});
    }
    if (confirmPassword.length == 0) {
      this.setState({confirmPasswordEmpty: true});
    }
    if (newPassword === confirmPassword) {
      this.setState({passwordMatched: true});
    } else {
      alert('Password does not match!');
    }
    if (newPassword.length !== 0 && confirmPassword.length !== 0) {
      this.setState({showIndicator: true});
      var data = {
        password: confirmPassword,
      };
      ExpApi.UpdateProfile(data, token, {})
        .then(response => {
          if (response.status === 200) {
            this.setState({
              newPassword: '',
              confirmPassword: '',
              showIndicator: false,
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
      <View style={{backgroundColor: '#f6f8fd', flex: 1}}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <AppHeader
          onPressLeft={() => this.props.navigation.goBack()}
          title={'Password'}
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
          <Text style={styles.fullNameLables}>New Password</Text>
          <TextInput
            placeholder={'New Password'}
            placeholderTextColor={'#bcbcbc'}
            value={this.state.newPassword}
            style={styles.textInput}
            secureTextEntry={true}
            maxLength={40}
            onChangeText={text => {
              this.setState({newPassword: text});
              if (this.state.newPassword.length > 1) {
                this.setState({newPasswordEmpty: false});
              }
            }}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              this.confirmPassword.focus();
            }}
          />
          {this.state.newPasswordEmpty && this.emptyFieldWarning()}

          <Text style={styles.fullNameLables}>Confirm Password</Text>
          <TextInput
            ref={ref => {
              this.confirmPassword = ref;
            }}
            placeholder={'Confirm Password'}
            placeholderTextColor={'#bcbcbc'}
            value={this.state.confirmPassword}
            style={styles.textInput}
            secureTextEntry={true}
            maxLength={40}
            onChangeText={text => {
              this.setState({confirmPassword: text});
              if (this.state.confirmPassword.length > 1) {
                this.setState({confirmPasswordEmpty: false});
              }
            }}
            returnKeyType={'done'}
          />
          {this.state.confirmPasswordEmpty && this.emptyFieldWarning()}

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

export default Password;
