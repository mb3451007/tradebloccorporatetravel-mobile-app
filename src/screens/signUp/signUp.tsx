/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import commonStyles from '@src/utility/commonStyles';
import appConstants, {validations} from '@src/constants/appConstants';
import CustomTextInput from '@src/components/customTextInput(auth)/customTextInput';
import CustomButton from '@src/components/customButton/customButton';
import regex from '@src/utility/regex';
import {Icons, Images} from '@src/assets';
import colors from '@src/constants/colors';
import CustomBackButton from '@src/components/customBackButton/customBackButton';
import navigationConstants from '@src/constants/navigationConstants';
import {navigate} from '@src/navigation/navigationMethods';
import {handleSignUp} from '@src/utility/aws/awsAuth';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import CustomLoader from '@src/components/customLoader/customLoader';

const SignUp = () => {
  const navigation = useNavigation();
  const loading = useSelector((state: RootState) => state.signUp.isLoading);
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userEamilError, setUserEmailError] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordError, setUserPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmID, setConfirmID] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //Method to clear the state on blur..
  const handleClearState = () => {
    setUserEmail('');
    setUserName('');
    setUserPassword('');
    setConfirmPassword('');
    setConfirmID(false);
    setConfirmPasswordError('');
    setUserEmailError('');
    setUserPasswordError('');
    setUserNameError('');
  };

  // Hook to clear the state data..
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', handleClearState);
    return () => unsubscribe();
  }, []);

  // hook for loader..
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  //Method to validate username..
  const handleUserName = (value: string) => {
    if (value === '') {
      setUserNameError(validations.enterName);
      setUserName(value);
      return;
    }
    if (value.length <= 3) {
      setUserNameError(validations.shortName);
      setUserName(value);
      return;
    }
    setUserNameError('');
    setUserName(value);
  };

  // Method to validate userEmail id..
  const handleUserEmail = (value: string) => {
    if (value === '') {
      setUserEmailError(validations.enterEmail);
      setUserEmail(value);
      return;
    }

    if (!regex.emailRegex.test(value)) {
      setUserEmailError(validations.enterValidEmail);
      setUserEmail(value);
      setConfirmID(false);
      return;
    } else {
      setConfirmID(true);
    }

    setUserEmailError('');
    setUserEmail(value);
  };

  // Method to validate password..
  const handleUserPassword = (value: string) => {
    if (value === '') {
      setUserPasswordError(validations.enterPassword);
      setUserPassword(value);
      return;
    }
    if (regex.passwordRegex.test(value) === false) {
      setUserPasswordError(validations.passwordMustBe);
      setUserPassword(value);
      return;
    }
    setUserPasswordError('');
    setUserPassword(value);
  };

  // Method to validate confirm password..
  const handleConfirmPassword = (value: string) => {
    if (value === '') {
      setConfirmPasswordError(validations.enterConfirmPassword);
      setConfirmPassword(value);
      return;
    }
    if (value !== userPassword) {
      setConfirmPasswordError(validations.passwordAndConfirmPasswordSame);
      setConfirmPassword(value);
      return;
    }
    setConfirmPasswordError('');
    setConfirmPassword(value);
  };

  // Method for submit button..
  const onPressedSignupButtonClicked = () => {
    setIsLoading(true);
    if (userName === '') {
      setUserNameError(validations.enterName);
      setIsLoading(false);
      return;
    } else if (userNameError) {
      setUserNameError(userNameError);
      setIsLoading(false);
    } else if (userEmail === '') {
      setUserEmailError(validations.enterEmail);
      setIsLoading(false);
      return;
    } else if (userEamilError) {
      setUserEmailError(userEamilError);
      setIsLoading(false);
    } else if (userPassword === '') {
      setConfirmPasswordError(validations.enterPassword);
      setIsLoading(false);
      return;
    } else if (userPasswordError) {
      setUserPasswordError(userPasswordError);
      setIsLoading(false);
    } else if (confirmPassword === '') {
      setConfirmPasswordError(validations.enterConfirmPassword);
      setIsLoading(false);
      return;
    } else if (confirmPassword !== userPassword) {
      setConfirmPasswordError(validations.passwordAndConfirmPasswordSame);
      setIsLoading(false);
      return;
    } else if (confirmPasswordError) {
      setConfirmPasswordError(confirmPasswordError);
      setIsLoading(false);
    } else {
      const userDetails = {
        username: userEmail.trim().toLowerCase(),
        password: userPassword,
        name: userName.trim(),
        signUpLoader: () => setIsLoading(false),
      };
      handleSignUp(userDetails);
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
          <Text style={commonStyles.signTextHeader}>{appConstants.signUp}</Text>
          <Text numberOfLines={2} style={commonStyles.signTextSubHeader}>
            {appConstants.findBestDeal}
          </Text>
          <View style={commonStyles.welcomeTextContainer}>
            <Text style={commonStyles.welcomeTextStyle}>
              {appConstants.welcomeTo}
            </Text>
            <View style={commonStyles.travelClubTextContainer}>
              <Text style={commonStyles.travelClubTextStyle}>
                {appConstants.travelClub}
                <Text style={commonStyles.iQTextStyle}>{appConstants.IQ}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <CustomTextInput
              source={Icons.signPerson}
              placeholder={appConstants.username}
              value={userName}
              onChangeText={handleUserName}
              error={userNameError}
              keyboardType={'default'}
              placeholderTextColor={colors.color_fff}
              inputstyle={styles.customInputStyle}
              inputIconStyle={styles.customInputIconStyle}
            />
            <CustomTextInput
              source={Icons.Email_LOGO}
              placeholder={appConstants.email}
              onChangeText={handleUserEmail}
              value={userEmail}
              keyboardType={'email-address'}
              error={userEamilError}
              placeholderTextColor={colors.color_fff}
              inputstyle={styles.customInputStyle}
              inputIconStyle={styles.customInputIconStyle}
              confirm={confirmID}
            />
            <CustomTextInput
              source={Icons.LOCK_LOGO}
              placeholder={appConstants.password}
              secureTextEntry={true}
              onChangeText={handleUserPassword}
              value={userPassword}
              error={userPasswordError}
              keyboardType={'default'}
              placeholderTextColor={colors.color_fff}
              inputstyle={styles.customInputStyle}
              inputIconStyle={styles.customInputIconStyle}
            />
            <CustomTextInput
              source={Icons.LOCK_LOGO}
              placeholder={appConstants.confirmPassword}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={handleConfirmPassword}
              keyboardType={'default'}
              placeholderTextColor={colors.color_fff}
              error={confirmPasswordError}
              inputstyle={styles.customInputStyle}
              inputIconStyle={styles.customInputIconStyle}
            />
          </View>
          <CustomButton
            label={appConstants.signUp}
            onPress={() => {
              onPressedSignupButtonClicked();
            }}
          />
          <View
            style={[
              commonStyles.accountTagLineContainer,
              styles.accountTagCustomStyle,
            ]}>
            <Text style={commonStyles.accountTextStyle}>
              {appConstants.alreadyHaveAccount}
            </Text>
            <Text
              onPress={() => navigate(navigationConstants.LOGIN)}
              style={commonStyles.signNowTextStyle}>
              {appConstants.signInNow}
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>

      {isLoading && <CustomLoader isLoading={isLoading} />}
    </>
  );
};

export default SignUp;
