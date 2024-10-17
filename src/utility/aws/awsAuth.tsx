/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import {navigate} from '@src/navigation/navigationMethods';
import {store} from '@src/redux/store';
import {fetchLogin} from '@src/screens/login/slice/loginSlice';
import navigationConstants from '@src/constants/navigationConstants';
import commonMethods from '../commonMethods';
import appConstants, {awsError} from '@src/constants/appConstants';
import {fetchSignUp} from '@src/screens/signUp/slice/signUpSlice';
import colors from '@src/constants/colors';
import {awsResponse} from '@src/screens/login/slice/awsLoginSlice';
import {
  confirmResetPassword,
  confirmSignIn,
  fetchAuthSession,
  resetPassword,
  signIn,
} from 'aws-amplify/auth';
import {signUp} from 'aws-amplify/auth';
import {confirmSignUp, resendSignUpCode,ConfirmSignInInput} from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sign} from 'react-native-pure-jwt';

// // Signin types..
type SignInInput = {
  username: string;
  password: string;
  loaderFunction: Function;
};

const getJWT = async (payload: any) => {
  console.log(payload, 'payload');

  const token = await sign(
    payload, // body
    'asfasfasfasfasf', // secret
    {
      alg: 'HS256',
    },
  );
  return token;
};

export async function handleSignIn({
  username,
  password,
  loaderFunction,
}: SignInInput) {
  // const challengeResponse = 'PASSWORD_VERIFIER';
  //   try {
  //     const {nextStep} = await signIn({
  //       username,
  //       password,
  //       options: {
  //         authFlowType: 'USER_SRP_AUTH',
  //       },
  //     });
  //     loaderFunction(false);
  // console.log(nextStep,'nextstep');

  //     if (nextStep.signInStep === 'DONE') {
  //       try {
  //         // to send the answer of the custom challenge
  //         const output = await confirmSignIn({challengeResponse});
  //         console.log(output,'output');
  //       } catch (err) {
  //         console.log(err,'errrr');
  //       }
  //     }
  //   } catch (err) {
  //     loaderFunction(false);

  //     console.log(err,'catcherr');
  //   }
  try {
    const {isSignedIn, nextStep}: any = await signIn({
      username,
      password,
        options: {
        authFlowType: 'USER_SRP_AUTH',
      },
    });
    console.log(nextStep, isSignedIn, 'data');
    // if (nextStep.signInStep === 'DONE') {
    //   try {
    //     // to send the answer of the custom challenge
    //     const output = await confirmSignIn({
    //       // ChallengeName: 'PASSWORD_VERIFIER',
    //       // ClientId: '6c4kju26bqgg6ttpo7m3rkf2sl',
    //       challengeResponse:'6c4kju26bqgg6ttpo7m3rkf2sl',
    //       options:{

    //       }
    //     });
    //     console.log(output, 'output');
    //   } catch (err) {
    //     console.log(err, 'errrr');
    //   }
    // }
    const {idToken} = (await fetchAuthSession()).tokens ?? {};
    console.log(idToken?.toString(),'result');
    const token:any = idToken?.toString();
    await AsyncStorage.setItem('token',token);

    loaderFunction(false);
    handleSigninNextSteps(nextStep, username, isSignedIn, password);
    // if (signinResponse?.isSignedIn === false) {
    //   navigate(navigationConstants.OTP, {
    //     email: username,
    //     parent: navigationConstants.LOGIN,
    //   });
    // } else {
    //   store.dispatch(fetchLogin(username));
    //   store.dispatch(awsResponse(''));
    // }
  } catch (error: any) {
    loaderFunction(false);
    console.log('error signing in', error);
    if (error?.message === awsError.userNotConfirmed) {
      loaderFunction(false);
      commonMethods.showSnackBar(error?.message, colors.color_red);
      navigate(navigationConstants.OTP, {
        email: username,
        parent: navigationConstants.LOGIN,
      });
      console.log(error?.message, 'error');
    } else {
      loaderFunction(false);
      commonMethods.showSnackBar(error?.message, colors.color_red);
      console.log(error, 'error------');
    }
  }
}

function handleSigninNextSteps(
  nextStep: any,
  username: any,
  isSignedIn: any,
  password: any,
) {
  // const data = {
  //   password: password,
  //   username: username,
  // };
  // const {signInStep} = output;
  console.log(nextStep?.signInStep, 'nextStep?.signInStep');

  switch (nextStep?.signInStep) {
    case 'CONFIRM_SIGN_UP':
      console.log(username, 'username-====-');

      navigate(navigationConstants.OTP, {
        email: username,
        parent: navigationConstants.LOGIN,
      });
      // const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      // console.log(
      //   `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`,
      // );
      // Collect the confirmation code from the user and pass to confirmResetPassword.
      break;
    case 'DONE':
      console.log('done');
navigate(navigationConstants.DRAWER_PROFILE);
      store.dispatch(fetchLogin(username));
      store.dispatch(awsResponse(isSignedIn));
      break;
  }
}

// Signup..

type SignUpParameters = {
  username: string;
  password: string;
  name: string;
  signUpLoader: Function;
};

export async function handleSignUp({
  username,
  password,
  name,
  signUpLoader,
}: SignUpParameters) {
  try {
    const {isSignUpComplete, userId, nextStep} = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          name,
        },
        // optional
        autoSignIn: false, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      },
    });
    const createProfileData: any = {
      id: userId,
      name: name, //user name
      email: username, // email id:
    };
    store.dispatch(fetchSignUp(createProfileData));
    navigate(navigationConstants.OTP, {
      email: username,
      parent: navigationConstants.SIGNUP,
    });
  } catch (error: any) {
    console.log('error signing up:', error);
    signUpLoader(false);
    commonMethods.showSnackBar(error?.message, colors.color_red);
  }
}

// confrim signUp types..
type ConfirmSignUpParameters = {
  username: string;
  code: string;
};

// Method for confirm signUp..
export async function handleconfirmSignUp({
  username,
  code,
}: ConfirmSignUpParameters) {
  try {
    const confirm = await confirmSignUp({username, confirmationCode: code});
    navigate(navigationConstants.LOGIN);
    commonMethods.showSnackBar(
      `${confirm} ${appConstants.emailVerified}`,
      colors.color_green,
    );
  } catch (error: any) {
    commonMethods.showSnackBar(error?.message, colors.color_red);
  }
}

// Forgot password types..
type forgotPasswordParameters = {
  username: string;
  forgotPassLoader: Function;
};

// Send confirmation code to user's email
export async function handleResetPassword({
  username,
  forgotPassLoader,
}: forgotPasswordParameters) {
  try {
    const output = await resetPassword({username});
    // await Auth.forgotPassword(username);
    handleResetPasswordNextSteps(output);
    forgotPassLoader(false);
    navigate(navigationConstants.RESET_PASSWORD, {username});
  } catch (err: any) {
    forgotPassLoader(false);
    commonMethods.showSnackBar(err?.message, colors.color_red);
  }
}

function handleResetPasswordNextSteps(output: any) {
  const {nextStep} = output;
  switch (nextStep.resetPasswordStep) {
    case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      console.log(
        `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`,
      );
      // Collect the confirmation code from the user and pass to confirmResetPassword.
      break;
    case 'DONE':
      console.log('Successfully reset password.');
      break;
  }
}

// Forgot password types
type ResetPasswordParameters = {
  username: string;
  code: string;
  newPassword: string;
  resetPassLoader: Function;
};

// Collect confirmation code and new password
export async function handleConfirmResetPassword(
  props: ResetPasswordParameters,
) {
  const {username, code, newPassword, resetPassLoader} = props;
  try {
    await confirmResetPassword({username, confirmationCode: code, newPassword});
    resetPassLoader(false);
    commonMethods.showSnackBar(
      appConstants.passwordResetSuccess,
      colors.color_green,
    );
    navigate(navigationConstants.LOGIN);
  } catch (err: any) {
    resetPassLoader(false);
    commonMethods.showSnackBar(err?.message, colors.color_red);
  }
}

//Method to resend confirmation code..
export async function resendConfirmationCode(
  username: string,
  // resetPassword?: Boolean,
) {
  try {
    await resendSignUpCode({username});
  } catch (err: any) {
    if (!resetPassword) {
    }
    commonMethods.showSnackBar(err?.message, colors.color_red);
  }
}
