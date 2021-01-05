import React from 'react';
import {Image} from 'react-native';
import CheckBox from 'react-native-check-box';
import {Images} from '../../utils';
import styles from './styles';

const ExpCheckBox = ({checked, ...props}) => {
  return (
    <CheckBox
      isChecked={checked}
      checkedImage={<Image source={Images.check} style={styles.checkboxIcon} />}
      unCheckedImage={
        <Image source={Images.uncheck} style={styles.checkboxIcon} />
      }
      rightTextStyle={styles.label}
      leftTextStyle={styles.label}
      {...props}
    />
  );
};

export default ExpCheckBox;
