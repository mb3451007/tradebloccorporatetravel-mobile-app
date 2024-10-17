/* eslint-disable prettier/prettier */
import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import commonMethods from '@src/utility/commonMethods';

// interface for the slider
interface CustomPanHandlerProps {
  panHeader?: any;
  customPanHeaderTextStyle?: any;
  handleMaxMin?: any;
  panHandlerValue: any;
  setPanHandlerValue: any;
  min: any;
  max: any;
  subText_1: any;
  subText_2: any;
  dur?: any;
  oneWayBound?: any;
}

const CustomPanHandler = (props: CustomPanHandlerProps) => {
  const {
    panHeader,
    customPanHeaderTextStyle,
    handleMaxMin,
    min,
    max,
    panHandlerValue,
    setPanHandlerValue,
    subText_1,
    subText_2,
    dur,
    oneWayBound,
  } = props;

  // custom left marker for slider.
  const customLeftMarker = () => {
    if (dur) {
      return (
        <View style={styles.markerContainer}>
          <Text style={styles.markerValues}>
            {panHandlerValue?.values[0] > min
              ? `${commonMethods.getDuration(
                  panHandlerValue?.values[0].toString(),
                )}`
              : ' '}
          </Text>
          <View style={styles.customLeftMarkerStyle} />
        </View>
      );
    } else if (oneWayBound) {
      return (
        <View style={styles.markerContainer}>
          {panHandlerValue.values[0] === 0 ? (
            ''
          ) : (
            <Text style={styles.markerValues}>
              {panHandlerValue?.values[0] <= 99 &&
              panHandlerValue?.values[0] >= 10
                ? `${commonMethods.getTimeFormat(
                    `00${panHandlerValue?.values[0]}`,
                  )}`
                : panHandlerValue?.values[0] <= 999 &&
                  panHandlerValue?.values[0] >= 100
                ? `${commonMethods.getTimeFormat(
                    `0${panHandlerValue?.values[0]}`,
                  )}`
                : panHandlerValue?.values[0] <= 9
                ? `${commonMethods.getTimeFormat(
                    `000${panHandlerValue?.values[0]}`,
                  )}`
                : `${commonMethods.getTimeFormat(
                    `${panHandlerValue?.values[0].toString()}`,
                  )}`}
            </Text>
          )}
          <View style={styles.customLeftMarkerStyle} />
        </View>
      );
    } else {
      return (
        <View style={styles.markerContainer}>
          <Text style={styles.markerValues}>
            {panHandlerValue?.values[0] > min
              ? `$${panHandlerValue?.values[0]}`
              : ' '}
          </Text>
          <View style={styles.customLeftMarkerStyle} />
        </View>
      );
    }
  };
  // custom right marker for slider.
  const customRightMarker = () => {
    if (dur) {
      return (
        <View style={styles.markerContainer}>
          <Text style={styles.markerValues}>
            {panHandlerValue?.values[1] < max
              ? `${commonMethods.getDuration(
                  panHandlerValue?.values[1].toString(),
                )}`
              : ' '}
          </Text>
          <View style={styles.customLeftMarkerStyle} />
        </View>
      );
    } else if (oneWayBound) {
      return (
        <View style={styles.markerContainer}>
          {panHandlerValue.values[1] === 2359 ? (
            ''
          ) : (
            <Text style={styles.markerValues}>
              {panHandlerValue?.values[1] <= 99 &&
              panHandlerValue?.values[1] >= 10
                ? `${commonMethods.getTimeFormat(
                    `00${panHandlerValue?.values[0]}`,
                  )}`
                : panHandlerValue?.values[1] <= 999 &&
                  panHandlerValue?.values[1] >= 100
                ? `${commonMethods.getTimeFormat(
                    `0${panHandlerValue?.values[0]}`,
                  )}`
                : panHandlerValue?.values[1] <= 9
                ? `${commonMethods.getTimeFormat(
                    `000${panHandlerValue?.values[1]}`,
                  )}`
                : `${commonMethods.getTimeFormat(
                    `${panHandlerValue?.values[1].toString()}`,
                  )}`}
            </Text>
          )}
          <View style={styles.customLeftMarkerStyle} />
        </View>
      );
    } else {
      return (
        <View style={styles.markerContainer}>
          <Text style={styles.markerValues}>
            {panHandlerValue?.values[1] < max
              ? `$${panHandlerValue?.values[1]}`
              : ' '}
          </Text>
          <View style={styles.customLeftMarkerStyle} />
        </View>
      );
    }
  };
  // to select the values from the marker..
  const multiSliderValuesChange = useCallback(
    (values: any) => {
      setPanHandlerValue({
        values,
      });
      handleMaxMin(values);
    },
    [handleMaxMin, setPanHandlerValue],
  );

  return (
    <View style={styles.containerStyle}>
      <Text style={[styles.panHeaderTextStyle, {...customPanHeaderTextStyle}]}>
        {panHeader}
      </Text>

      <MultiSlider
        values={[panHandlerValue?.values[0], panHandlerValue?.values[1]]}
        sliderLength={310}
        isMarkersSeparated={true}
        selectedStyle={styles.selectedStyle}
        customMarkerRight={customRightMarker}
        customMarkerLeft={customLeftMarker}
        onValuesChange={multiSliderValuesChange}
        min={min}
        max={max}
        step={1}
        allowOverlap={false}
      />
      <View style={styles.subTextContainerStyle}>
        <Text style={styles.subTextStyle}>{subText_1}</Text>
        <Text style={styles.subTextStyle}>{subText_2}</Text>
      </View>
    </View>
  );
};

export default CustomPanHandler;
