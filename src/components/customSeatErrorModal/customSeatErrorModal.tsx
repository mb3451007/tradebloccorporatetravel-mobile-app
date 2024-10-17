/* eslint-disable prettier/prettier */
import React from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import appConstants from '@src/constants/appConstants';
import {Icons} from '@src/assets';
import colors from '@src/constants/colors';
interface CustomModalProps {
  label?: any;
  onPressCancel?: any;
  onPressOk: any;
}

const CustomSeatErrorModal = (props: CustomModalProps) => {
  const {onPressCancel, label, onPressOk} = props;
  return (
    <Modal animationType="fade" transparent={true} statusBarTranslucent={true}>
      <View style={styles.mainContainer}>
        <View style={styles.errorContainerStyle}>
          <Image source={Icons.SELECTED_SEAT} />

          <Text style={styles.errorTextStyle}>{appConstants.welcome}</Text>

          <Text style={styles.detailedTextStyle} numberOfLines={3}>
            {label}
          </Text>

          <View style={styles.buttonContainerStyle}>
            <TouchableOpacity
              activeOpacity={appConstants.activeOpacity}
              onPress={onPressCancel}
              style={styles.tryAgainButtonStyle}>
              <Text style={styles.tryAgainTextStyle}>
                {appConstants.cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={appConstants.activeOpacity}
              onPress={onPressOk}
              style={[
                styles.tryAgainButtonStyle,
                {backgroundColor: colors.color_17C954},
              ]}>
              <Text style={styles.tryAgainTextStyle}>{appConstants.ok}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomSeatErrorModal;
