import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

export default (ErrorBox = ({imageSource, text, containerStyle}) => {
  return (
    <View style={[styles.mainView, containerStyle]}>
      <View style={styles.subView}>
        <Image source={imageSource} style={styles.imgStyle} />
        <Text style={styles.errorTextLogin}>{text}</Text>
      </View>
    </View>
  );
});
