/* eslint-disable prettier/prettier */

import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from './styles';
import {Image} from 'react-native';
import {Icons} from '@src/assets';
import {GOOGLE_KEY} from '@env';
import colors from '@src/constants/colors';
interface googlePlaces {
  handlePlaceSelected: Function;
  selectedPropertyValue: any;
  hotelLatLong: any;
  handleSearchProperetyClear: any;
}
let selectText = '';
const GooglePropertyName = (props: googlePlaces) => {
  const inputRef = useRef<any>();

  const {hotelLatLong, handleSearchProperetyClear} = props;

  const {lat, lon} = hotelLatLong;

  useEffect(() => {
    inputRef.current?.setAddressText(props.selectedPropertyValue);
  }, [props.selectedPropertyValue]);

  const crossButton: any = () => {
    return (
      <TouchableOpacity
        style={styles.closeButtonContainerStyle}
        onPress={() => {
          inputRef.current?.setAddressText('');
          handleSearchProperetyClear();
        }}>
        <Image source={Icons.CLOSE} style={styles.imageStyle} />
      </TouchableOpacity>
    );
  };
  const [displayVisibility, setDisplayVisibility] = useState('flex');
  const {handlePlaceSelected}: any = props;
  return (
    <View style={styles.propertyInput}>
      <GooglePlacesAutocomplete
        ref={inputRef}
        placeholder="Property Name"
        keepResultsAfterBlur={true}
        keyboardShouldPersistTaps={'handled'}
        listViewDisplayed={false}
        onPress={data => {
          handlePlaceSelected(data);
          selectText = data.structured_formatting.main_text;
          setDisplayVisibility('none');
        }}
        textInputProps={{
          onChangeText: value => {
            value === selectText ? {} : setDisplayVisibility('flex');
          },

          placeholderTextColor: colors.color_000,
        }}
        query={{
          key: GOOGLE_KEY,
          language: 'en',
          radius: '50',
          location: `${lat},${lon}`,
        }}
        minLength={2}
        fetchDetails={true}
        currentLocation={true}
        currentLocationLabel="Current location"
        renderRightButton={(): any =>
          inputRef.current?.getAddressText() ? crossButton() : null
        }
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            flexDirection: 'row',
          },
          textInput: {
            backgroundColor: colors.color_fff,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            color: colors.color_000,
          },
          listView: {
            display: displayVisibility,
          },

          poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: colors.color_B2B2B2,
            borderTopWidth: 0.5,
          },
          row: {
            backgroundColor: colors.color_fff,
            color: colors.color_000,
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: colors.color_B2B2B2,
          },
          description: {color: colors.color_000},
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
          },
        }}
        nearbyPlacesAPI="'GoogleReverseGeocoding' | 'GooglePlacesSearch'"
        enablePoweredByContainer={false}
        isRowScrollable={true}
        enableHighAccuracyLocation={true}
      />
    </View>
  );
};
export default React.memo(GooglePropertyName);
