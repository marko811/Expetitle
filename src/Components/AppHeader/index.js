import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Images} from '../../utils';
const AppHeader = ({
  showLeftIcon = true,
  title,
  rightIcon,
  rightIconStyle,
  onPressLeft,
  onPressRight,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftIconContainer}>
        {showLeftIcon ? (
          <TouchableOpacity
            onPress={onPressLeft}
            style={styles.leftIconContainer}>
            <Image style={styles.leftIcon} source={Images.left} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={styles.headerTitle}>
        {title}
      </Text>
      <View style={styles.rightIconContainer}>
        {rightIcon ? (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onPressRight}>
            <Image style={rightIconStyle} source={rightIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
export default AppHeader;
