/* eslint-disable prettier/prettier */
import {Icons, Images} from '@src/assets';
import CustomBackButton from '@src/components/customBackButton/customBackButton';
import colors from '@src/constants/colors';
import navigationConstants from '@src/constants/navigationConstants';
import {navigate} from '@src/navigation/navigationMethods';
import commonStyles from '@src/utility/commonStyles';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import appConstants, {validations} from '@src/constants/appConstants';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomButton from '@src/components/customButton/customButton';
import CustomTextInput from '@src/components/customTextInput(auth)/customTextInput';
import regex from '@src/utility/regex';
import {handleResetPassword, handleConfirmResetPassword} from '@src/utility/aws/awsAuth';
import {useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import commonMethods from '@src/utility/commonMethods';
import CustomLoader from '@src/components/customLoader/customLoader';

const ResetPassword = (props: any) => {
  const email_ID = props.route.params?.username;
  const [OTP, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [count, setCount] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const loading = useSelector((state: RootState) => state.login.isLoading);
  const [showOTPTimer, setShowOTPTimer] = useState(false);

  // Hook for loader..
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  // Hook for Otp timer..
  useEffect(() => {
    const timer: any =
      count > 0 &&
      setInterval(() => {
        setCount(count - 1);
      }, 1000);
    if (count === 0) {
      setShowOTPTimer(false);
    }
    return () => clearInterval(timer);
  }, [count, showOTPTimer]);

  //Method for password input..
  const handleOnChangePassword = (text: string) => {
    if (text === '') {
      setPasswordError(validations.enterPassword);
      setPassword(text);
      return;
    }
    if (regex.passwordRegex.test(text) === false) {
      setPasswordError(validations.passwordMustBe);
      setPassword(text);
      return;
    }
    setPasswordError('');
    setPassword(text);
  };

  // Method for confirm password input..
  const handleOnChangeConfirmPassword = (text: string) => {
    if (text === '') {
      setConfirmPasswordError(validations.enterConfirmPassword);
      setConfirmPassword(text);
      return;
    }

    if (text !== password) {
      setConfirmPasswordError(validations.passwordAndConfirmPasswordSame);
      setConfirmPassword(text);
      return;
    }

    setConfirmPasswordError('');
    setConfirmPassword(text);
  };

  // Method for submit..
  const handleOnSubmit = () => {
    setIsLoading(true);
    if (OTP === '') {
      commonMethods.showSnackBar(validations.enterOTP, colors.color_red);
      setIsLoading(false);
    } else if (OTP.length !== 6) {
      commonMethods.showSnackBar(validations.enterValidOTP, colors.color_red);
      setIsLoading(false);
    } else if (password === '') {
      setPasswordError(validations.enterPassword);
      setIsLoading(false);
    } else if (passwordError) {
      setPasswordError(passwordError);
      setIsLoading(false);
    } else if (confirmPassword === '') {
      setConfirmPasswordError(validations.enterConfirmPassword);
      setIsLoading(false);
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(validations.passwordAndConfirmPasswordSame);
      setIsLoading(false);
      return;
    } else if (confirmPasswordError) {
      setConfirmPasswordError(confirmPasswordError);
      setIsLoading(false);
    } else {
      const data = {
        username: email_ID,
        code: OTP,
        newPassword: password,
        resetPassLoader: () => setIsLoading(false),
      };
      handleConfirmResetPassword(data);
    }
  };

  // method to resend the OTP code.
  const handleResendButton = () => {
    if (email_ID) {
      setCount(59);
      setShowOTPTimer(true);
      const data = {
        username: email_ID.toLowerCase(),
        forgotPassLoader: () => null,
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
            onPress={() => navigate(navigationConstants.FORGOT_PASSWORD)}
          />
          <Text style={styles.OTPTextHeader}>{appConstants.OTPverify}</Text>
          <Text style={styles.OTPTextSubHeader}>
            {appConstants.resetPasswordText}
          </Text>
          <View style={styles.codeHasSentTextContainer}>
            <Text style={styles.codeHasSentText}>
              {appConstants.codeHasSentTo}
            </Text>
            <Text style={styles.emailTextStyle}>{email_ID}</Text>
          </View>
          <OTPInputView
            style={styles.otpInputFields}
            pinCount={appConstants.six}
            onCodeChanged={text => setOTP(text)}
            codeInputFieldStyle={styles.codeInputFiledStyle}
            autoFocusOnLoad={true}
            keyboardType="phone-pad"
            editable={true}
          />
          <View style={styles.notRecieveOTPstyle}>
            <Text style={styles.notReceiveOTPText}>
              {appConstants.notReceiveOTP}
            </Text>
            {showOTPTimer ? (
              <Text style={styles.timerStyle}>
                {`${appConstants.zero}${appConstants.zero}`}:
                {count < appConstants.ten
                  ? `${appConstants.zero}${count}`
                  : `${count}`}
              </Text>
            ) : (
              <TouchableOpacity
                onPress={handleResendButton}
                style={styles.resendButton}>
                <Text style={styles.resendButtonLabel}>
                  {appConstants.resentOTP}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <CustomTextInput
            source={Icons.LOCK_LOGO}
            inputstyle={styles.inputFieldStyle}
            placeholder={appConstants.newPassword}
            placeholderTextColor={colors.color_fff}
            secureTextEntry={true}
            value={password}
            onChangeText={handleOnChangePassword}
            error={passwordError}
            keyboardType="default"
          />
          <CustomTextInput
            source={Icons.LOCK_LOGO}
            inputstyle={styles.passwordinputFieldStyle}
            placeholder={appConstants.confirmPassword}
            placeholderTextColor={colors.color_fff}
            value={confirmPassword}
            onChangeText={handleOnChangeConfirmPassword}
            error={confirmPasswordError}
            keyboardType="default"
            secureTextEntry={true}
          />
        </KeyboardAwareScrollView>

        <CustomButton
          buttonStyle={styles.submitButtonStyle}
          label={appConstants.submit}
          onPress={handleOnSubmit}
        />
      </ImageBackground>
      {isLoading && <CustomLoader isLoading={isLoading} />}
    </>
  );
};

export default ResetPassword;
