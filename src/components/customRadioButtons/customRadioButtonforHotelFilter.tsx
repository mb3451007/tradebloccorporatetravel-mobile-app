/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import appConstants from '@src/constants/appConstants';
import {Icons} from '@src/assets';
// import MultipleSelectorHeader from './multipleSelectorHeader';
import commonStyles from '@src/utility/commonStyles';
import MultipleSelectorHeader from '../customMultipleSelector/multipleSelectorHeader';
import {RadioButton} from 'react-native-paper';
import colors from '@src/constants/colors';

interface CustomMulitipleSelectorProps {
  header?: any;
  mockData?: any;
  setMockData?: any;
  include?: boolean;
  stop?: any;
  isIncludeAll?: boolean;
  setIsIncludeAll?: any;
  selectedValue?: any;
  handleMealPlanFilterData?: any;
}

const CustomRadioButtonSelectorforHotel = (
  props: CustomMulitipleSelectorProps,
) => {
  const {
    header,
    mockData,
    include,
    stop,
    isIncludeAll,
    selectedValue,
    handleMealPlanFilterData,
  } = props;
  const [content, setContent] = useState(stop ? true : false);

  return (
    <View style={content && commonStyles.filterHeaderContainerStyle}>
      <MultipleSelectorHeader
        content={content}
        onPress={() => setContent(!content)}
        header={header}
      />
      {content && include && (
        <TouchableOpacity
          activeOpacity={appConstants.activeOpacity}
          style={styles.contentContainer}>
          <Text>{appConstants.includeAll}</Text>
          <Image
            source={isIncludeAll ? Icons.CHECKED_BOX : Icons.EMPTY_CHECKBOX}
          />
        </TouchableOpacity>
      )}
      {content
        ? mockData.map((item: any, index: any) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleMealPlanFilterData(item.code)}
                style={styles.contentContainer}>
                <Text style={styles.contentTextStyle}>{item.value}</Text>
                <RadioButton.Android
                  value="option1"
                  status={selectedValue === item.code ? 'checked' : 'unchecked'}
                  onPress={() => handleMealPlanFilterData(item.code)}
                  style={[
                    styles.radioStyle,
                    {
                      backgroundColor:
                        selectedValue === item.code
                          ? colors.color_darkBlue
                          : colors.color_fff,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })
        : null}
    </View>
  );
};
export default CustomRadioButtonSelectorforHotel;
