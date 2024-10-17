/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  KeyboardTypeOptions,
  View,
  Text,
  Image,
  ImageSourcePropType,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { Icons } from '@src/assets';
import colors from '@src/constants/colors';

//types of props used..
interface CustomTextInputProps {
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  onChangeText: any;
  error: string;
  inputstyle?: any;
  source: ImageSourcePropType;
  placeholderTextColor: string;
  secureTextEntry?: boolean;
  show?: boolean;
  onCrossPress?: (event: GestureResponderEvent) => void;
  value: any;
  city?: string;
  isLoading?: boolean;
  inputIconStyle?: any;
  inputContainerStyle?: any;
  confirm?: any;
}

// custom textinput used in authentication flow of project..
const CustomTextInput = (props: CustomTextInputProps) => {
  const {
    placeholder,
    keyboardType,
    onChangeText,
    error,
    inputstyle,
    source,
    placeholderTextColor,
    secureTextEntry,
    show = false,
    onCrossPress,
    value,
    city,
    isLoading = false,
    inputIconStyle,
    inputContainerStyle,
    confirm,
  } = props;
  const [isVisible, setIsVisible] = useState(true);
  return (
    <View style={[styles.container, { ...inputContainerStyle }]}>
      <View style={[styles.inputContainer, { ...inputstyle }]}>
        {source ? (
          <Image
            style={[styles.iconStyle, { ...inputIconStyle }]}
            source={source}
          />
        ) : null}
        {show && (
          <View style={styles.selectedCityContainer}>
            <Text style={styles.selectedCityText}>{city}</Text>
            <TouchableOpacity onPress={onCrossPress}>
              <Image
                style={styles.selectedCityLogo}
                source={Icons.CANCEL_LOGO}
              />
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          style={styles.inputBox}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry ? isVisible : false}
          keyboardType={keyboardType}
        />
        {confirm ? <Image style={styles.confrimIcon} source={Icons.CONFIRM_LOGO} /> : null}
        {secureTextEntry ? (
          <CustomEye setIsVisible={setIsVisible} isVisible={isVisible} />
        ) : (
          false
        )}

        {/* chlid component for secure text entry(password) */}
        {isLoading && (
          <ActivityIndicator
            color={colors.color_darkBlue}
            size={'large'}
            animating={isLoading}
          />
        )}
      </View>
      <Text style={styles.errorTextStyle}>{error}</Text>
    </View>
  );
};

// custom hide and show eye for password inputs...
const CustomEye = (props: any) => {
  const { isVisible, setIsVisible } = props;
  return (
    <>
      {isVisible ? (
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Image style={styles.hideIconStyle} source={Icons.SHOWEYE_LOGO} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image style={styles.hideIconStyle} source={Icons.HIDEEYE_LOGO} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default CustomTextInput;
