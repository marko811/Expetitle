import React from 'react';
import {View, StatusBar, Text, TouchableOpacity, Image} from 'react-native';
import AppHeader from '../../Components/AppHeader/index';
import styles from './styles';
import {Images} from '../../utils';

class Sent extends React.Component {
  render() {
    return (
      <View style={styles.sentContainer}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <AppHeader
          title={'Share Update'}
          onPressLeft={() =>
            this.props.navigation.navigate('TransactionDetail')
          }
        />
        <Image source={Images.updateSent} style={styles.sentImage} />
        <Text allowFontScaling={false} style={styles.sentText}>
          Your update has{`\n`} been sent!
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('TransactionDetail')}
          style={styles.sentButtonView}>
          <Text allowFontScaling={false} style={styles.sentBackText}>
            Back to Property Page
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Sent;
