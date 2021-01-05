import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
export default class AppButton extends React.Component {
  render() {
    return (
      <View
      allowFontScaling={false}
        style={[
          styles.buttonMainContainer,
          this.props.buttonMainContainerStyles,
        ]}>
        <TouchableOpacity
          onPress={this.props.onPress}
          style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>{this.props.label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
