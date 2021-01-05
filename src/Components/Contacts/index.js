import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import styles from './styles';
import {Images} from '../../utils';
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightIndex: '',
    };
  }
  openDialPad = phone => {
    Linking.openURL(`tel:${phone}`);
  };
  copyEmail = (email, index) => {
    this.setState({
      highlightIndex: index,
    });
    Clipboard.setString(email);
  };
  render() {
    return (
      <View style={styles.contactsContainer}>
        <View style={styles.contactsHeading}>
          <Image source={Images.ContactsList} style={styles.headerImage} />
          <Text allowFontScaling={false} style={styles.contactsHeadingText}>
            Contacts
          </Text>
        </View>
        <ScrollView nestedScrollEnabled style={styles.contactsListContainer}>
          {this.props.Contacts.map((contact, index) => {
            return (
              <View key={index} style={styles.contactsItem}>
                <Image style={styles.contactIcon} source={Images.Contacts} />
                <View style={styles.contactDetailContainer}>
                  <Text allowFontScaling={false} style={styles.contactName}>
                    {contact.User.name}
                  </Text>
                  <Text allowFontScaling={false} style={styles.contactRole}>
                    {contact.role}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.openDialPad(contact.User.phone)}>
                    <Text allowFontScaling={false} style={styles.contactPhone}>
                      {contact.User.phone}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    allowFontScaling={false}
                    onLongPress={() => {
                      this.copyEmail(contact.User.email, index),
                        this.props.showToast();
                    }}
                    style={
                      this.state.highlightIndex === index
                        ? styles.highlightEmail
                        : styles.contactEmail
                    }>
                    {contact.User.email}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Contacts;
