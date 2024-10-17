/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import 'aws-amplify/auth/enable-oauth-listener';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import CustomTextInput from '@src/components/customTextInput(auth)/customTextInput';
import appConstants, {validations} from '@src/constants/appConstants';
import CustomButton from '@src/components/customButton/customButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import regex from '@src/utility/regex';
import commonStyles from '@src/utility/commonStyles';
import {back, navigate} from '@src/navigation/navigationMethods';
import navigationConstants from '@src/constants/navigationConstants';
import {Icons, Images} from '@src/assets';
import colors from '@src/constants/colors';
import CustomSeparator from '@src/components/customSeparator/customSeparator';
import CustomLoginOption from '@src/components/customLoginOption/customLoginOption';
// import {signIn} from '@src/utility/aws/awsAuth';
import {handleSignIn} from '@src/utility/aws/awsAuth';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import CustomLoader from '@src/components/customLoader/customLoader';
import CustomBackButton from '@src/components/customBackButton/customBackButton';
import {useNavigation} from '@react-navigation/native';
import {Amplify} from 'aws-amplify';
import awsmobile from '@src/aws-exports';
import {signOut, signInWithRedirect, getCurrentUser} from 'aws-amplify/auth';
import {Hub} from '@aws-amplify/core';
// import {Hub} from '@aws-amplify/';
import {awsResponse} from './slice/awsLoginSlice';

// Amplify.configure(awsmobile);
const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmID, setConfirmID] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loading = useSelector((state: RootState) => state.login.isLoading);

  // const [user, setUser] = useState(null);
  // const [customState, setCustomState] = useState<string | null>(null);

  const awsLoginData = useSelector(
    (state: RootState) => state.awsLogin.awsResponse,
  );
  // console.log(awsLoginData, 'awslogindata-=-=-=-=-');
  const apiLoginData = useSelector((state: RootState) => state.login.loginData);
  // console.log(apiLoginData, 'apilogindata==--=-=');

  // Hook for loader..
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  // useEffect(() => {
  //   const unsubscribe = Hub.listen('auth', ({payload: {event, data}}) => {
  //     switch (event) {
  //       case 'signIn':
  //         setUser(data);
  //         break;
  //       case 'signOut':
  //         setUser(null);
  //         break;
  //       case 'customOAuthState':
  //         setCustomState(data);
  //     }
  //   });

  //   getUser();

  //   return unsubscribe;
  // }, []);

  async function gooleSigning() {
    Hub.listen('auth', ({payload}) => {
      switch (payload.event) {
        case 'signInWithRedirect':
          const user: any = getCurrentUser();
          // console.log(user.username);
          break;
        case 'signInWithRedirect_failure':
          // handle sign in failure
          break;
        case 'customOAuthState':
          const state = payload.data; // this will be customState provided on signInWithRedirect function
          // console.log(state);
          break;
      }
    });
  }

  // const getUser = async (): Promise<void> => {
  //   try {
  //     const currentUser = await Auth.currentAuthenticatedUser();
  //     setUser(currentUser);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //Method to clear the state..
  const handleClearState = () => {
    setEmail('');
    setPassword('');
    setConfirmID(false);
    setEmailError('');
    setPasswordError('');
  };
  // hook to handle clear state.
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', handleClearState);
    return () => unsubscribe();
  }, []);

  //Method to validate userEmail..
  const handleEmail = (value: string) => {
    if (value === '') {
      setEmailError(validations.enterEmail);
      setEmail(value);
      return;
    }

    if (!regex.emailRegex.test(value)) {
      setEmailError(validations.enterValidEmail);
      setEmail(value);
      setConfirmID(false);
      return;
    } else {
      setConfirmID(true);
    }

    setEmailError('');
    setEmail(value);
  };
  //Method to validate user password..
  const handlePassword = (value: string) => {
    if (value === '') {
      setPasswordError(validations.enterPassword);
      setPassword(value);
      return;
    }
    setPasswordError('');
    setPassword(value);
  };

  // Method to handle the google signing with AWS
  const handleGoogleSigning = () => {
    // console.log('google');
    signInWithRedirect({
      provider: 'Google',
    });
    //   Auth.federatedSignIn({
    //     provider: CognitoHostedUIIdentityProvider.Google,
    //   });
    // };
  };

  const handleFacebookSigning = () => {
    signInWithRedirect({
      provider: 'Facebook',
    });
  };
  //Method to press submit button..
  const handleSubmitSignIn = async () => {
    await signOut();
    setIsLoading(true);
    if (email === '') {
      setEmailError(validations.enterEmail);
      setIsLoading(false);
      return;
    } else if (emailError) {
      setEmailError(emailError);
      setIsLoading(false);
    } else if (password === '') {
      setPasswordError(validations.enterPassword);
      setIsLoading(false);
      return;
    } else if (passwordError) {
      setPasswordError(passwordError);
      setIsLoading(false);
    } else {
      const signInDetails = {
        username: email.trim().toLowerCase(),
        password: password,
        loaderFunction: () => setIsLoading(false),
      };
      // console.log(signInDetails, 'signinDetails=--=-');
      handleSignIn(signInDetails);
    }
  };

  // async function handleSignOut() {
  //   try {
  //     await signOut();
  //   } catch (error) {
  //     console.log('error signing out: ', error);
  //   }
  // }
  // useEffect(() => {
  //   async function checkAuthState() {
  //     try {
  //       const user = await getCurrentUser();

  //       await signOut();
  //       console.log('Signout',user);
  //     } catch (err) {
  //       console.log(err, 'err');
  //     }
  //   }
  //   checkAuthState();
  // }, []);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', data => {
      // console.log(data, 'data Payload');
      const {payload} = data;

      switch (payload.event) {
        case 'signInWithRedirect':
          getUser();
          break;
        case 'signInWithRedirect_failure':
          // console.log('error_failure');

          setError('An error has occurred during the OAuth flow.');
          break;
        case 'customOAuthState':
          // console.log(payload, 'payload');

          setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          break;
      }
    });
    getUser();

    return unsubscribe;
  }, []);

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      // console.log('Not signed in');
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
            onPress={() => {
              back();
              // dispatch(awsResponse(true));
            }}
          />
          <Text
            style={[commonStyles.signTextHeader, styles.customSignTextStyle]}>
            {appConstants.signIn}
          </Text>
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
              </Text>
              <Text style={commonStyles.iQTextStyle}>{appConstants.IQ}</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={appConstants.activeOpacity}
            style={styles.continueAsGuest}
            onPress={() => {
              navigate(navigationConstants.HOME);
            }}>
            <Text style={styles.continueAsGuestLabel}>
              {appConstants.asGuest}
            </Text>
          </TouchableOpacity>
          <CustomSeparator />

          <View style={styles.loginOptionContainer}>
            <CustomLoginOption
              source={Icons.GOOGLE_LOGO}
              label={appConstants.loginGoogle}
              onPress={async () => {
                console.log('google');
                // await signOut();
                try {
                  await signInWithRedirect({provider: 'Google'});
                } catch (err) {
                  console.log(err, 'errro0rrr');
                }
              }}
              // onPress={signInWithRedirect}
            />
            <CustomLoginOption
              source={Icons.FACEBOOK_LOGO}
              label={appConstants.loginFacebook}
              onPress={async () => {
                console.log('google');
                // await signOut();
                try {
                  await signInWithRedirect({provider: 'Facebook'});
                } catch (err) {
                  console.log(err, 'errro0rrr');
                }
              }}
              // onPress={handleFacebookSigning}
            />
          </View>
          <CustomSeparator />
          <CustomTextInput
            source={Icons.Email_LOGO}
            placeholder={appConstants.email}
            placeholderTextColor={colors.color_fff}
            value={email}
            onChangeText={handleEmail}
            error={emailError}
            keyboardType={'email-address'}
            inputstyle={styles.customTextInputStyle}
            inputIconStyle={styles.customTextInputIconStyle}
            confirm={confirmID}
          />
          <CustomTextInput
            source={Icons.LOCK_LOGO}
            placeholderTextColor={colors.color_fff}
            placeholder={appConstants.password}
            secureTextEntry={true}
            value={password}
            onChangeText={handlePassword}
            error={passwordError}
            keyboardType={'default'}
            inputstyle={styles.customTextInputStyle}
            inputIconStyle={styles.customTextInputIconStyle}
          />
          <Text
            onPress={() => navigate(navigationConstants.FORGOT_PASSWORD)}
            style={styles.forgotPasswordLabelStyle}>
            {appConstants.forgotPassword}
          </Text>
          <CustomButton
            label={appConstants.login}
            onPress={handleSubmitSignIn}
            // onPress={handleSignOut}
          />
          {/* <CustomButton
            label={appConstants.signOut}
            onPress={handleSignOut}
            // onPress={handleSignOut}
          /> */}
          <View style={commonStyles.accountTagLineContainer}>
            <Text style={commonStyles.accountTextStyle}>
              {appConstants.dontHaveAccount}
            </Text>
            <Text
              onPress={() => navigate(navigationConstants.SIGNUP)}
              style={commonStyles.signNowTextStyle}>
              {appConstants.signUpNow}
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>

      {/* custom loader */}
      {isLoading && <CustomLoader isLoading={isLoading} />}
    </>
  );
};

export default Login;
