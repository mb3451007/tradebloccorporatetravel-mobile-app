/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  BackHandler,
  Platform,
  ScrollView,
} from 'react-native';
import {Icons, Images} from '@src/assets';
import colors from '@src/constants/colors';
import CustomHeader from '@src/components/customHeader/customHeader';
import navigationConstants from '@src/constants/navigationConstants';
import {back, navigate} from '@src/navigation/navigationMethods';
import CalendarPicker from 'react-native-calendar-picker';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import appConstants, {flagURL, validations} from '@src/constants/appConstants';
import CustomMainStackInput from '@src/components/customTextInput(mainStack)/customMainStackInput';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import regex from '@src/utility/regex';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {CountryPicker} from 'react-native-country-codes-picker';
import parsePhoneNumberFromString, {AsYouType} from 'libphonenumber-js';
import NationalityDropDown from '@src/components/nationalityDropDown/nationalityDropDown';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import CustomLoader from '@src/components/customLoader/customLoader';
import {fetchNationality} from '@src/redux/appSlice/nationalitySlice';
import HotelConfirmationBar from '@src/components/customBarforhotelConfirmation/customBarforhotelConfirmation';
import {genderText} from '@src/utility/enums/staticEnums';
import commonStyles from '@src/utility/commonStyles';

const HotelCheckOut = (props: any) => {
  const dispatch = useDispatch();
  const rooms = props?.route?.params?.rooms;
  let completePayload = props?.route?.params?.completePayload;
  const RoomPrice = props?.route?.params?.roomPrice;
  const maxDate = new Date();
  console.log(rooms, 'rooms', completePayload);

  const [formData, setFormData] = useState(completePayload?.details?.rooms);
  console.log(formData, 'formdata');

  const nationalityData: any = useSelector(
    (state: RootState) => state?.nationality?.nationalityData,
  );
  const nationalityLoader = useSelector(
    (state: RootState) => state?.nationality?.isLoading,
  );
  const [nationalityLoading, setNationalityLoading] = useState(false);
  useEffect(() => {
    setNationalityLoading(nationalityLoader);
  }, [nationalityLoader]);

  useEffect(() => {
    // completePayload?.details?.rooms?.forEach((room: any) => {
    //   room.guests = [];
    // });
    let guestObject = {
      guestId: '',
      type: 'adult',
      typeCode: '',
      age: '',
      status: '',
      roomStatus: '',
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      showDateofBirth: '',
      nationality: '',
      nationalityName: '',
      phone: '',
      email: '',
      phoneNumberWithCode: '+1',
      flag: '',
      openCalender: false,
      nationalityPicker: false,
      nationFlag: '',
      firstNameError: '',
      lastNameError: '',
      genderError: '',
      dateOfBirthError: '',
      nationalityError: '',
      countryCodeError: '',
      phoneNoError: '',
      emailError: '',
    };
    const result = completePayload?.details?.rooms?.map((obj: any) => {
      let count = obj?.adults + obj?.children;
      return count;
    });
    console.log(result, 'result');
    let idCounter = 0;
    const formTemp = formData.map((item: any, index: number) => {
      console.log(item, 'item');
      const guestTemp = [];
      for (let i = 0; i < result[index]; i++) {
        idCounter += 1;
        guestTemp.push({
          id: idCounter,
          ...guestObject,
        });
      }
      console.log(guestTemp, 'guestTRemp');

      return {
        ...item,
        id: index + 1,
        guests: guestTemp,
      };
    });
    console.log(formTemp, 'formTemp');

    setFormData(formTemp);
    if (formTemp && formTemp.length > 0) {
      const initialSection: any = {};
      console.log(formTemp, 'formTemp-=-=-=-=');
      formTemp?.forEach((room: any, roomId: any) => {
        initialSection[roomId] = {};
        if (room.guests && room.guests.length > 0) {
          room?.guests?.forEach((guest: any, guestIndex: any) => {
            if (guest.type === 'adult') {
              initialSection[roomId][guestIndex] = {[0]: true};
            }
          });
        }
      });
      console.log(initialSection, 'initi');

      setSelectedAdultOption(initialSection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [dobb, setDobb] = useState<any>('');
  const navigation = useNavigation();

  // Hook to hide the bottom tab bar
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

  // Hook to hide the bottom tab bar
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

  const handleOnBackIconPress = () => {
    back();
  };

  const [selectedOption, setSelectedOption] = useState(
    Array(rooms?.length).fill(true),
  );
  const toggleShowData = (index: any) => {
    setSelectedOption((prevState: any) => {
      const newOption = [...prevState];
      newOption[index] = !newOption[index];
      return newOption;
    });
  };

  // Selectde options for adult
  const [selectedAdultOption, setSelectedAdultOption] = useState<any>({});
  const toggleShowAdultData = (roomId: any, adultIndex: any) => {
    let data = {
      ...selectedAdultOption,
      [roomId]: {
        ...selectedAdultOption[roomId],
        [adultIndex]: !selectedAdultOption[roomId]?.[adultIndex],
      },
    };
    console.log(data, 'data');

    setSelectedAdultOption((prevState: any) => ({
      ...prevState,
      [roomId]: {
        ...prevState[roomId],
        [adultIndex]: !prevState[roomId]?.[adultIndex],
      },
    }));
  };

  //selceted options for child
  const [selectedChildOption, setSelectedChildOption] = useState<any>({});
  const toggleShowChildData = (roomId: any, childIndex: any) => {
    setSelectedChildOption((prevState: any) => ({
      ...prevState,
      [roomId]: {
        ...prevState[roomId],
        [childIndex]: !prevState[roomId]?.[childIndex],
      },
    }));
  };

  // Method for handle first name
  const handleFirstNameData = (
    text: any,
    type: any,
    roomId: any,
    adultIndex: any,
    idIndex: any,
  ) => {
    if (text === '') {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  firstNameError: validations.enterFirstName,
                  firstName: text,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    } else if (text.length <= 1) {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  firstNameError: validations.tooShort,
                  firstName: text,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    }
    return formData?.map((obj: any) => {
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              return {
                ...innerItem,
                firstName: text,
                guestId: adultIndex + 1,
                type: type,
                firstNameError: '',
                typeCode: type === 'ADT' ? 10 : 8,
                status: idIndex - 1 === 0 && adultIndex === 0 ? 'BHO' : 'BOP',
                roomStatus: adultIndex === 0 ? 'RMO' : 'ROP',
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };
  let maxlength = 10;

  //Method for handle last name
  const handleLastNameData = (
    text: any,
    type: any,
    roomId: any,
    adultIndex: any,
  ) => {
    if (text === '') {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  lastNameError: validations.enterLastName,
                  lastName: text,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    } else if (text.length <= 1) {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  lastNameError: validations.tooShort,
                  lastName: text,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    }
    return formData?.map((obj: any) => {
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              return {
                ...innerItem,
                lastName: text,
                lastNameError: '',
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };

  // Method for handle gender
  const handleGender = (
    option: any,
    type: any,
    roomId: any,
    adultIndex: any,
  ) => {
    return formData?.map((obj: any) => {
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              return {
                ...innerItem,
                gender: option?.id,
                genderError: '',
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };
  //method for getting current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now?.getHours()?.toString().padStart(2, '0');
    const minutes = now?.getMinutes()?.toString().padStart(2, '0');
    const seconds = now?.getSeconds()?.toString().padStart(2, '0');
    const ampm = now?.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };
  // Method for hanbdle date of birth
  const handleDOB = (text: any, type: any, roomId: any, adultIndex: any) => {
    let dateTime: any;
    let showdateTime: any;

    let userAgetext: any;
    if (typeof text === 'object') {
      userAgetext = moment(text).format(appConstants.MMDDYYY);
      dateTime = `${moment(text).format(
        appConstants.MDYYYY,
      )}${','} ${'12:00:00 AM'}`;
      showdateTime = moment(text).format(appConstants.MMDDYYY);
      return formData?.map((obj: any) => {
        const month = parseInt(userAgetext?.substring(0, 2), 10);
        const day = parseInt(userAgetext?.substring(3, 5), 10);
        const year = parseInt(userAgetext?.substring(6), 10);
        const today = new Date();

        const userBirth = new Date(today.getFullYear(), month - 1, day);
        let userAge: any;
        if (today >= userBirth) {
          userAge = today?.getFullYear() - year;
        } else {
          userAge = today?.getFullYear() - year - 1;
        }
        // }
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  dateOfBirth: dateTime,
                  showDateofBirth: showdateTime,
                  age: userAge,
                  openCalender: false,
                  dateOfBirthError: '',
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    }
    if (text === '') {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  dateOfBirthError: validations.enterValidDateFormat,
                  showDateofBirth: showdateTime,
                  dateOfBirth: dateTime,
                  openCalender: false,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    } else if (text.length < 10) {
      if (text.length > 10) {
        text = text.substring(0, 10);
      }

      switch (text.length) {
        case 1:
          if (text > 3) {
            text = '3';
          }
          break;
        case 2:
          if (text > 12) {
            text = '12';
          }
          break;
        case 3:
        case 4:
          if (text[2] !== '/') {
            text = text.substr(0, 2) + '/' + text[2];
          }
          if (text[3] > 3) {
            text = text.substr(0, 3) + '3';
          }
          break;
        case 5:
          if (text.substr(3, 2) > 31) {
            text = text.substr(0, 3) + '31';
          }
          break;
        case 6:
        case 7:
          if (text[5] !== '/') {
            text = text.substr(0, 5) + '/' + text[5];
          }
          if (text[6] < 1) {
            text = text.substr(0, 6) + '1';
          }
          break;
        default:
          break;
      }
      if (text) {
        dateTime = text;
        showdateTime = text;
      }
      // console.log(text,'text');
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  dateOfBirthError: validations.enterValidDateFormat,
                  showDateofBirth: showdateTime,
                  dateOfBirth: dateTime,
                  openCalender: false,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    } else if (!regex.dateFormatRegex.test(text)) {
      console.log(text, 'text');
      dateTime = text;
      showdateTime = text;
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  dateOfBirthError: validations.enterValidDateFormat,
                  showDateofBirth: showdateTime,
                  dateOfBirth: dateTime,
                  openCalender: false,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    } else if (!moment(text, 'MM/DD/YYYY').isBefore(moment())) {
      console.log(text, 'text');
      dateTime = text;
      showdateTime = text;
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  dateOfBirthError: validations.enterValidDateFormat,
                  showDateofBirth: showdateTime,
                  dateOfBirth: dateTime,
                  openCalender: false,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    }
    return formData?.map((obj: any) => {
      if (text.length === 10) {
        userAgetext = text;
        console.log(
          text,
          'date',
          moment(text, 'MM/DD/YYYY').format('M/D/YYYY'),
        );
        dateTime = `${moment(text, 'MM/DD/YYYY').format(
          appConstants.MDYYYY,
        )}${','} ${'12:00:00 AM'}`;
        showdateTime = text;
        // setDobb(`${text} ${getCurrentTime()}`);
      }
      const month = parseInt(userAgetext?.substring(0, 2), 10);
      const day = parseInt(userAgetext?.substring(3, 5), 10);
      const year = parseInt(userAgetext?.substring(6), 10);
      const today = new Date();

      const userBirth = new Date(today.getFullYear(), month - 1, day);
      let userAge: any;
      if (today >= userBirth) {
        userAge = today?.getFullYear() - year;
      } else {
        userAge = today?.getFullYear() - year - 1;
      }
      console.log(dateTime, 'datetime');

      // }
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              return {
                ...innerItem,
                dateOfBirth: dateTime,
                showDateofBirth: showdateTime,
                age: userAge,
                openCalender: false,
                dateOfBirthError: '',
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };

  //method for handle nationality

  const handleNationality = (
    text: any,
    type: any,
    roomId: any,
    adultIndex: any,
  ) => {
    if (text === '') {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  nationalityError: validations.enterNationality,
                  nationalityPicker: false,
                  nationalityName: text,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    }
    return formData?.map((obj: any) => {
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              const params: any = {
                term: text,
                locale: appConstants.en_US,
                location_types: appConstants.countryAPI,
                active_only: false,
                sort: appConstants.nameAPI,
              };
              dispatch(fetchNationality(params));
              return {
                ...innerItem,
                nationalityPicker: true,
                nationalityName: text,
                nationalityError: '',
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };

  const handleNationalityFlag = (
    text: any,
    type: any,
    roomId: any,
    adultIndex: any,
  ) => {
    if (text === '') {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  nationalityError: validations.enterNationality,
                  nationalityPicker: false,
                  nationalityName: text,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    }
    return formData?.map((obj: any) => {
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              return {
                ...innerItem,
                nationFlag: text?.code,
                nationalityPicker: false,
                nationality: text?.id,
                nationalityName: text?.name,
                nationalityError: '',
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };

  const [selectedCountry, setSelectedCountry] = useState<any>('');
  const [showphoneNo, setShowphoneNo] = useState(false);

  const getMaxPhoneNumberLength = () => {
    // try{
    const phoneNumberObj = parsePhoneNumberFromString('', selectedCountry);
    return phoneNumberObj ? phoneNumberObj.nationalNumber.length : 12;
    // }
  };

  // Method for handle phoneno code
  const handlePhoneNoCode = (
    item: any,
    type: any,
    roomId: any,
    adultIndex: any,
  ) => {
    setShowphoneNo(false);
    setSelectedCountry(item?.code);

    return formData?.map((obj: any) => {
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              return {
                ...innerItem,
                phoneNumberWithCode: item?.dial_code,
                // nationalityPicker: false,
                flag: item?.code,
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };
  // Method for handle phoneno
  const handlePhoneNo = (
    text: any,
    type: any,
    roomId: any,
    adultIndex: any,
  ) => {
    // });
    let formattedNo: any;
    if (text === '') {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  phoneNoError: validations.enterPhone,
                  // nationalityPicker: false,
                  phone: formattedNo,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    } else if (text?.length < 6) {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  phoneNoError: validations.enterPhone,
                  // nationalityPicker: false,
                  phone: text,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    }
    return formData?.map((obj: any) => {
      formattedNo = new AsYouType(selectedCountry).input(text);
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              return {
                ...innerItem,
                phone: formattedNo,
                // nationalityPicker: false,
                phoneNoError: '',
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };

  // Method for open Date calender
  const handledobCalender = (roomId: any, adultIndex: any) => {
    return formData?.map((obj: any) => {
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              return {
                ...innerItem,
                openCalender: true,
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };

  // Method for handle email
  const handleEmailId = (
    text: any,
    type: any,
    roomId: any,
    adultIndex: any,
  ) => {
    if (text === '') {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  email: text,
                  emailError: validations?.enterEmail,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    }

    if (!regex.emailRegex.test(text)) {
      return formData?.map((obj: any) => {
        if (roomId === obj?.id) {
          return {
            ...obj,
            guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
              if (innerIndex === adultIndex) {
                return {
                  ...innerItem,
                  email: text,
                  emailError: validations?.enterValidEmail,
                };
              } else {
                return innerItem;
              }
            }),
          };
        } else {
          return obj;
        }
      });
    }
    return formData?.map((obj: any) => {
      if (roomId === obj?.id) {
        return {
          ...obj,
          guests: obj?.guests?.map((innerItem: any, innerIndex: any) => {
            if (innerIndex === adultIndex) {
              return {
                ...innerItem,
                email: text,
                emailError: '',
              };
            } else {
              return innerItem;
            }
          }),
        };
      } else {
        return obj;
      }
    });
  };
  const onSubmit = () => {
    const result = formData.map((el: any) => {
      if (el?.guests?.length > 0) {
        return {
          ...el,
          guests: el?.guests?.map((item: any) => {
            if (item.gender === '') {
              return {
                ...item,
                genderError: validations.selectGender,
              };
            } else if (item.firstName === '') {
              return {
                ...item,
                firstNameError: validations.enterFirstName,
              };
            } else if (item.lastName === '') {
              return {
                ...item,
                lastNameError: validations.enterLastName,
              };
            } else if (item.dateOfBirth === '') {
              return {
                ...item,
                dateOfBirthError: validations.enterValidDateFormat,
              };
            } else if (item.nationality === '') {
              return {
                ...item,
                nationalityError: validations.enterNationality,
              };
            } else if (item.nationalityPicker === true) {
              return {
                ...item,
                nationalityError: validations.enterNationality,
              };
            } else if (item.phone === '') {
              return {
                ...item,
                phoneNoError: validations.enterPhone,
              };
            } else if (item.email === '') {
              return {
                ...item,
                emailError: validations?.enterEmail,
              };
            } else {
              return item;
            }
          }),
        };
      }
    });
    console.log(result, 'result');

    setFormData(result);
    const response = result?.map((el: any) => {
      if (el?.guests?.length > 0) {
        return el?.guests.find(
          (item: any) =>
            item.genderError ||
            item.firstNameError ||
            item.lastNameError ||
            item.nationalityError ||
            item.dateOfBirthError ||
            item.phoneNoError ||
            item.emailError,
        );
      }
    });
    const undefinedResponse = response?.every(
      (value: any) => value === undefined,
    );
    if (undefinedResponse) {
      console.log(JSON.stringify(formData), 'formdata');

      const uploadFormat = formData.map((item: any) => {
        const guest: any = [];
        if (item?.guests?.length > 0) {
          item.guests.forEach((el: any) => {
            guest.push({
              age: el.age,
              dateOfBirth: el.dateOfBirth,
              email: el.email,
              firstName: el.firstName,
              gender: el.gender,
              guestId: el.guestId,
              id: el.id,
              lastName: el.lastName,
              nationality: el.nationality,
              phone: `${el.phoneNumberWithCode} ${el.phone}`,
              roomStatus: el.roomStatus,
              status: el.status,
              type: el.type,
              typeCode: el.typeCode,
            });
          });
        }

        return {
          adults: item.adults,
          bookingCode: item.bookingCode,
          children: item.children,
          childrenAge: item.childrenAge,
          guests: guest,
          ratePlan: item.ratePlan,
          roomType: item.roomType,
        };
      });
      console.log(uploadFormat, 'uploadFormat');
      // // completePayload.details.rooms =  uploadFormat;
      // completePayload?.details?.rooms?.splice(
      //   0,
      //   completePayload?.details?.rooms?.length,
      //   ...uploadFormat,
      // );
      const updateCompletePayload = {
        ...completePayload,
        details: {
          ...completePayload.details,
          rooms: uploadFormat,
        },
      };
      console.log(completePayload, updateCompletePayload, 'completepayload');

      navigate(navigationConstants.HOTEL_PAYMENT, {
        completePayload: updateCompletePayload,
        RoomPrice,
      });
    }
  };

  //render method for adults
  const renderItemForAdult = ({
    item: {roomId, adultindex, type, guest, idIndex},
  }: any) => {
    return (
      <View style={styles.checkOutTicketStyle}>
        <TouchableOpacity
          onPress={() => toggleShowAdultData(roomId, adultindex)}>
          <View style={styles.refundableView}>
            <View>
              <Text style={styles.adultTxt}>
                {appConstants.adult} {adultindex + 1}
              </Text>
            </View>

            <Image
              source={
                selectedAdultOption[roomId]?.[adultindex]
                  ? Icons.Drop_Up
                  : Icons.Drop_Down
              }
            />

            {/* <TouchableOpacity
              onPress={() => handlePassengerFields(index, adt.name)}
              activeOpacity={appConstants.activeOpacity}
              style={styles.priceContainerStyle}>
              <Text style={styles.nonRefTextStyle}>
                {appConstants.refundable}
              </Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
        {selectedAdultOption[roomId]?.[adultindex] && (
          <View>
            <Text style={styles.infoTxt}>
              {appConstants.InformationtextForHotelCheckout}
            </Text>

            <View style={styles.line} />
            <View style={styles.contentContainer}>
              {genderText.map((option: any, index: any) => {
                return (
                  <View key={index} style={styles.contentContainer}>
                    <TouchableOpacity
                      key={index}
                      activeOpacity={appConstants.activeOpacity}
                      // error={guest?.genderError}
                      onPress={() => {
                        setFormData(
                          handleGender(option, type, roomId, adultindex),
                        );
                      }}
                      style={styles.contentContainer}>
                      <Image
                        source={
                          guest?.gender === option?.id
                            ? Icons.CHECKED_BOX
                            : Icons.EMPTY_CHECKBOX
                        }
                      />
                      <Text style={styles.contentTextStyle}>
                        {option?.option}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            {guest?.genderError && (
              <Text style={styles.errorMsg}>{guest?.genderError}</Text>
            )}

            <CustomMainStackInput
              label={`${appConstants.first} ${appConstants.name}`}
              value={guest?.firstName}
              error={guest?.firstNameError}
              onChangeText={(text: string) => {
                setFormData(
                  handleFirstNameData(text, type, roomId, adultindex, idIndex),
                );
              }}
              source={Icons.USERLOGO}
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosStyle
              }
            />

            <CustomMainStackInput
              label={`${appConstants.last} ${appConstants.name}`}
              value={guest?.lastName}
              error={guest?.lastNameError}
              onChangeText={(text: string) => {
                setFormData(handleLastNameData(text, type, roomId, adultindex));
              }}
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosSecStyle
              }
            />

            <CustomMainStackInput
              label={appConstants.dob}
              value={guest?.showDateofBirth?.slice(0, 10)}
              error={guest?.dateOfBirthError}
              source={Icons.CALENDER_LOGO}
              placeholder={appConstants.MMDDYYY}
              placeholderTextColor={colors.color_BBBBBB}
              maxlength={maxlength}
              rightIconTintColor={colors.color_BBBBBB}
              customRightIconStyle={styles.calendarStyle}
              rightIconOnPress={() =>
                setFormData(handledobCalender(roomId, adultindex))
              }
              keyboardType="numeric"
              onChangeText={(text: any) =>
                setFormData(handleDOB(text, type, roomId, adultindex))
              }
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosStyle
              }
            />
            {guest?.openCalender === true && (
              <View style={styles.calenderPickerStyle}>
                <CalendarPicker
                  onDateChange={(text: any) =>
                    setFormData(handleDOB(text, type, roomId, adultindex))
                  }
                  width={responsiveWidth(90)}
                  startFromMonday={true}
                  maxDate={maxDate}
                  textStyle={{color: colors.color_000}}
                  previousTitleStyle={commonStyles.calendarTextStyle}
                  nextTitleStyle={commonStyles.calendarTextStyle}
                />
                {/* <DatePicker
        isVisible={guest?.openCalender}
        // minDate={minDate}
        mode="single"
        onConfirm={(date) =>  setFormData(handleDOB(date, type, roomId, adultindex))}
        onCancel={() => {
          guest?.openCalender === false;
        }}
      /> */}
              </View>
            )}

            <CustomMainStackInput
              label={appConstants.nationality}
              value={guest?.nationalityName}
              error={guest?.nationalityError}
              leftIcon={Icons?.DROPDOWN_ARROW}
              leftIconTintColor={colors.color_fff}
              flag={`${flagURL.flaghhtp}${guest?.nationFlag.toLowerCase()}${
                flagURL.wedp
              }`}
              countryCode={' '}
              onChangeText={(text: any) =>
                setFormData(handleNationality(text, type, roomId, adultindex))
              }
              source={Icons.SMALLPLANE}
              textInputCustomStyle={
                Platform.OS === 'ios'
                  ? styles.textInputIosStyle
                  : styles.textInputCustomStyle
              }
              customFlagStyle={Platform.OS === 'ios' && styles.countryFlagStyle}
            />

            {guest?.nationalityPicker &&
            guest?.nationalityName.length &&
            nationalityData?.locations?.length ? (
              <View style={{marginTop: responsiveHeight(2)}}>
                <NationalityDropDown
                  data={nationalityData?.locations}
                  onPress={(text: any) =>
                    setFormData(
                      handleNationalityFlag(text, type, roomId, adultindex),
                    )
                  }
                />
              </View>
            ) : null}
            {guest?.nationalityPicker &&
              guest?.nationalityName.length &&
              nationalityData?.locations?.length === 0 && (
                <Text style={styles.nodataTextStyle}>Result not found</Text>
              )}

            <CustomMainStackInput
              label={appConstants.phone}
              value={guest?.phone}
              error={guest?.phoneNoError || guest?.countryCodeError}
              leftIcon={Icons.DROPDOWN_ARROW}
              maxlength={getMaxPhoneNumberLength()}
              leftIconOnPress={() => setShowphoneNo(true)}
              onChangeText={(text: any) => {
                setFormData(handlePhoneNo(text, type, roomId, adultindex));
              }}
              flag={
                guest?.flag === ''
                  ? `${flagURL.flaghhtp}${'us'}${flagURL.wedp}`
                  : `${flagURL.flaghhtp}${guest?.flag?.toLowerCase()}${
                      flagURL.wedp
                    }`
              }
              keyboardType={'phone-pad'}
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosStyle
              }
            />
            <CountryPicker
              enableModalAvoiding={true}
              initialState={'+1'}
              searchMessage="search"
              show={showphoneNo}
              pickerButtonOnPress={(item: any) => {
                setFormData(handlePhoneNoCode(item, type, roomId, adultindex));
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
              label={appConstants.email}
              value={guest?.email}
              error={guest?.emailError}
              onChangeText={(text: any) => {
                setFormData(handleEmailId(text, type, roomId, adultindex));
              }}
              source={Icons.Email_LOGO}
              rightIconTintColor={colors.color_BBBBBB}
              keyboardType={'email-address'}
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosStyle
              }
            />
          </View>
        )}
      </View>
    );
  };

  //render method for childrens
  const renderItemForChild = ({
    item: {roomId, childindex, type, guest, idIndex},
  }: any) => {
    return (
      <View style={styles.checkOutTicketStyle}>
        <TouchableOpacity
          onPress={() => toggleShowChildData(roomId, childindex)}>
          <View style={styles.refundableView}>
            <View>
              <Text style={styles.adultTxt}>
                {appConstants.children} {childindex}
              </Text>
            </View>

            <Image
              source={
                selectedChildOption[roomId]?.[childindex]
                  ? Icons.Drop_Up
                  : Icons.Drop_Down
              }
            />
          </View>
        </TouchableOpacity>
        {selectedChildOption[roomId]?.[childindex] && (
          <View>
            <Text style={styles.infoTxt}>
              {appConstants.InformationtextForHotelCheckout}
            </Text>

            <View style={styles.line} />
            <View style={styles.contentContainer}>
              {genderText.map((option: any, index: any) => {
                return (
                  <View key={index} style={styles.contentContainer}>
                    <TouchableOpacity
                      key={index}
                      activeOpacity={appConstants.activeOpacity}
                      onPress={() => {
                        setFormData(
                          handleGender(option, type, roomId, childindex),
                        );
                      }}
                      style={styles.contentContainer}>
                      <Image
                        source={
                          guest?.gender === option.id
                            ? Icons.CHECKED_BOX
                            : Icons.EMPTY_CHECKBOX
                        }
                      />
                      <Text style={styles.contentTextStyle}>
                        {option.option}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            {guest?.genderError && (
              <Text style={styles.errorMsg}>{guest?.genderError}</Text>
            )}
            <CustomMainStackInput
              label={`${appConstants.first} ${appConstants.name}`}
              value={guest?.firstName}
              error={guest?.firstNameError}
              onChangeText={(text: string) => {
                setFormData(
                  handleFirstNameData(text, type, roomId, childindex, idIndex),
                );
              }}
              source={Icons.USERLOGO}
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosStyle
              }
            />

            <CustomMainStackInput
              label={`${appConstants.last} ${appConstants.name}`}
              value={guest?.lastName}
              error={guest?.lastNameError}
              onChangeText={(text: string) => {
                setFormData(handleLastNameData(text, type, roomId, childindex));
              }}
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosSecStyle
              }
            />

            <CustomMainStackInput
              label={appConstants.dob}
              value={guest?.showDateofBirth?.slice(0, 10)}
              error={guest?.dateOfBirthError}
              source={Icons.CALENDER_LOGO}
              placeholder={appConstants.MMDDYYY}
              placeholderTextColor={colors.color_BBBBBB}
              maxlength={maxlength}
              rightIconTintColor={colors.color_BBBBBB}
              customRightIconStyle={styles.calendarStyle}
              rightIconOnPress={() =>
                setFormData(handledobCalender(roomId, childindex))
              }
              keyboardType="numeric"
              onChangeText={(text: any) =>
                setFormData(handleDOB(text, type, roomId, childindex))
              }
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosStyle
              }
            />
            {guest?.openCalender && (
              <View style={styles.calenderPickerStyle}>
                <CalendarPicker
                  onDateChange={(text: any) =>
                    setFormData(handleDOB(text, type, roomId, childindex))
                  }
                  width={responsiveWidth(90)}
                  startFromMonday={true}
                  maxDate={maxDate}
                  textStyle={{color: colors.color_000}}
                  previousTitleStyle={commonStyles.calendarTextStyle}
                  nextTitleStyle={commonStyles.calendarTextStyle}
                />
              </View>
            )}

            <CustomMainStackInput
              label={appConstants.nationality}
              value={guest?.nationalityName}
              error={guest?.nationalityError}
              leftIcon={Icons?.DROPDOWN_ARROW}
              leftIconTintColor={colors.color_fff}
              flag={`${flagURL.flaghhtp}${guest?.nationFlag.toLowerCase()}${
                flagURL.wedp
              }`}
              countryCode={' '}
              onChangeText={(text: any) =>
                setFormData(handleNationality(text, type, roomId, childindex))
              }
              source={Icons.SMALLPLANE}
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosStyle
              }
            />

            {guest?.nationalityPicker &&
            guest?.nationalityName.length &&
            nationalityData?.locations?.length ? (
              <View style={{marginTop: responsiveHeight(2)}}>
                <NationalityDropDown
                  data={nationalityData?.locations}
                  onPress={(text: any) =>
                    setFormData(
                      handleNationalityFlag(text, type, roomId, childindex),
                    )
                  }
                />
              </View>
            ) : null}
            {guest?.nationalityPicker &&
              guest?.nationalityName.length &&
              nationalityData?.locations?.length === 0 && (
                <Text style={styles.nodataTextStyle}>Result not found</Text>
              )}

            <CustomMainStackInput
              label={appConstants.phone}
              value={guest?.phone}
              error={guest?.phoneNoError || guest?.countryCodeError}
              leftIcon={Icons.DROPDOWN_ARROW}
              maxlength={getMaxPhoneNumberLength()}
              leftIconOnPress={() => setShowphoneNo(true)}
              onChangeText={(text: any) => {
                setFormData(handlePhoneNo(text, type, roomId, childindex));
              }}
              flag={
                guest?.flag === ''
                  ? `${flagURL.flaghhtp}${'us'}${flagURL.wedp}`
                  : `${flagURL.flaghhtp}${guest?.flag?.toLowerCase()}${
                      flagURL.wedp
                    }`
              }
              keyboardType={'phone-pad'}
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosStyle
              }
            />
            <CountryPicker
              disableBackdrop={true}
              initialState={'+1'}
              searchMessage="search"
              show={showphoneNo}
              pickerButtonOnPress={(item: any) => {
                setFormData(handlePhoneNoCode(item, type, roomId, childindex));
              }}
              lang={'en'}
              style={{
                dialCode: {
                  color: colors.color_F5F5F5,
                },
                modal: {
                  flex: 1,
                  marginTop: Platform.OS === 'ios' ? responsiveHeight(5) : 1,
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
              label={appConstants.email}
              value={guest?.email}
              error={guest?.emailError}
              onChangeText={(text: any) => {
                setFormData(handleEmailId(text, type, roomId, childindex));
              }}
              source={Icons.Email_LOGO}
              rightIconTintColor={colors.color_BBBBBB}
              keyboardType={'email-address'}
              textInputCustomStyle={
                Platform.OS === 'ios' && styles.textInputIosStyle
              }
            />
          </View>
        )}
      </View>
    );
  };

  const renderItem = ({item, index}: any) => {
    console.log(item, 'item');

    return (
      <View style={styles.mainview}>
        <View style={styles.checkOutTicketStyle}>
          <TouchableOpacity onPress={() => toggleShowData(index)}>
            <View style={styles.refundableView}>
              <Text style={styles.dropDownTxt} numberOfLines={4}>
                {appConstants.room} {index + 1}
              </Text>

              <Image
                source={selectedOption[index] ? Icons.Drop_Up : Icons.Drop_Down}
                style={styles.roomsIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        {selectedOption[index] && (
          <View>
            <FlatList
              data={[...Array(item?.adults).keys()].map(
                (adultindex: any, i) => ({
                  roomId: item?.id,
                  adultindex,
                  type: 'ADT',
                  guest: item?.guests[i],
                  idIndex: index,
                }),
              )}
              renderItem={renderItemForAdult}
              keyExtractor={(adultItem: any) =>
                `${adultItem.roomId}-${adultItem.adultindex}`
              }
            />
          </View>
        )}
        {selectedOption[index] && (
          <View>
            <FlatList
              data={[...Array(item?.children).keys()].map(
                (childindex: any, i) => ({
                  roomId: item?.id,
                  childindex: item?.adults + i,
                  type: 'CHD',
                  guest: item?.guests[item?.adults + i],
                  idIndex: index,
                }),
              )}
              renderItem={renderItemForChild}
              keyExtractor={(childItem: any) =>
                `${childItem.roomId}-${childItem.childindex}`
              }
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={styles.mainContainerStyle}>
      <ScrollView style={styles.scrollViewContent}>
        <KeyboardAwareScrollView style={styles.keyBoardAwareStyle}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={colors.color_0094E6}
          />
          <Image
            style={[
              styles.checkOutBackGroundImageStyle,
              //   Platform.OS === 'ios' && styles.iosPlatformFlightBackground,
            ]}
            source={Images.HOTEL_SEARCHBG}
          />
          <View style={styles.checkOutHeaderContainerStyle}>
            <CustomHeader
              leftIcon={Icons.BACK_LOGO}
              lefticonOnPress={handleOnBackIconPress}
              leftIconStyle={styles.headerLeftIconStyle}
              // headerLabel={appConstants.flightCheckOut}
              headerLabelStyle={styles.headerLabelStyle}
            />
            <Image
              style={styles.stepfromStyle}
              source={Icons.STEPFORM_CHECKOUT}
            />
          </View>
          <View style={[commonStyles.ticketContainer_1, styles.roomsContainer]}>
            <FlatList
              data={formData}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item?.id}-${index}`}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      {!isKeyboardVisible && (
        <HotelConfirmationBar roomPrice={RoomPrice} confirmBooking={onSubmit} />
      )}

      {nationalityLoading && (
        <CustomLoader
          isLoading={nationalityLoading}
          customLoaderStyle={styles.customLoaderStyle}
          loaderColor={colors.color_0094E6}
        />
      )}
    </View>
  );
};
export default HotelCheckOut;
