import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Moment from 'moment';
import * as _ from 'lodash';
import styles from './styles';

export default (PropertyItem = ({key, children, style, onPress}) => {
  return (
    <TouchableOpacity key={key} onPress={onPress} style={{width: '100%'}}>
      <View style={[styles.listItemContainer, style]}>{children}</View>
    </TouchableOpacity>
  );
});
