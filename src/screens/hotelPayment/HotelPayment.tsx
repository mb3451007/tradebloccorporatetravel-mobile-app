/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TextInput,
  Keyboard,
  BackHandler,
  Modal,
} from 'react-native';
import styles from './styles';
import {Icons, Images} from '@src/assets';
import colors from '@src/constants/colors';
import CustomHeader from '@src/components/customHeader/customHeader';
import appConstants, {
  flagURL,
  flashMessageConstants,
  statusCode,
  validations,
} from '@src/constants/appConstants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import CustomMainStackInput from '@src/components/customTextInput(mainStack)/customMainStackInput';
import {CountryPicker} from 'react-native-country-codes-picker';
import regex from '@src/utility/regex';
import {back, navigate} from '@src/navigation/navigationMethods';
import {CardNumberTextInput} from 'rn-credit-card-textinput';
import creditCardType from 'credit-card-type';
import commonMethods from '@src/utility/commonMethods';
import {RootState} from '@src/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoader from '@src/components/customLoader/customLoader';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {fetchNationality} from '@src/redux/appSlice/nationalitySlice';
import NationalityDropDown from '@src/components/nationalityDropDown/nationalityDropDown';
import HotelConfirmationBar from '@src/components/customBarforhotelConfirmation/customBarforhotelConfirmation';
import {clearhotelPayment, sendhotelPayment} from './slice/hotelPaymentSlice';
import HotelPaymentFailureModal from '@src/components/hotelPaymentFailureModal/HotelPaymentFailureModal';
import navigationConstants from '@src/constants/navigationConstants';
import CustomButton from '@src/components/customButton/customButton';

const HotelPayment = (props: any) => {
  const uploadFormat = props?.route?.params?.completePayload;
  console.log(JSON.stringify(uploadFormat), 'uploadformat');

  const roomPrice = props?.route?.params?.RoomPrice;

  // const navigation = useNavigation();
  const paymentLoader = useSelector(
    (state: RootState) => state?.hotelPayment?.isLoading,
  );

  const nationalityData: any = useSelector(
    (state: RootState) => state?.nationality.nationalityData,
  );

  const nationalityLoader = useSelector(
    (state: RootState) => state?.nationality?.isLoading,
  );
  const paymentResponse: any = useSelector(
    (state: RootState) => state?.hotelPayment,
  );
  console.log(paymentResponse, 'paymentresponse');

  const dispatch = useDispatch();
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    zipCode: '',
    phonePicker: false,
    countryPicker: false,
    code: '+1',
    flag: '',
    countryFlag: '',
    eTicket: false,
    firstNameErrMsg: ' ',
    lastNameErrMsg: ' ',
    emailErrMsg: ' ',
    phoneErrMsg: ' ',
    addressErrMsg: ' ',
    countryErrMsg: ' ',
    cityErrMsg: ' ',
    zipCodeErrMsg: ' ',
    codeErrMsg: ' ',
    eTicketErrMsg: ' ',
    countryCode: '',
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiration: '',
    cardCVC: '',
    cardNumberErrMsg: ' ',
    cardExpErrMsg: ' ',
    cardCVCErrMsg: ' ',
  });
  const [confirmmodalOpen, setConfirmmodalOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [countryOrigin, setCountryOrigin] = useState('');
  const [countryId, setCountryId] = useState('');

  const [countryType, setCountryType] = useState('');

  const [countryDropDown, setCountryDropDown] = useState<boolean>(false);
  const [countryLoader, setCountryLoader] = useState(false);
  // const [isPaymentSucess, setIsPaymentSucess] = useState<any>(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState<any>(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [pamentFailure, setPaymentFailure] = useState(false);
  useEffect(() => {
    setPaymentLoading(paymentLoader);
  }, [paymentLoader]);

  useEffect(() => {
    setCountryLoader(nationalityLoader);
  }, [nationalityLoader]);

  useEffect(() => {
    if (paymentResponse?.response?.data?.statusCode === statusCode.Code_200) {
      setConfirmmodalOpen(true);
    } else if (paymentResponse?.err?.statusCode === statusCode.Code_500) {
      setPaymentFailure(true);
    } else {
      setConfirmmodalOpen(false);
      setPaymentFailure(false);
    }
  }, [paymentResponse]);
  // // Hook to hide the bottom tab bar
  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: 'none',
  //     },
  //   });
  //   return () =>
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: styles.tabBarStyle,
  //     });
  // }, [navigation]);

  const homeNavigation = () => {
    setConfirmmodalOpen(false);
    navigate(navigationConstants.HOTEL);
  };

  // hoook for back press
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackHandlerPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackHandlerPress);
  }, []);

  // method for back button
  const onBackHandlerPress = () => {
    back();
    return true;
  };

  // Method to handle the card details data.
  const cardDetailsData: any = () => {
    const cardNum = parseInt(
      cardDetails.cardNumber.replace(/\s/g, '').trim(),
      10,
    );
    const cardType = creditCardType(cardDetails.cardNumber);
    const typeInString = cardType?.[0].type.slice(0, 2).toUpperCase().trim();
    const expDate = `${cardDetails.cardExpiration.slice(
      0,
      2,
    )}${cardDetails.cardExpiration.slice(3)}`;

    return {
      cardType:
        typeInString === 'MA'
          ? 'CA'
          : typeInString === 'AE'
          ? 'AX'
          : typeInString,
      cardNo: cardNum,
      cvc: Number(cardDetails.cardCVC.trim()),
      expireAt: expDate.trim(),
    };
  };

  // Method to handle the payment details data.
  const paymentDetailsData: any = () => {
    return {
      first_name: billingDetails.firstName.trim(),
      last_name: billingDetails.lastName.trim(),
      email: billingDetails.email.trim().toLowerCase(),
      phone: `${billingDetails.code} ${billingDetails.phone.trim()}`,
      address: billingDetails.address.trim(),
      city: billingDetails.city.trim(),
      country: {
        id: countryId,
        type: countryType,
        name: country,
        code: countryOrigin,
        // 'countryCode': '',
      },
      zip: billingDetails.zipCode.trim(),
    };
  };

  // Hook to know the keyboard is opened or not.
  useEffect(() => {
    const keyBoardOpen = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyBoardClosed = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyBoardOpen.remove();
      keyBoardClosed.remove();
    };
  }, []);

  // Method to handle card number.
  const handleCreditCardNumber: any = (text: any) => {
    setCardDetails(prevNum => {
      return {
        ...prevNum,
        cardNumber: text,
        cardNumberErrMsg: '',
      };
    });
  };

  // Method to handle text input values of all input fields.
  const handleOnChangeTextValues: any = (text: any, constants: any) => {
    // Validation for the card expiration number
    if (constants === appConstants.cardExpiration) {
      if (text === '') {
        setCardDetails(prevCardExpiration => {
          return {
            ...prevCardExpiration,
            cardExpiration: text,
            cardExpErrMsg: validations.enterCardExpiration,
          };
        });
        return;
      } else if (text.length > 2 && text.charAt(2) !== '/') {
        text = text.slice(0, 2) + '/' + text.slice(2);
        setCardDetails(prevCardExpiration => {
          return {
            ...prevCardExpiration,
            cardExpiration: text,
            cardExpErrMsg: '',
          };
        });
      } else if (!regex.cardExpirationRegex.test(text)) {
        setCardDetails(prevCardExpiration => {
          return {
            ...prevCardExpiration,
            cardExpiration: text,
            cardExpErrMsg: validations.enterValidCardExpiration,
          };
        });
        return;
      } else {
        setCardDetails(prevCardExpiration => {
          return {
            ...prevCardExpiration,
            cardExpiration: text,
            cardExpErrMsg: '',
          };
        });
      }
    }

    // Validations for card CVV number
    if (constants === appConstants.cardCVC) {
      if (text === '') {
        setCardDetails(prevCardCVV => {
          return {
            ...prevCardCVV,
            cardCVC: text,
            cardCVCErrMsg: validations.enterCardCVC,
          };
        });
        return;
      } else if (!regex.cardCvvRegex.test(text)) {
        setCardDetails(prevCardCVV => {
          return {
            ...prevCardCVV,
            cardCVC: text,
          };
        });
        return;
      } else {
        setCardDetails(prevCardCVV => {
          return {
            ...prevCardCVV,
            cardCVC: text,
            cardCVCErrMsg: '',
          };
        });
      }
    }

    // Validation for the first name
    if (constants === appConstants.firstName) {
      // Validation for the first name input.
      if (text === '') {
        setBillingDetails(prevName => {
          return {
            ...prevName,
            firstName: text,
            firstNameErrMsg: validations.enterFirstName,
          };
        });
        return;
      } else if (text.length <= 1) {
        setBillingDetails(prevName => {
          return {
            ...prevName,
            firstName: text,
            firstNameErrMsg: validations.tooShort,
          };
        });
        return;
      } else {
        setBillingDetails(prevName => {
          return {
            ...prevName,
            firstName: text,
            firstNameErrMsg: '',
          };
        });
      }
    }

    // Validation for the last name.
    if (constants === appConstants.lastName) {
      if (text === '') {
        setBillingDetails(prevName => {
          return {
            ...prevName,
            lastName: text,
            lastNameErrMsg: validations.enterLastName,
          };
        });
        return;
      } else if (text.length <= 1) {
        setBillingDetails(prevName => {
          return {
            ...prevName,
            lastName: text,
            lastNameErrMsg: validations.tooShort,
          };
        });
        return;
      } else {
        setBillingDetails(prevName => {
          return {
            ...prevName,
            lastName: text,
            lastNameErrMsg: '',
          };
        });
      }
    }

    // Validations for the email number
    if (constants === appConstants.email) {
      if (text === '') {
        setBillingDetails(prevEmail => {
          return {
            ...prevEmail,
            email: text,
            emailErrMsg: validations.enterEmail,
          };
        });
      } else if (!regex.emailRegex.test(text)) {
        setBillingDetails(prevEmail => {
          return {
            ...prevEmail,
            email: text,
            emailErrMsg: validations.enterValidEmail,
          };
        });
        return;
      } else {
        setBillingDetails(prevEmail => {
          return {
            ...prevEmail,
            email: text,
            emailErrMsg: '',
          };
        });
      }
    }

    // Validations for the phone number
    if (constants === appConstants.phone) {
      if (text === '') {
        setBillingDetails(prevPhone => {
          return {
            ...prevPhone,
            phone: text,
            phoneErrMsg: validations.enterPhone,
          };
        });
        return;
      } else if (!regex.phoneRegex.test(text)) {
        setBillingDetails(prevPhone => {
          return {
            ...prevPhone,
            phone: text,
            phoneErrMsg: validations.enterValidPhone,
          };
        });
        return;
      } else {
        setBillingDetails(prevPhone => {
          return {
            ...prevPhone,
            phone: text,
            phoneErrMsg: '',
          };
        });
      }
    }

    // Validation for the address input.
    if (constants === appConstants.address) {
      if (text === '') {
        setBillingDetails(prevAddress => {
          return {
            ...prevAddress,
            address: text,
            addressErrMsg: validations.enterAddress,
          };
        });
        return;
      } else if (text.length < 2) {
        setBillingDetails(prevAddress => {
          return {
            ...prevAddress,
            address: text,
            addressErrMsg: validations.tooShort,
          };
        });
        return;
      } else {
        setBillingDetails(prevAddress => {
          return {
            ...prevAddress,
            address: text,
            addressErrMsg: '',
          };
        });
      }
    }

    // Validations for the country
    if (constants === appConstants.country) {
      if (text === '') {
        setBillingDetails(prevCountry => {
          return {
            ...prevCountry,
            country: text,
            countryErrMsg: validations.enterCountry,
          };
        });
        return;
      } else if (text.length <= 2) {
        setBillingDetails(prevCountry => {
          return {
            ...prevCountry,
            country: text,
            countryErrMsg: validations.tooShort,
          };
        });
        return;
      } else {
        setBillingDetails(prevCountry => {
          return {
            ...prevCountry,
            country: text,
            countryErrMsg: '',
          };
        });
      }
    }

    // Validations for the city
    if (constants === appConstants.city) {
      if (text === '') {
        setBillingDetails(prevCity => {
          return {
            ...prevCity,
            city: text,
            cityErrMsg: validations.enterCity,
          };
        });
        return;
      } else if (text.length <= 1) {
        setBillingDetails(prevCity => {
          return {
            ...prevCity,
            city: text,
            cityErrMsg: validations.tooShort,
          };
        });
        return;
      } else {
        setBillingDetails(prevCity => {
          return {
            ...prevCity,
            city: text,
            cityErrMsg: '',
          };
        });
      }
    }

    // Validations for the zipcode
    if (constants === appConstants.zipCode) {
      if (text === '') {
        setBillingDetails(prevZipCode => {
          return {
            ...prevZipCode,
            zipCode: text,
            zipCodeErrMsg: validations.enterZipCode,
          };
        });
        return;
      } else if (text.length <= 4) {
        setBillingDetails(prevZipCode => {
          return {
            ...prevZipCode,
            zipCode: text,
            zipCodeErrMsg: validations.tooShort,
          };
        });
        return;
      } else {
        setBillingDetails(prevZipCode => {
          return {
            ...prevZipCode,
            zipCode: text,
            zipCodeErrMsg: '',
          };
        });
      }
    }
  };

  // Method for opening the country code picker
  const handleOpenCountryPicker: any = (constants: string) => {
    // Open picker for the phone number
    if (constants === appConstants.phone) {
      setBillingDetails((prevPhonePicker: any) => {
        return {
          ...prevPhonePicker,
          phonePicker: true,
        };
      });
    }

    // Open picker for the coutry picker
    if (constants === appConstants.country) {
      setBillingDetails(prevCountryPicker => {
        return {
          ...prevCountryPicker,
          countryPicker: true,
          countryErrMsg: '',
        };
      });
    }
  };

  // Method to set the codes of phone and name of country
  const handleCountryCodePicker: any = (it: any, constants: string) => {
    // Code is picker for the phone number
    if (constants === appConstants.phone) {
      setBillingDetails(prevCode => {
        return {
          ...prevCode,
          flag: it.code,
          code: it.dial_code,
          phonePicker: false,
          codeErrMsg: '',
        };
      });
    }

    if (constants === appConstants.country) {
      setBillingDetails(prevCountry => {
        return {
          ...prevCountry,
          country: it.name.en,
          countryFlag: it.flag,
          countryPicker: false,
          countryCode: it.code,
        };
      });
    }
  };
  const handleCountry = (text: any) => {
    if (text === '') {
      commonMethods.flashMessage(
        validations.selectLocation,
        flashMessageConstants.danger,
      );
      setCountry(text);
      return;
    } else if (!regex.stringRegex.test(text)) {
      commonMethods.flashMessage(
        validations.onlyCharacters,
        flashMessageConstants.danger,
      );
      return;
    } else {
      setCountry(text);
      const params: any = {
        term: text,
        locale: appConstants.en_US,
        location_types: appConstants.countryAPI,
        active_only: false,
        sort: appConstants.nameAPI,
      };
      dispatch(fetchNationality(params));
      setCountryDropDown(true);
      setCountryOrigin('');
    }
  };
  const handleCountryPick = (item: any) => {
    setCountry(item?.name);
    setCountryOrigin(item?.code);
    setCountryType(item?.type);
    setCountryId(item?.id);
    setCountryDropDown(false);
  };

  // Method to handle the comfirm button
  const handleConfirmButtonPress: any = () => {
    navigate(navigationConstants.HOTEL_RESERVE, {
      parentScreen: appConstants.hotelPayment,
    });
    if (cardDetails.cardNumber === '') {
      commonMethods.flashMessage(
        validations.enterCardNumber,
        flashMessageConstants.danger,
      );
      setCardDetails(prevCardNum => {
        return {
          ...prevCardNum,
          cardNumberErrMsg: validations.enterCardNumber,
        };
      });
    } else if (cardDetails.cardNumberErrMsg !== '') {
      commonMethods.flashMessage(
        validations.enterCardNumber,
        flashMessageConstants.danger,
      );
      setCardDetails(prevCardNum => {
        return {
          ...prevCardNum,
          cardNumberErrMsg: cardDetails.cardNumberErrMsg,
        };
      });
    } else if (cardDetails.cardExpiration === '') {
      setCardDetails(prevExp => {
        return {
          ...prevExp,
          cardExpErrMsg: validations.enterCardExpiration,
        };
      });
    } else if (cardDetails.cardExpErrMsg !== '') {
      setCardDetails(prevExp => {
        return {
          ...prevExp,
          cardExpErrMsg: cardDetails.cardExpErrMsg,
        };
      });
    } else if (cardDetails.cardCVC === '') {
      setCardDetails(prevCardCVC => {
        return {
          ...prevCardCVC,
          cardCVCErrMsg: validations.enterCardCVC,
        };
      });
    } else if (cardDetails.cardCVCErrMsg !== '') {
      setCardDetails(prevCardCVC => {
        return {
          ...prevCardCVC,
          cardCVCErrMsg: cardDetails.cardCVCErrMsg,
        };
      });
    } else if (billingDetails.firstName === '') {
      setBillingDetails(prevFirstName => {
        return {
          ...prevFirstName,
          firstNameErrMsg: validations.enterFirstName,
        };
      });
    } else if (billingDetails.firstNameErrMsg !== '') {
      setBillingDetails(prevFirstName => {
        return {
          ...prevFirstName,
          firstNameErrMsg: billingDetails.firstNameErrMsg,
        };
      });
    } else if (billingDetails.lastName === '') {
      setBillingDetails(prevLastName => {
        return {
          ...prevLastName,
          lastNameErrMsg: validations.enterLastName,
        };
      });
    } else if (billingDetails.lastNameErrMsg !== '') {
      setBillingDetails(prevLastName => {
        return {
          ...prevLastName,
          lastNameErrMsg: billingDetails.lastNameErrMsg,
        };
      });
    } else if (billingDetails.email === '') {
      setBillingDetails(prevEmail => {
        return {
          ...prevEmail,
          emailErrMsg: validations.enterEmail,
        };
      });
    } else if (billingDetails.emailErrMsg !== '') {
      setBillingDetails(prevEmail => {
        return {
          ...prevEmail,
          emailErrMsg: billingDetails.emailErrMsg,
        };
      });
    } else if (billingDetails.phone === '') {
      setBillingDetails(prevPhone => {
        return {
          ...prevPhone,
          phoneErrMsg: validations.enterPhone,
        };
      });
    } else if (billingDetails.code === '') {
      setBillingDetails(prevPhone => {
        return {
          ...prevPhone,
          codeErrMsg: validations.selectCountryCode,
        };
      });
    } else if (billingDetails.phoneErrMsg !== '') {
      setBillingDetails(prevPhone => {
        return {
          ...prevPhone,
          phoneErrMsg: billingDetails.phoneErrMsg,
        };
      });
    } else if (billingDetails.address === '') {
      setBillingDetails(prevAddress => {
        return {
          ...prevAddress,
          addressErrMsg: validations.enterAddress,
        };
      });
    } else if (billingDetails.addressErrMsg !== '') {
      setBillingDetails(prevAddress => {
        return {
          ...prevAddress,
          addressErrMsg: billingDetails.addressErrMsg,
        };
      });
    } else if (billingDetails.city === '') {
      setBillingDetails(prevCity => {
        return {
          ...prevCity,
          cityErrMsg: validations.enterCity,
        };
      });
    } else if (billingDetails.cityErrMsg !== '') {
      setBillingDetails(prevCity => {
        return {
          ...prevCity,
          cityErrMsg: billingDetails.cityErrMsg,
        };
      });
    } else if (billingDetails.zipCode === '') {
      setBillingDetails(prevZipCode => {
        return {
          ...prevZipCode,
          zipCodeErrMsg: validations.enterZipCode,
        };
      });
    } else if (billingDetails.zipCodeErrMsg !== '') {
      setBillingDetails(prevZipCode => {
        return {
          ...prevZipCode,
          zipCodeErrMsg: billingDetails.zipCodeErrMsg,
        };
      });
    } else {
      const uniqueId = Math.floor(Math.random() * 99).toString();
      const dateNow = Date.now().toString();
      const sessionID = `dev-${uniqueId}-${dateNow}`;
      const submitId = uploadFormat?.id;
      const submitDetails = uploadFormat?.details;
      const submiDataToDispatch: any = {
        id: submitId,
        details: submitDetails,
        sessionID: sessionID,
        cardDetail: cardDetailsData(),
        paymentDetail: paymentDetailsData(),
        gateway: appConstants.card,
      };
      dispatch(sendhotelPayment(submiDataToDispatch));
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView style={styles.keyBoardAwareStyle}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={colors.color_0094E6}
          />
          <Image
            style={[
              styles.paymentBackGroundImageStyle,
              {
                height:
                  Platform.OS === 'ios'
                    ? responsiveHeight(31)
                    : responsiveHeight(27),
              },
            ]}
            source={Images.HOTEL_SEARCHBG}
          />
          <View style={styles.paymentHeaderContainerStyle}>
            <CustomHeader
              leftIcon={Icons.BACK_LOGO}
              lefticonOnPress={() => {
                back();
                dispatch(clearhotelPayment());
              }}
              leftIconStyle={styles.headerLeftIconStyle}
              // headerLabel={appConstants.flightCheckOut}
              headerLabelStyle={styles.headerLabelStyle}
            />
            <Image style={styles.stepfromStyle} source={Icons.PAYMENTSTEP} />
          </View>
          <Image style={styles.cardStyle} source={Icons.hotelPaymentcard} />
          <View style={styles.cardDetailsContainerStyle}>
            <Text style={styles.cardDetailsTextStyle}>
              {appConstants.cardDetails}
            </Text>
            <CardNumberTextInput
              autoFocus={true}
              focus={true}
              errorColor={colors.color_red}
              defaultBorderColor={'#ddd'}
              inputWrapStyle={styles.inputWrapStyle}
              inputStyle={styles.inputStyle}
              defaultValue={cardDetails.cardNumber}
              placeholder={appConstants.cardNumber}
              updateTextVal={(text: any) => handleCreditCardNumber(text)}
            />
            <View style={styles.cvcExpDateContainerStyle}>
              <View style={styles.expCVCContainerStyle}>
                <Text numberOfLines={1} style={styles.expCVCTextStyle}>
                  {appConstants.cardExpiration}
                </Text>
                <TextInput
                  style={[
                    styles.textInputsStyle,
                    {
                      bottom:
                        Platform.OS === 'ios' ? responsiveHeight(-2) : null,
                    },
                  ]}
                  value={cardDetails.cardExpiration}
                  onChangeText={(text: any) =>
                    handleOnChangeTextValues(text, appConstants.cardExpiration)
                  }
                  maxLength={10}
                  placeholder={appConstants.mmyy}
                  placeholderTextColor={colors.color_BBBBBB}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.errorMsgStyle,
                    {
                      marginTop:
                        Platform.OS === 'ios' ? responsiveHeight(4) : null,
                    },
                  ]}>
                  {cardDetails.cardExpErrMsg}
                </Text>
              </View>

              {/* secondTextInput */}
              <View style={styles.expCVCContainerStyle}>
                <Text numberOfLines={1} style={styles.expCVCTextStyle}>
                  {appConstants.cardCVC}
                </Text>
                <View style={styles.cvcContainerStyle}>
                  <TextInput
                    style={[styles.textInputsStyle, styles.secondTextInput]}
                    value={cardDetails.cardCVC}
                    onChangeText={text =>
                      handleOnChangeTextValues(text, appConstants.cardCVC)
                    }
                    maxLength={5}
                  />
                  <Image style={styles.cvcImageStyle} source={Icons.cvc} />
                </View>
                <Text numberOfLines={1} style={styles.errorMsgStyle}>
                  {cardDetails.cardCVCErrMsg}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.billingDetailsMainContainerStyle}>
            <Text style={styles.billingDetailsTextStyle}>
              {appConstants.billingDetails}
            </Text>
            <View style={styles.firstLastNameContainerStyle}>
              {/* first name text input */}
              <View style={styles.nameContainerStyle}>
                <Text style={styles.expCVCTextStyle}>
                  {appConstants.firstName}
                </Text>
                <View style={styles.cvcContainerStyle}>
                  <TextInput
                    style={[
                      styles.textInputsStyle,
                      styles.secondTextInput,
                      {
                        bottom:
                          Platform.OS === 'ios' ? responsiveHeight(0.7) : null,
                      },
                    ]}
                    value={billingDetails.firstName}
                    onChangeText={text =>
                      handleOnChangeTextValues(text, appConstants.firstName)
                    }
                  />
                  <Image style={styles.cvcImageStyle} source={Icons.USERLOGO} />
                </View>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.errorMsgStyle,
                    {
                      marginTop:
                        Platform.OS === 'ios' ? responsiveHeight(0.8) : null,
                    },
                  ]}>
                  {billingDetails.firstNameErrMsg}
                </Text>
              </View>

              {/* Last name text input */}
              <View style={styles.nameContainerStyle}>
                <Text style={styles.expCVCTextStyle}>
                  {appConstants.lastName}
                </Text>
                <TextInput
                  style={[
                    styles.textInputsStyle,
                    {bottom: Platform.OS === 'ios' ? -14 : null},
                  ]}
                  value={billingDetails.lastName}
                  onChangeText={(text: string) =>
                    handleOnChangeTextValues(text, appConstants.lastName)
                  }
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.errorMsgStyle,
                    {
                      marginTop:
                        Platform.OS === 'ios' ? responsiveHeight(3) : null,
                    },
                  ]}>
                  {billingDetails.lastNameErrMsg}
                </Text>
              </View>
            </View>

            <CustomMainStackInput
              label={appConstants.email}
              value={billingDetails.email}
              onChangeText={(text: string) => {
                handleOnChangeTextValues(text, appConstants.email);
              }}
              source={Icons.Email_LOGO}
              rightIconTintColor={colors.color_BBBBBB}
              mainContainerCustomStyle={styles.customTextInputStyle}
              textInputCustomStyle={styles.textInputCustomStyle}
              headerLabelStyle={styles.textInputHeaderLabelStyle}
              error={billingDetails.emailErrMsg}
              keyboardType={'email-address'}
            />

            <CustomMainStackInput
              label={appConstants.phone}
              value={billingDetails.phone}
              leftIcon={Icons?.DROPDOWN_ARROW}
              leftIconOnPress={() =>
                handleOpenCountryPicker(appConstants.phone)
              }
              onChangeText={(text: any) => {
                handleOnChangeTextValues(text, appConstants.phone);
              }}
              // flag={billingDetails.flag}
              flag={
                billingDetails.flag === ''
                  ? `${flagURL.flaghhtp}${'us'}${flagURL.wedp}`
                  : `${flagURL.flaghhtp}${billingDetails.flag.toLowerCase()}${
                      flagURL.wedp
                    }`
              }
              // countryCode={billingDetails.code}
              keyboardType={'phone-pad'}
              source={Icons.CALL}
              maxlength={12}
              mainContainerCustomStyle={styles.customTextInputStyle}
              textInputCustomStyle={styles.textInputCustomStyle}
              headerLabelStyle={styles.textInputHeaderLabelStyle}
              error={billingDetails.phoneErrMsg || billingDetails.codeErrMsg}
            />
            <CountryPicker
              enableModalAvoiding={true}
              show={billingDetails.phonePicker}
              
              initialState={'+1'}
              pickerButtonOnPress={(it: any) => {
                handleCountryCodePicker(it, appConstants.phone);
              }}
              lang={'en'}
              style={{
                modal: {
                  flex: 1,
                  marginTop: Platform.OS === 'ios' ? responsiveHeight(5) : 1,
                },
                dialCode: {
                  color: colors.color_000,
                },
                countryName: {
                  color: colors.color_000,
                },
                textInput: {
                  color: colors.color_000,
                },
              }}
            />

            <CustomMainStackInput
              label={appConstants.address}
              value={billingDetails.address}
              onChangeText={(text: string) =>
                handleOnChangeTextValues(text, appConstants.address)
              }
              source={Icons.Email_LOGO}
              rightIconTintColor={colors.color_BBBBBB}
              mainContainerCustomStyle={styles.customTextInputStyle}
              textInputCustomStyle={styles.textInputCustomStyle}
              headerLabelStyle={styles.textInputHeaderLabelStyle}
              error={billingDetails.addressErrMsg}
            />

            <CustomMainStackInput
              label={appConstants.country}
              value={country}
              flag={`${flagURL.flaghhtp}${countryOrigin.toLowerCase()}${
                flagURL.wedp
              }`}
              leftIcon={Icons.DROPDOWN_ARROW}
              leftIconTintColor={colors.color_fff}
              onChangeText={(text: string) => handleCountry(text)}
              mainContainerCustomStyle={styles.customTextInputStyle}
              textInputCustomStyle={[
                styles.textInputCustomStyle,
                styles.textInputSecStyle,
              ]}
              customFlagStyle={Platform.OS === 'ios' && styles.countryFlagStyle}
              headerLabelStyle={styles.textInputHeaderLabelStyle}
              error={billingDetails.countryErrMsg}
            />
            {countryDropDown && country.length ? (
              <NationalityDropDown
                data={nationalityData?.locations}
                onPress={handleCountryPick}
              />
            ) : null}

            <View style={styles.firstLastNameContainerStyle}>
              {/* City text input */}
              <View style={styles.nameContainerStyle}>
                <Text style={styles.expCVCTextStyle}>{appConstants.City}</Text>
                <View style={styles.cvcContainerStyle}>
                  <TextInput
                    style={[
                      styles.textInputsStyle,
                      styles.secondTextInput,
                      {
                        bottom:
                          Platform.OS === 'ios' ? responsiveHeight(1) : null,
                      },
                    ]}
                    value={billingDetails.city}
                    onChangeText={(text: string) =>
                      handleOnChangeTextValues(text, appConstants.city)
                    }
                  />
                  <Image
                    tintColor={colors.color_C8C5C5}
                    style={styles.cvcImageStyle}
                    source={Icons.LOCATION_LOGO}
                  />
                </View>
                <Text numberOfLines={1} style={styles.errorMsgStyle}>
                  {billingDetails.cityErrMsg}
                </Text>
              </View>
              {/* Zip Code text input */}
              <View style={styles.nameContainerStyle}>
                <Text style={styles.expCVCTextStyle}>
                  {appConstants.zipCode}
                </Text>
                <TextInput
                  style={[
                    styles.textInputsStyle,
                    {bottom: Platform.OS === 'ios' ? -12 : null},
                  ]}
                  value={billingDetails.zipCode}
                  keyboardType="phone-pad"
                  onChangeText={(text: any) =>
                    handleOnChangeTextValues(text, appConstants.zipCode)
                  }
                  maxLength={10}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.errorMsgStyle,
                    {
                      marginTop:
                        Platform.OS === 'ios' ? responsiveHeight(3) : null,
                    },
                  ]}>
                  {billingDetails.zipCodeErrMsg}
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      {confirmmodalOpen && (
        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}>
          <View style={styles.mainContainer}>
            <View style={styles.modalView}>
              <Image
                style={styles.thankYouImageStyle}
                source={Images.THANKYOU_IMG}
              />
              <Text style={styles.thankyouTextStyle}>
                {appConstants.thankyou}
              </Text>
              <Text style={styles.detailsTextStyle}>
                {paymentResponse?.response?.data?.message}
              </Text>
              <View style={styles.buttonView}>
                <CustomButton
                  label={appConstants.done}
                  buttonStyle={[styles.buttonStyle, styles.buttonStyle]}
                  labelStyle={styles.labelStyle}
                  gradientStyle={styles.buttonStyle}
                  customButtonStyle={styles.buttonStyle}
                  onPress={homeNavigation}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
      {isKeyboardVisible ? null : (
        <HotelConfirmationBar
          roomPrice={roomPrice}
          confirmBooking={handleConfirmButtonPress}
        />
      )}
      {/* {isPaymentSucess && <HotelReserve />} */}
      {pamentFailure && <HotelPaymentFailureModal />}
      {paymentLoading && (
        <CustomLoader
          isLoading={paymentLoading}
          customLoaderStyle={styles.customLoaderStyle}
          loaderColor={colors.color_0094E6}
        />
      )}
      {countryLoader && (
        <CustomLoader
          isLoading={countryLoader}
          customLoaderStyle={styles.customLoaderStyle}
          loaderColor={colors.color_0094E6}
        />
      )}
    </>
  );
};

export default HotelPayment;