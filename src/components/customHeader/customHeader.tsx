/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  SafeAreaView,
} from 'react-native';
import styles from './styles';

// types of header props used..
interface CustomHeaderProps {
  leftIcon?: any;
  imageSource?: any;
  headerLabel?: string;
  rightIcon?: any;
  lefticonOnPress?: (event: GestureResponderEvent) => void;
  rightIconOnPress?: (event: GestureResponderEvent) => void;
  leftIconStyle?: object;
  headerLabelStyle?: object;
  rightIconStyle?: object;
  leftText?: any;
  headerContainerCustomStyle?: any;
}

// custom header of Home Screen..
const CustomHeader = (props: CustomHeaderProps) => {
  const {
    leftIcon,
    imageSource,
    headerLabel,
    rightIcon,
    lefticonOnPress,
    rightIconOnPress,
    leftIconStyle,
    headerLabelStyle,
    rightIconStyle,
    leftText,
    headerContainerCustomStyle,
  } = props;
  return (
    <SafeAreaView>
      <View
        style={[styles.HeaderContainerStyle, {...headerContainerCustomStyle}]}>
        <TouchableOpacity onPress={lefticonOnPress}>
          {leftText ? (
            <Text style={styles.leftTextStyle}>{leftText}</Text>
          ) : (
            <Image
              style={[styles.iconStyle, leftIconStyle]}
              source={leftIcon}
            />
          )}
        </TouchableOpacity>
        {imageSource ? (
          <Image style={styles.logoStyle} source={imageSource} />
        ) : (
          <Text style={headerLabelStyle}>{headerLabel}</Text>
        )}
        {rightIcon ? (
          <TouchableOpacity onPress={rightIconOnPress}>
            <Image style={rightIconStyle} source={rightIcon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyView} />
        )}
      </View>
    </SafeAreaView>
  );
};
export default CustomHeader;
