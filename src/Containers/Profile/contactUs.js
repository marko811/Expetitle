import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import {ExpApi} from '../../services/';
import AppHeader from '../../Components/AppHeader/index';
import {Images} from '../../utils';
import styles from './styles';

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      fullName: '',
      subject: '',
      message: '',
      fullNameEmpty: false,
      subjectEmpty: false,
      messageEmpty: false,
      modalVisible: false,
      showIndicator: false,
      openSubject: false,
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

  dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${7864002539}';
    } else {
      phoneNumber = 'telprompt:${7864002539}';
    }
    Linking.openURL(phoneNumber);
  };

  contactUs = () => {
    const {subject, message, token} = this.state;
    const {email, firstName, lastName} = this.props.route.params.data[0];
    if (subject.length == 0) {
      this.setState({subjectEmpty: true});
    }
    if (message.length == 0) {
      this.setState({messageEmpty: true});
    }
    if (subject.length !== 0 && message.length !== 0) {
      this.setState({showIndicator: true});
      var data = {
        message: message,
        subject: subject,
        fromEmail: email,
        firstName: firstName,
        lastName: lastName,
      };
      ExpApi.ContactUs(data, token, {})
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            this.setModalVisible(true);
            if (this.state.modalVisible === true) {
              setTimeout(() => {
                this.setState({modalVisible: false});
              }, 3000);
            }
            this.setState({subject: '', message: ''});
          } else {
            alert(response.data.message);
          }
          this.setState({showIndicator: false});
        })
        .catch(error => {
          this.setState({showIndicator: false});
          this.setModalVisible(false);
          alert(
            'We have Unexpected Error ' +
              JSON.stringify(error.response.status) +
              ', Kindly Contact Support',
          );
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
          showLeftIcon
          showRightIcon={styles.rightIconStyle}
          Label={'Contact Us'}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image source={Images.tick} style={styles.contactUsModalImage} />
              <Text style={styles.contactUsModalText}>
                Your message was sent!
              </Text>
            </View>
          </View>
        </Modal>
        <ScrollView contentContainerStyle={styles.contactUsScrollView}>
          <Text style={styles.fullNameLables}>Subject</Text>
          {this.state.openSubject === true ? (
            <View>
              <TextInput
                placeholder={'Subject'}
                placeholderTextColor={'#bcbcbc'}
                value={this.state.subject}
                style={styles.textInput}
                maxLength={60}
                onChangeText={text => {
                  this.setState({subject: text});
                  if (this.state.subject.length > 1) {
                    this.setState({subjectEmpty: false});
                  }
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.message.focus();
                }}
              />
              {this.state.subjectEmpty && this.emptyFieldWarning()}
            </View>
          ) : (
            <DropDownPicker
              items={[
                {
                  label: 'I have a question about my closing',
                  value: 'I have a question about my closing',
                },
                {
                  label: 'I cant find some information',
                  value: 'I cant find some information',
                },
                {
                  label: 'I’m reporting a bug I found in the app',
                  value: 'I’m reporting a bug I found in the app',
                },
                {
                  label: 'I have a problem with the app',
                  value: 'I have a problem with the app',
                },
                {label: 'Other', value: 'Other'},
              ]}
              placeholder="Subject"
              containerStyle={{
                height: 50,
                marginBottom: 20,
              }}
              placeholderStyle={{
                color: '#bcbcbc',
                fontFamily: 'Roboto-Light',
                fontSize: 16,
              }}
              labelStyle={{
                color: '#000',
                fontFamily: 'Roboto-Light',
                fontSize: 16,
              }}
              dropDownStyle={{
                backgroundColor: '#fafafa',
              }}
              style={{backgroundColor: '#FFF'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => {
                if (item.value === 'Other') {
                  this.setState({openSubject: true, subject: ''});
                } else {
                  this.setState({subject: item.value});
                }
              }}
            />
          )}
          <Text style={styles.fullNameLables}>Body</Text>
          <TextInput
            ref={ref => {
              this.message = ref;
            }}
            placeholder={'Type your message'}
            placeholderTextColor={'#bcbcbc'}
            value={this.state.message}
            multiline={true}
            style={styles.textInputMessage}
            maxLength={500}
            onChangeText={text => {
              this.setState({message: text});
              if (this.state.message.length > 1) {
                this.setState({messageEmpty: false});
              }
            }}
            returnKeyType={'done'}
          />
          {this.state.messageEmpty && this.emptyFieldWarning()}

          <TouchableOpacity
            onPress={() => this.contactUs()}
            style={styles.fullNameButton}>
            {this.state.showIndicator === true ? (
              <ActivityIndicator color={'#FFF'} size={'large'} />
            ) : (
              <Text style={styles.fullNameButtonText}>Send</Text>
            )}
          </TouchableOpacity>
          <View style={{top: 50}}>
            <Text style={styles.contactUsAddress}>
              Address: 400 NW 26 St, Miami, FL 33127
            </Text>
            <TouchableOpacity onPress={() => this.dialCall()}>
              <Text style={styles.contactUsAddress}>Call: 786-400-2539</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 200}} />
        </ScrollView>
      </View>
    );
  }
}

export default ContactUs;
