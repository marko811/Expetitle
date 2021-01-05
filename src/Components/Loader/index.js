import React from 'react';
import {View, ActivityIndicator, Modal, Image} from 'react-native';
import styles from './styles';
import {Images, Colors} from '../../utils';
export default Loader = props => {
  return (
    <Modal visible={props.isVisible} transparent>
      <View style={[styles.container, props.style]}>
        {props.hide ? (
          <View />
        ) : (
          <Image style={styles.loaderImage} source={Images.loader} />
        )}
      </View>
    </Modal>
  );
};