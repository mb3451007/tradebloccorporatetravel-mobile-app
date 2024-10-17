/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState, useRef} from 'react';
import {
  StatusBar,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import commonStyles from '@src/utility/commonStyles';
import colors from '@src/constants/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Images} from '@src/assets';
import CustomBackButton from '@src/components/customBackButton/customBackButton';
import appConstants, {validations} from '@src/constants/appConstants';
import styles from './styles';
import {back} from '@src/navigation/navigationMethods';
import navigationConstants from '@src/constants/navigationConstants';
import CustomButton from '@src/components/customButton/customButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Snackbar from 'react-native-snackbar';
import {handleconfirmSignUp} from '@src/utility/aws/awsAuth';
import {resendConfirmationCode} from '@src/utility/aws/awsAuth';
import {useNavigation} from '@react-navigation/native';

const OTP = (props: any) => {
  const otpRef: any = useRef();
  const navigation = useNavigation();
  const email: string = props?.route?.params?.email;
  const parent = props?.route?.params?.parent;
  const [showOTPTimer, setShowOTPTimer] = useState(false);
  const [OTP, setOTP] = useState<any>('');
  const [count, setCount] = useState(59);

  // AWS resend otp method..
  const onResendCode = () => {
    if (parent === navigationConstants.LOGIN) {
      resendConfirmationCode(email);
    }
  };

  // Method to clear the state..
  useEffect(() => {
    setTimeout(() => otpRef.current.focusField(0), 250);
    const unsubscribe = navigation.addListener('focus', onResendCode);
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Method on submit button..
  const handleOnSubmit = () => {
    if (OTP === '') {
      Snackbar.show({
        text: validations.enterOTP,
        backgroundColor: colors.color_red,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (OTP.length !== 6) {
      Snackbar.show({
        text: validations.enterValidOTP,
        backgroundColor: colors.color_red,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      const data = {
        username: email,
        code: OTP,
      };
      if (parent === navigationConstants.LOGIN) {
        handleconfirmSignUp(data);
        return;
      } else {
        handleconfirmSignUp(data);
      }
    }
  };

  const handleResendButton = () => {
    if (email) {
      setCount(59);
      setShowOTPTimer(true);
      resendConfirmationCode(email);
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
          <CustomBackButton onPress={() => back()} />
          <Text style={styles.OTPTextHeader}>{appConstants.OTPverify}</Text>
          <Text style={styles.OTPTextSubHeader}>
            {appConstants.weHaveSentOTP}
          </Text>
          <OTPInputView
            ref={otpRef}
            style={styles.otpInputFields}
            pinCount={6}
            onCodeChanged={(text: any) => setOTP(text)}
            codeInputFieldStyle={styles.codeInputFiledStyle}
            keyboardType="phone-pad"
            autoFocusOnLoad={false}
            editable={true}
          />
          <View style={styles.notRecieveOTPstyle}>
            <Text style={styles.notReceiveOTPText}>
              {appConstants.notReceiveOTP}
            </Text>
            {showOTPTimer ? (
              <Text style={styles.timerStyle}>
                {`${appConstants.zero}${appConstants.zero}`}:
                {count < 10 ? `${appConstants.zero}${count}` : `${count}`}
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
        </KeyboardAwareScrollView>
        <CustomButton
          buttonStyle={styles.submitButton}
          label={appConstants.submit}
          onPress={handleOnSubmit}
        />
      </ImageBackground>
    </>
  );
};

export default OTP;
