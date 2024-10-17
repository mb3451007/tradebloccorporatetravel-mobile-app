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
import FlightBottomPriceBar from '@src/components/flightBottomPriceBar/flightBottomPriceBar';
import {back} from '@src/navigation/navigationMethods';
import {CardNumberTextInput} from 'rn-credit-card-textinput';
import creditCardType from 'credit-card-type';
import commonMethods from '@src/utility/commonMethods';
import {RootState} from '@src/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {sendSubmit} from './slice/submitSlice';
import PaymentSuccessModal from '@src/components/paymentSuccessModal/paymentSuccessModal';
import CustomLoader from '@src/components/customLoader/customLoader';
import PaymentFailureModal from '@src/components/paymentFailureModal/paymentFailureModal';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {fetchNationality} from '@src/redux/appSlice/nationalitySlice';
import NationalityDropDown from '@src/components/nationalityDropDown/nationalityDropDown';
import moment from 'moment';

const Payment = (props: any) => {
  const {
    checkoutFetchedData,
    priceInArray,
    clubAccess,
    segmentData,
    itemData,
    totalAdults,
    totalChildrens,
    totalInfants,
    selectedSeats,
    selectedFlight,
  } = props?.route?.params;
  const navigation = useNavigation();
  // fetching one way flight data.
  const oneWayFlightData = useSelector(
    (state: RootState) => state?.onewayFlightSearch.searchedData,
  );
  const {fareFamilies} = oneWayFlightData.data;
  const paymentLoader = useSelector(
    (state: RootState) => state?.submit?.isLoading,
  );

  const nationalityData: any = useSelector(
    (state: RootState) => state?.nationality.nationalityData,
  );

  const nationalityLoader = useSelector(
    (state: RootState) => state?.nationality?.isLoading,
  );
  const paymentResponse = useSelector((state: RootState) => state?.submit);
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

  const [country, setCountry] = useState('');
  const [countryOrigin, setCountryOrigin] = useState('');
  const [countryDropDown, setCountryDropDown] = useState<boolean>(false);
  const [countryLoader, setCountryLoader] = useState(false);
  const [isPaymentSucess, setIsPaymentSucess] = useState<any>(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState<any>(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [pamentFailure, setPaymentFailure] = useState(false);
  const [countryErrMsg, setCountryErrMsg] = useState('');
  useEffect(() => {
    setPaymentLoading(paymentLoader);
  }, [paymentLoader]);

  useEffect(() => {
    setCountryLoader(nationalityLoader);
  }, [nationalityLoader]);

  useEffect(() => {
    if (paymentResponse?.resposne?.statusCode === statusCode.Code_200) {
      setIsPaymentSucess(true);
    } else if (paymentResponse?.err?.statusCode === statusCode.Code_500) {
      setPaymentFailure(true);
    } else {
      setIsPaymentSucess(false);
      setPaymentFailure(false);
    }
  }, [paymentResponse]);
  // Hook to hide the bottom tab bar
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: styles.tabBarStyle,
      });
  }, [navigation]);

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

  // Method to find the particular fare family data.
  const fareFamilyData: any = () => {
    if (segmentData !== undefined) {
      if (itemData === '') {
        const findedFamily = fareFamilies?.[segmentData?.fareFamiliy?.[0]];
        return [
          {
            name: findedFamily?.name,
            segRef: [0],
          },
        ];
      } else {
        const findedFamily = fareFamilies?.[itemData?.fareFamilies?.[0]];
        return [
          {
            name: findedFamily?.name,
            segRef: [0],
          },
        ];
      }
    } else {
      return [
        {
          name: selectedFlight?.name,
          segRef: [0, 1],
        },
      ];
    }
  };

  // Method to find the selected seat information.
  const selectedSeatDataMethod: any = () => {
    return selectedSeats?.map((el: any) => {
      return {
        seatNo: `${el?.seatNumber}${el?.seatColumn}`,
      };
    });
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
      address: billingDetails.address.trim(),
      city: billingDetails.city.trim(),
      country: countryOrigin,
      zip: billingDetails.zipCode.trim(),
    };
  };

  // Method to handle the price details data.
  const priceDetailsData: any = () => {
    if (Array.isArray(checkoutFetchedData)) {
      const pr = priceInArray?.reduce((a: any, b: any) => a + b, 0);
      const totPrice = pr + clubAccess;
      return Number(totPrice.toFixed(2));
    } else {
      const pr = checkoutFetchedData?.price;
      const totPrice = pr + clubAccess;
      return Number(totPrice.toFixed(2));
    }
  };

  // Method to get the particular seat info.
  const getParticularSeatsInfo: any = (ind: any) => {
    const seat = selectedSeats?.[ind];

    if (seat?.flightId !== undefined) {
      return [
        {
          flightId: seat?.flightId,
          seat: `${seat?.seatNumber}${seat?.seatColumn}`,
          flightTatto: ind,
        },
      ];
    } else {
      return [];
    }
  };

  // Method to get the total passengar data.
  const totalPassengersData: any = () => {
    const passengar = totalAdults?.concat(totalChildrens).concat(totalInfants);
    return passengar?.map((el: any, ind: any) => {
      const date = `${el.dob.slice(6)}-${el.dob.slice(0, 2)}-${el.dob.slice(
        3,
        5,
      )}${appConstants.T000000000Z}`;

      return {
        gender:
          el.gender === appConstants.male ? appConstants.M : appConstants.F,
        firstName: el.firstName.trim(),
        surname: el.lastName.trim(),
        dateOfBirth: `${date.trim()}`,
        type:
          el.name === appConstants.adult
            ? appConstants.ADT
            : el.name === appConstants.child
            ? appConstants.CHD
            : appConstants.INF,
        passportDetail: {
          countryCode: el.nationFlag,
          expiry:
            el?.passportExp === ''
              ? null
              : Platform.OS === 'ios'
              ? moment(el.passportExp, appConstants.MMDDYYY)
                  .format(appConstants.DDMMMYY)
                  .trim()
              : moment(el.passportExp).format(appConstants.DDMMMYY).trim(),
          number: el.passportNum === '' ? null : el.passportNum.trim(),
        },
        seats: getParticularSeatsInfo(ind),
        email: el.email.trim().toLowerCase(),
        phone: `${el.countryCode} ${el.phone.trim()}`,
      };
    });
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

  // Mehtod to get the booking class data
  const getBookingClass: any = (ind: any) => {
    if (Array.isArray(checkoutFetchedData)) {
      const flights = checkoutFetchedData.map((el: any) => el?.flightIdnt);

      const totFlights = flights.flat();
      return totFlights[ind]?.bookingClass;
      // return checkoutFetchedData?.map((cl: any, i:any) => {
      //   return cl?.flightIdnt?.[ind]?.bookingClass[ind];
      // });
    } else {
      if (Array.isArray(checkoutFetchedData?.flightIdnt)) {
        return checkoutFetchedData?.flightIdnt?.[ind]?.bookingClass;
      } else {
        return checkoutFetchedData?.flightIdnt?.bookingClass;
      }
    }
  };

  // Method to get flight data to dispatch
  const flightsDataToDispatch: any = () => {
    if (segmentData !== undefined) {
      return segmentData?.flights?.map((el: any, ind: any) => {
        return {
          departure_date: el?.departure.date,
          departure_time: el?.departure.time,
          arrival_date: el?.arrival.date,
          arrival_time: el?.arrival.time,
          boarding_airport: el?.departure.airportCode,
          off_airport: el?.arrival.airportCode,
          marketing_company: el?.marketingCarrier,
          operating_carrier: el?.operatingCarrier,
          flight_number: el?.flightOrtrainNumber,
          booking_class: getBookingClass(ind),
        };
      });
    } else {
      return selectedFlight?.flights?.map((el: any, ind: any) => {
        return {
          departure_date: el?.departure.date,
          departure_time: el?.departure.time,
          arrival_date: el?.arrival.date,
          arrival_time: el?.arrival.time,
          boarding_airport: el?.departure.airportCode,
          off_airport: el?.arrival.airportCode,
          marketing_company: el?.marketingCarrier,
          operating_carrier: el?.operatingCarrier,
          flight_number: el?.flightOrtrainNumber,
          booking_class: getBookingClass(ind),
        };
      });
    }
  };

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
      } else if (text.length <= 1) {
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
      } else if (text.length <= 2) {
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
      } else if (text.length < 5) {
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

  // Get from data
  const getFromData: any = () => {
    if (segmentData !== undefined) {
      return segmentData?.departure;
    } else {
      return selectedFlight?.departure;
    }
  };

  // Get To data
  const getToData: any = () => {
    if (segmentData !== undefined) {
      return segmentData?.arrival;
    } else {
      return selectedFlight?.arrival;
    }
  };

  const handleCountry = (text: any) => {
    setCountryOrigin('');
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
      setCountryErrMsg('');
    }
  };
  const handleCountryPick = (item: any) => {
    setCountry(item?.name);
    setCountryOrigin(item?.code);
    setCountryDropDown(false);
    setCountryErrMsg('');
  };

  // Method to handle the comfirm button
  const handleConfirmButtonPress: any = () => {
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
    } else if (country === '' || countryOrigin === '') {
      setCountryErrMsg(validations.enterCountry);
      commonMethods.flashMessage(
        validations.enterCountry,
        flashMessageConstants.danger,
      );
      return;
    } else if (countryErrMsg !== '') {
      commonMethods.flashMessage(countryErrMsg, flashMessageConstants.danger);
      return;
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

      const submiDataToDispatch: any = {
        sessionID: sessionID,
        userEmail: null,
        flights: flightsDataToDispatch(),
        from: getFromData(),
        to: getToData(),
        isRound:
          segmentData === undefined ? appConstants.round : appConstants.oneWay,
        price: {
          total: priceDetailsData(),
          currency: appConstants.usd,
          tax: 0,
        },
        bookerEmail: billingDetails.email.trim().toLowerCase(),
        bookerPhone: `${billingDetails.code} ${billingDetails.phone.trim()}`,
        fareFamilies: fareFamilyData(),
        selectedSeats: selectedSeatDataMethod(),
        card_detail: cardDetailsData(),
        payment_detail: paymentDetailsData(),
        passengers: totalPassengersData(),
        gateway: appConstants.card,
      };
      dispatch(sendSubmit(submiDataToDispatch));
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.keyBoardAwareStyle}>
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
            source={Images.APP_FLIGHT_SEARCHBG}
          />
          <View style={styles.paymentHeaderContainerStyle}>
            <CustomHeader
              leftIcon={Icons.BACK_LOGO}
              lefticonOnPress={() => back()}
              leftIconStyle={styles.headerLeftIconStyle}
              headerLabel={appConstants.flightCheckOut}
              headerLabelStyle={styles.headerLabelStyle}
            />
            <Image style={styles.stepfromStyle} source={Icons.PAYMENTSTEP} />
          </View>
          <Image style={styles.cardStyle} source={Icons.CARD} />
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
                <Text style={styles.expCVCTextStyle}>
                  {appConstants.cardExpiration}
                </Text>
                <TextInput
                  style={[
                    styles.textInputsStyle,
                    {bottom: Platform.OS === 'ios' ? -10 : null},
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
                        Platform.OS === 'ios' ? responsiveHeight(2.5) : null,
                    },
                  ]}>
                  {cardDetails.cardExpErrMsg}
                </Text>
              </View>

              {/* secondTextInput */}
              <View style={styles.expCVCContainerStyle}>
                <Text style={styles.expCVCTextStyle}>
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
                    style={[styles.textInputsStyle, styles.secondTextInput]}
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
                    {bottom: Platform.OS === 'ios' ? -12 : null},
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
              flag={
                billingDetails.flag === ''
                  ? `${flagURL.flaghhtp}${'us'}${flagURL.wedp}`
                  : `${flagURL.flaghhtp}${billingDetails.flag.toLowerCase()}${
                      flagURL.wedp
                    }`
              }
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
              headerLabelStyle={styles.textInputHeaderLabelStyle}
              error={billingDetails.countryErrMsg}
              customFlagStyle={Platform.OS === 'ios' && styles.countryFlagStyle}
            />
            {countryDropDown &&
            country.length &&
            nationalityData?.locations?.length > 0 ? (
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
                    style={[styles.textInputsStyle, styles.secondTextInput]}
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
      {isKeyboardVisible ? null : (
        <FlightBottomPriceBar
          checkoutFetchedData={checkoutFetchedData}
          priceInArray={priceInArray}
          clubAccess={clubAccess}
          label={appConstants.confirm}
          onPress={handleConfirmButtonPress}
        />
      )}
      {isPaymentSucess && <PaymentSuccessModal />}
      {pamentFailure && <PaymentFailureModal />}
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

export default Payment;
