/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import appConstants from '@src/constants/appConstants';
import {Icons} from '@src/assets';
import MultipleSelectorHeader from './multipleSelectorHeader';
import commonStyles from '@src/utility/commonStyles';

interface CustomMulitipleSelectorProps {
  header: any;
  mockData: any;
  setMockData: any;
  include?: boolean;
  stop?: any;
  isIncludeAll?: boolean;
  setIsIncludeAll?: any;
}

const CustomMulitipleSelector = (props: CustomMulitipleSelectorProps) => {
  const {
    header,
    mockData,
    setMockData,
    include,
    stop,
    isIncludeAll,
    setIsIncludeAll,
  } = props;
  const [content, setContent] = useState(stop ? true : false);
  const handleContentOnPress = (item: any) => {
    const result = mockData.map((el: any) => {
      if (el.key === item.key) {
        return {
          ...el,
          open: !el.open,
        };
      } else {
        return el;
      }
    });
    if (include) {
      const valFalse = result?.every((el: any) => el?.open === false);
      if (valFalse) {
        setIsIncludeAll(true);
      }
      const valTrue = result?.some((el: any) => el?.open === true);
      if (valTrue) {
        setIsIncludeAll(false);
      }
    }

    setMockData(result, item?.code);
  };
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
          <Text style={styles.includeAllStyle}>{appConstants.includeAll}</Text>
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
                activeOpacity={appConstants.activeOpacity}
                onPress={() => handleContentOnPress(item)}
                style={styles.contentContainer}>
                <Text style={styles.contentTextStyle}>{item.value}</Text>
                <Image
                  source={
                    item.open === true
                      ? Icons.CHECKED_BOX
                      : Icons.EMPTY_CHECKBOX
                  }
                />
              </TouchableOpacity>
            );
          })
        : null}
    </View>
  );
};
export default CustomMulitipleSelector;
