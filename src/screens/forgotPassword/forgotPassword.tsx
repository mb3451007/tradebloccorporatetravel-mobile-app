/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import commonStyles from '@src/utility/commonStyles';
import colors from '@src/constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icons, Images } from '@src/assets';
import CustomBackButton from '@src/components/customBackButton/customBackButton';
import appConstants, { validations } from '@src/constants/appConstants';
import { navigate } from '@src/navigation/navigationMethods';
import navigationConstants from '@src/constants/navigationConstants';
import CustomTextInput from '@src/components/customTextInput(auth)/customTextInput';
import CustomButton from '@src/components/customButton/customButton';
import regex from '@src/utility/regex';
import { handleResetPassword } from '@src/utility/aws/awsAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';
import CustomLoader from '@src/components/customLoader/customLoader';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmID, setConfirmID] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loading = useSelector((state: RootState) => state.login.isLoading);

  // Hook for loader..
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleOnChangeEmail = (value: string) => {
    const updatedValue = value.trim();
    if (updatedValue === '') {
      setEmailError(validations.enterEmail);
      setEmail(updatedValue);
      return;
    }

    if (!regex.emailRegex.test(updatedValue)) {
      setEmailError(validations.enterValidEmail);
      setEmail(updatedValue);
      setConfirmID(false);
      return;
    } else {
      setConfirmID(true);
    }

    setEmailError('');
    setEmail(updatedValue);
  };

  const handleOnSubmitEmail = () => {
    setIsLoading(true);
    if (email === '') {
      setEmailError(validations.enterEmail);
      setIsLoading(false);
    } else if (emailError) {
      setEmailError(emailError);
      setIsLoading(false);
    } else {
      const data = {
        username: email.toLowerCase(),
        forgotPassLoader: () => setIsLoading(false),
      };
      handleResetPassword(data);
    }
  };

  return (
    <>
      <StatusBar translucent={true} backgroundColor={colors.transparent} />
      <ImageBackground
        style={commonStyles.backgroundImage}
        source={Images.App_SiGNIN_BG}>
        <KeyboardAwareScrollView
          contentContainerStyle={commonStyles.keyboardAwareStyle}>
          <CustomBackButton
            onPress={() => navigate(navigationConstants.LOGIN)}
          />
          <Text style={styles.findAccTextHeader}>
            {appConstants.findAcount}
          </Text>
          <Text style={styles.findAccTextSubHeader}>
            {appConstants.enterEmail}
          </Text>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTextStyle}>
              {appConstants.welcomeTo}
            </Text>
            <View style={styles.travelClubTextContainer}>
              <Text style={styles.travelClubTextStyle}>
                {appConstants.travelClub}
              </Text>
              <Text style={styles.iQTextStyle}>{appConstants.IQ}</Text>
            </View>
          </View>
          <CustomTextInput
            source={Icons.Email_LOGO}
            inputstyle={styles.emailInputStyle}
            placeholder={appConstants.email}
            placeholderTextColor={colors.color_fff}
            keyboardType="email-address"
            value={email}
            onChangeText={handleOnChangeEmail}
            error={emailError}
            confirm={confirmID}
          />
        </KeyboardAwareScrollView>
        <CustomButton
          label={appConstants.submit}
          onPress={handleOnSubmitEmail}
          buttonStyle={styles.submitButtonStyle}
        />
      </ImageBackground>
      {isLoading && <CustomLoader isLoading={isLoading} />}
    </>
  );
};

export default ForgotPassword;
