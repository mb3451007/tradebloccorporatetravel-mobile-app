/* eslint-disable prettier/prettier */
import React from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import appConstants from '@src/constants/appConstants';
import {Icons} from '@src/assets';
interface CustomModalProps {
  label?: any;
  onPress?: any;
}

const CustomModal = (props: CustomModalProps) => {
  const {onPress, label} = props;
  return (
    <Modal animationType="fade" transparent={true} statusBarTranslucent={true}>
      <View style={styles.mainContainer}>
        <View style={styles.errorContainerStyle}>
          <Image source={Icons.REDCROSS} />

          <Text style={styles.errorTextStyle}>{appConstants.error}</Text>

          <Text style={styles.detailedTextStyle} numberOfLines={3}>
            {label}
          </Text>

          <TouchableOpacity
            activeOpacity={appConstants.activeOpacity}
            onPress={onPress}
            style={styles.tryAgainButtonStyle}>
            <Text style={styles.tryAgainTextStyle}>
              {appConstants.tryAgain}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
