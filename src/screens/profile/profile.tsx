/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '@src/components/customHeader/customHeader';
import {Icons} from '@src/assets';
import appConstants, {flagURL} from '@src/constants/appConstants';
import colors from '@src/constants/colors';
import CustomMainStackInput from '@src/components/customTextInput(mainStack)/customMainStackInput';
import CustomButton from '@src/components/customButton/customButton';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {CountryPicker} from 'react-native-country-codes-picker';
import {back} from '@src/navigation/navigationMethods';
import {travelBookingsText} from '@src/utility/enums/staticEnums';
import ProfileTravelBookingDetails from '@src/components/profileTravelBookingDetails/profileTravelBookingDetails';
import TravelBookingDetails from '@src/components/travelBookingDetails/travelBookingDetails';
import * as ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {Pressable} from 'react-native';

const Profile = () => {
  const [isActiveDetails, setIsActiveDetails] = useState(true);
  const [profileDetails, setProfileDetails] = useState({
    phoneNumber: '',
    opnePhoneCodePicker: false,
    phoneCode: '+1',
    flagCode: '',
    nationflag: '',
  });
  const [isTravelBookingIndex, setIsTravelBookingIndex] = useState(0);
  const [viewDetails, setViewDetails] = useState(false);
  // hoook for back press
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);
    return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleHardwareBackPress,
      );
  }, []);

  const handleHardwareBackPress: any = () => {
    back();
  };

  const handleBackDropPress: any = useCallback(() => {
    if (profileDetails.opnePhoneCodePicker) {
      setProfileDetails(prevState => {
        return {
          ...prevState,
          opnePhoneCodePicker: false,
        };
      });
    } else {
      back();
    }
  }, [profileDetails.opnePhoneCodePicker]);

  const handlePhoneCode = (it: any) => {
    console.log(it, 'itt');
    setProfileData({
      ...profileData,
      phone: it?.dial_code + profileData.phone,
    });
    setProfileDetails(prevState => {
      return {
        ...prevState,
        opnePhoneCodePicker: false,
        nationflag: it?.code,
      };
    });
  };
  const handleOpenPhoneCode = () => {
    setProfileDetails(prevState => {
      return {
        ...prevState,
        opnePhoneCodePicker: true,
      };
    });
  };
  const [profileData, setProfileData] = useState({
    address: {
      country: 'india',
      state: null,
      addr: 'noida',
      city: 'noida',
    },
    email: 'vishakhar@chetu.com',
    id: 'e9aad234-978e-4d02-9790-f6036a4c5fb6',
    picture: null,
    name: 'Vishakha',
    phone: '+919632587415',
    bookings: 0,
  });

  const handlePhone = (e: any) => {
    setProfileData({
      ...profileData,
      phone: e,
    });
  };

  const handleCountry = (e: any) => {
    setProfileData({
      ...profileData,
      address: {
        ...profileData?.address,
        country: e,
      },
    });
  };

  const handleCity = (e: any) => {
    setProfileData({
      ...profileData,
      address: {
        ...profileData?.address,
        city: e,
      },
    });
  };

  const handleAddress = (e: any) => {
    setProfileData({
      ...profileData,
      address: {
        ...profileData?.address,
        addr: e,
      },
    });
  };
  const handleUpdate = () => {
    console.log(profileData, 'profiledata-=-=-=');
  };

  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = React.useCallback(() => {
    console.log('datda');

    const options = {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: true,
    };
    ImagePicker.launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorMessage);
      } else {
        setPickerResponse(res);
        // SendImageToAPI(res.assets[0].base64, res.assets[0].type);
      }
    });
    // ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <>
      <View style={styles.containerStyle}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <CustomHeader
            leftIcon={Icons.BACK_LOGO}
            lefticonOnPress={() => back()}
            leftIconStyle={styles.headerLeftIconStyle}
            headerLabel={appConstants.profile}
            headerLabelStyle={styles.headerLabelStyle}
          />
          <View style={styles.profileDetailsContainerStyle}>
            <View
            // style={styles.imageBackground}
            >
              <View style={styles.avatar}>
                <Image
                  style={styles.profileImageStyle}
                  source={uri ? {uri} : Icons.Profile}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setVisible(true)}>
                  <Image style={styles.addButtonIcon} source={Icons.addImage} />
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              isVisible={visible}
              onBackButtonPress={() => setVisible(false)}
              onBackdropPress={() => setVisible(false)}
              style={styles.modal}>
              <SafeAreaView style={styles.buttons}>
                <Pressable style={styles.button} onPress={onImageLibraryPress}>
                  <Image style={styles.buttonIcon} source={Icons.album} />
                  <Text style={styles.buttonText}>Library</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={onCameraPress}>
                  <Image style={styles.buttonIcon} source={Icons.camera} />
                  <Text style={styles.buttonText}>Camera</Text>
                </Pressable>
              </SafeAreaView>
            </Modal>
            {/* <Image style={styles.profileImageStyle} source={Icons.Profile} /> */}
            <Text style={styles.nameTextStyle}>Jummy Doe</Text>
            <Text style={styles.emailTextStyle}>jummy@gmail.com</Text>
          </View>
          <View style={styles.detailsContainerStyle}>
            <TouchableOpacity
              onPress={() => setIsActiveDetails(true)}
              activeOpacity={appConstants.activeOpacity}
              style={[
                styles.deatilsButtonStyle,
                {
                  backgroundColor: isActiveDetails
                    ? colors.color_fff
                    : colors.color_F9F9F9,
                },
                {
                  elevation: isActiveDetails
                    ? appConstants.elevation_5
                    : appConstants.elevation_0,
                },
              ]}>
              <Image
                tintColor={
                  isActiveDetails ? colors.color_000 : colors.color_969696
                }
                source={Icons.USERLOGO}
              />
              <Text
                style={[
                  styles.buttonTextStyle,
                  {
                    color: isActiveDetails
                      ? colors.color_000
                      : colors.color_969696,
                  },
                ]}>
                {appConstants.personalDetails}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsActiveDetails(false)}
              activeOpacity={appConstants.activeOpacity}
              style={[
                styles.deatilsButtonStyle,
                {
                  backgroundColor: !isActiveDetails
                    ? colors.color_fff
                    : colors.color_F9F9F9,
                },
                {
                  elevation: !isActiveDetails
                    ? appConstants.elevation_5
                    : appConstants.elevation_0,
                },
              ]}>
              <Image
                tintColor={
                  !isActiveDetails ? colors.color_000 : colors.color_969696
                }
                source={Icons.coupon}
              />
              <Text
                style={[
                  styles.buttonTextStyle,
                  {
                    color: !isActiveDetails
                      ? colors.color_000
                      : colors.color_969696,
                  },
                ]}>
                {appConstants.travelBookings}
              </Text>
            </TouchableOpacity>
          </View>
          {isActiveDetails ? (
            <>
              <CustomMainStackInput
                label={appConstants.fullName}
                mainContainerCustomStyle={styles.mainContainerCustomStyle}
                value={profileData?.name}
                editable={false}
              />
              <CustomMainStackInput
                label={appConstants.email}
                value={profileData?.email}
                editable={false}
              />
              <CustomMainStackInput
                label={appConstants.phoneNumber}
                leftIcon={Icons?.DROPDOWN_ARROW}
                leftIconOnPress={handleOpenPhoneCode}
                // flag={
                //   profileDetails.flagCode === ''
                //     ? `${flagURL.flaghhtp}${appConstants.us}${flagURL.wedp}`
                //     : `${flagURL.flaghhtp}${() => {}}${flagURL.wedp}`
                // }
                flag={
                  profileDetails.nationflag === ''
                    ? `${flagURL.flaghhtp}${'us'}${flagURL.wedp}`
                    : `${
                        flagURL.flaghhtp
                      }${profileDetails.nationflag.toLowerCase()}${
                        flagURL.wedp
                      }`
                }
                // flag={`https://flagcdn.com/h20/${profileDetails.nationflag.toLowerCase()}.webp`}
                value={profileData?.phone}
                onChangeText={handlePhone}
                maxlength={12}
              />

              <View style={styles.countryCityContainerStyle}>
                {/* City text input */}
                <View style={styles.countryCitySubContainerStyle}>
                  <Text style={styles.countryCityTextStyle}>
                    {appConstants.country}
                  </Text>
                  <TextInput
                    // style={[styles.textInputsStyle, styles.secondTextInput]}
                    style={styles.textInputsStyle}
                    value={profileData?.address?.country}
                    onChangeText={handleCountry}
                  />
                </View>
                {/* Zip Code text input */}
                <View style={styles.countryCitySubContainerStyle}>
                  <Text style={styles.countryCityTextStyle}>
                    {appConstants.City}
                  </Text>
                  <TextInput
                    // style={[
                    //   styles.textInputsStyle,
                    //   {bottom: Platform.OS === 'ios' ? -12 : null},
                    // ]}
                    style={styles.textInputsStyle}
                    onChangeText={handleCity}
                    maxLength={10}
                    value={profileData?.address?.city}
                  />
                </View>
              </View>
              <CustomMainStackInput
                label={appConstants.address}
                value={profileData?.address?.addr}
                onChangeText={handleAddress}
              />
              <CustomButton label={'Save'} onPress={handleUpdate} />
            </>
          ) : (
            <View style={styles.travelBookingContainerStyle}>
              <View style={styles.bookingTextContainerStyle}>
                {travelBookingsText?.map((item: any, ind: any) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => setIsTravelBookingIndex(ind)}
                        style={[
                          styles.travelBookingTouchableContainerStyle,
                          {
                            backgroundColor:
                              isTravelBookingIndex === ind
                                ? colors.color_F9F9F9
                                : colors.color_fff,
                          },
                        ]}>
                        <View style={styles.travelImgTextContainerStyle}>
                          <Image source={item.img} />
                          <Text
                            style={[
                              styles.bookingTextStyle,
                              {
                                color:
                                  isTravelBookingIndex === ind
                                    ? colors.color_0094E6
                                    : colors.color_000,
                              },
                            ]}>
                            {item.bookingName}
                          </Text>
                        </View>
                        {isTravelBookingIndex === ind && (
                          <View style={styles.bottomSlideViewStyle} />
                        )}
                      </TouchableOpacity>
                    </>
                  );
                })}
              </View>
              {isTravelBookingIndex === 0 && (
                <ProfileTravelBookingDetails
                  topLeftIcon={Icons.CALENDER_LOGO}
                  topLeftText={'Booking Text'}
                  topRightText={'10/10/2010, 12:00 AM'}
                  middleLeftIcon={Icons.LOCATION_LOGO}
                  middleLeftKeyText={'Location'}
                  middleLeftValueText={'Atlanta (ATL)'}
                  middleRightIcon={false}
                  middleRightKeyText={'Departure Date'}
                  middleRightValuText={'10/10/2010, 11:00 AM'}
                  paymentStatus={'Payment Success'}
                  price={'$100'}
                  onPress={() => setViewDetails(true)}
                />
              )}
              {isTravelBookingIndex === 1 && (
                <ProfileTravelBookingDetails
                  topLeftIcon={Icons.LOCATION_LOGO}
                  topLeftText={'Location'}
                  topRightText={'New Delhi (DEL)'}
                  middleLeftIcon={Icons.CALENDER_LOGO}
                  middleLeftKeyText={'Check-in Date'}
                  middleLeftValueText={'10/10/2010, 11:00 AM'}
                  middleRightIcon={Icons.CALENDER_LOGO}
                  middleRightKeyText={'Check-out Date'}
                  middleRightValuText={'10/10/2010, 11:00 AM'}
                  paymentStatus={'Payment Success'}
                  price={'$300'}
                />
              )}
              {isTravelBookingIndex === 2 && (
                <View style={styles.carBookingDetailContainerStyle}>
                  <Text style={styles.comingSoonTextStyle}>Coming Soon</Text>
                </View>
              )}
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
      <CountryPicker
        enableModalAvoiding={true}
        onBackdropPress={handleBackDropPress}
        show={profileDetails.opnePhoneCodePicker}
        initialState={'+1'}
        pickerButtonOnPress={(it: any) => {
          handlePhoneCode(it);
        }}
        lang={'en'}
        style={{
          modal: {
            flex: 0.9,
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
      {viewDetails && <TravelBookingDetails setViewDetails={setViewDetails} />}
    </>
  );
};
export default Profile;
