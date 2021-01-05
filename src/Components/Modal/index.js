import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles.js';

const ExpeModal = ({
  children,
  icon,
  title,
  content,
  onModalWillHide,
  ...props
}) => {
  return (
    <Modal {...props}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {icon && (
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          )}
          {title && <Text style={styles.title}>{title}</Text>}
          {content.length > 0 &&
            content.map(i => <Text style={styles.content}>{i}</Text>)}
          {children}
          <TouchableOpacity onPress={() => onModalWillHide()}>
            <Text style={styles.closeText}>{'Close'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExpeModal;
