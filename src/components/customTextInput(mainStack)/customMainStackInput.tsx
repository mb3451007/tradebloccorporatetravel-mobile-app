/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import appConstants from '@src/constants/appConstants';

interface customMainStackInputProps {
  mainContainerCustomStyle?: object;
  label: string;
  textInputCustomStyle?: any;
  source?: any;
  error?: string;
  errorLabelCustomStyle?: any;
  value: any;
  onChangeText?: any;
  rightIconOnPress?: any;
  onFocus?: any;
  isFromLoading?: boolean;
  isToLoading?: boolean;
  leftIcon?: any;
  leftIconOnPress?: any;
  rightIconTintColor?: any;
  customRightIconStyle?: any;
  flag?: any;
  countryCode?: any;
  keyboardType?: any;
  placeholder?: any;
  placeholderTextColor?: any;
  headerLabelStyle?: any;
  onKeyPress?: any;
  leftIconTintColor?: any;
  leftIcon2?: any;
  leftIcon3?: any;
  maxlength?: any;
  customFlagStyle?: any;
  leftIconStyle?: any;
  editable?:any;
}

// custom textinput used in main stack flow on home screen etc..
const CustomMainStackInput = (props: customMainStackInputProps) => {
  const {
    mainContainerCustomStyle,
    label,
    textInputCustomStyle,
    source,
    error,
    errorLabelCustomStyle,
    value,
    onChangeText,
    rightIconOnPress,
    onFocus,
    leftIcon,
    leftIconOnPress,
    rightIconTintColor,
    customRightIconStyle,
    flag,
    countryCode,
    keyboardType,
    placeholder,
    placeholderTextColor,
    headerLabelStyle,
    onKeyPress,
    leftIconTintColor,
    leftIcon2,
    leftIcon3,
    maxlength,
    customFlagStyle,
    leftIconStyle,
    editable,
  } = props;
  
  return (
    <>
      <View style={[styles.MainContainer, {...mainContainerCustomStyle}]}>
        <Text style={[styles.labelStyle, {...headerLabelStyle}]}>{label}</Text>
        <View style={styles.inputContainer}>
          {leftIcon ? (
            <TouchableOpacity
              activeOpacity={appConstants.activeOpacity}
              style={styles.rightIconContainerStyle}
              onPress={leftIconOnPress}>
              {flag === '' || countryCode === '' ? (
                <Image
                  tintColor={leftIconTintColor}
                  style={[styles.dropDownStyle, {...leftIconStyle}]}
                  source={leftIcon}
                />
              ) : (
                <>
                  <Image
                    style={[styles.flagStyle, {...customFlagStyle}]}
                    source={{uri: flag}}
                  />
                  <Image
                    tintColor={leftIconTintColor}
                    style={styles.dropDownStyle}
                    source={leftIcon}
                  />
                </>
              )}
            </TouchableOpacity>
          ) : null}
          {leftIcon2 ? (
            <TouchableOpacity
              activeOpacity={appConstants.activeOpacity}
              style={styles.rightIconContainerStyle}
              onPress={leftIconOnPress}>
              {flag === '' || countryCode === '' ? (
                <View style={styles.leftIconViewStyle}>
                  <Image
                    style={styles.dropDownStyleforFlag}
                    source={leftIcon2}
                  />
                  <Image style={styles.dropDownStyle} source={leftIcon3} />
                </View>
              ) : (
                <View style={styles.leftIconViewStyle}>
                  <Text style={styles.countryCodeStyle}>{`${flag}`}</Text>
                  <Image style={styles.dropDownStyle2} source={leftIcon3} />
                </View>
              )}
            </TouchableOpacity>
          ) : null}
          <TextInput
            style={[styles.textInputStyle, {...textInputCustomStyle}]}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onKeyPress={onKeyPress}
            maxLength={maxlength}
            editable={editable === false ? false : true}
          />
          {source ? (
            <TouchableOpacity
              activeOpacity={appConstants.activeOpacity}
              onPress={rightIconOnPress}>
              <Image
                style={[
                  styles.calendarStyle,
                  {...customRightIconStyle},
                  {tintColor: rightIconTintColor},
                ]}
                source={source}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <Text style={[styles.errorLabel, {...errorLabelCustomStyle}]}>
        {error}
      </Text>
    </>
  );
};

export default CustomMainStackInput;
