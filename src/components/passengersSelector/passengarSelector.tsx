/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Modal, Image} from 'react-native';
import styles from './styles';
import appConstants from '@src/constants/appConstants';
import {Icons} from '@src/assets';
import colors from '@src/constants/colors';
import CustomButton from '../customButton/customButton';
import { cabinClass } from '@src/utility/enums/staticEnums';

// Interface for the passenger selector
interface PassengarSelectorProps {
  setIsPassengerSelector: any;
  handlePassengerSelector: any;
}

const PassengarSelector = (props: PassengarSelectorProps) => {
  const {setIsPassengerSelector, handlePassengerSelector} = props;
  const [cabinItem, setCabinItem] = useState(appConstants.byPriceLowest);
  const [cabin, setCabin] = useState('');
  const [showClassItems, setShowClassItems] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [adultActiveColor, setAdultActiveColor] = useState(false);
  const childrenActiveColor = false;
  const infantsActiveColor = false;

  // Method to select the particular cabin.
  const handleSelectCabin = (item: string, cabinID: string) => {
    if (item) {
      setCabinItem(item);
      setShowClassItems(false);
      setCabin(cabinID);
    }
  };

  // Business logic to handle the adult increament numbers
  const handleAdultIncreament = () => {
    if (childrenCount === 0 && infantsCount >= 0) {
      if (adultCount < 9) {
        setAdultCount(adultCount + 1);
        setAdultActiveColor(false);
      }
    } else if (childrenCount <= 1 && infantsCount >= 0) {
      if (adultCount < 8) {
        setAdultCount(adultCount + 1);
        setAdultActiveColor(false);
      }
    } else if (childrenCount <= 2 && infantsCount >= 0) {
      if (adultCount < 7) {
        setAdultCount(adultCount + 1);
      }
    } else if (childrenCount <= 3 && infantsCount <= 0) {
      if (adultCount < 6) {
        setAdultCount(adultCount + 1);
      }
    } else if (childrenCount <= 4 && infantsCount >= 0) {
      if (adultCount < 5) {
        setAdultCount(adultCount + 1);
      }
    } else if (childrenCount <= 5 && infantsCount >= 0) {
      if (adultCount < 4) {
        setAdultCount(adultCount + 1);
      }
    } else if (childrenCount <= 6 && infantsCount >= 0) {
      if (adultCount < 3) {
        setAdultCount(adultCount + 1);
      }
    } else if (childrenCount <= 7 && infantsCount >= 0) {
      if (adultCount < 2) {
        setAdultCount(adultCount + 1);
      }
    } else if (childrenCount <= 8 && infantsCount >= 0) {
      if (adultCount < 1) {
        setAdultCount(adultCount + 1);
      }
    }
  };

  // Business logic to handle the adult decreament numbers
  const handleAdultDecreament = () => {
    if (childrenCount <= 8 && infantsCount >= 0) {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
        setAdultActiveColor(false);
      }
    } else if (childrenCount <= 7 && infantsCount >= 0) {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
      }
    } else if (childrenCount <= 6 && infantsCount >= 0) {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
      }
    } else if (childrenCount <= 5 && infantsCount >= 0) {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
        setAdultActiveColor(false);
      }
    } else if (childrenCount <= 4 && infantsCount >= 0) {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
      }
    } else if (childrenCount <= 3 && infantsCount >= 0) {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
      }
    } else if (childrenCount <= 2 && infantsCount >= 0) {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
      }
    } else if (childrenCount <= 1 && infantsCount >= 0) {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
      }
    } else if (childrenCount <= 0 && infantsCount >= 0) {
      if (adultCount > 1) {
        setAdultCount(adultCount - 1);
      }
    }

    if (adultCount === infantsCount) {
      if (adultCount > 1 && infantsCount > 1) {
        setAdultCount(adultCount - 1);
        setInfantsCount(infantsCount - 1);
      }
    }
  };

  // Business logic to handle the child increament numbers
  const handleChildrenIncreament = () => {
    if (adultCount <= 1 && infantsCount <= 1) {
      if (childrenCount < 8) {
        setChildrenCount(childrenCount + 1);
      }
    } else if (adultCount <= 2 && infantsCount <= 2) {
      if (childrenCount < 7) {
        setChildrenCount(childrenCount + 1);
      }
    } else if (adultCount <= 3 && infantsCount <= 3) {
      if (childrenCount < 6) {
        setChildrenCount(childrenCount + 1);
      }
    } else if (adultCount <= 4 && infantsCount <= 4) {
      if (childrenCount < 5) {
        setChildrenCount(childrenCount + 1);
      }
    } else if (adultCount <= 5 && infantsCount <= 5) {
      if (childrenCount < 4) {
        setChildrenCount(childrenCount + 1);
      }
    } else if (adultCount <= 6 && infantsCount <= 6) {
      if (childrenCount < 3) {
        setChildrenCount(childrenCount + 1);
      }
    } else if (adultCount <= 7 && infantsCount <= 7) {
      if (childrenCount < 2) {
        setChildrenCount(childrenCount + 1);
      }
    } else if (adultCount <= 8 && infantsCount <= 8) {
      if (childrenCount < 1) {
        setChildrenCount(childrenCount + 1);
      }
    } else if (adultCount <= 9 && infantsCount <= 9) {
      if (childrenCount < 0) {
        setChildrenCount(childrenCount + 1);
      }
    }
  };

  // Business logic to handle the child decreament numbers
  const handleChildrenDecreament = () => {
    if (adultCount >= 1 && infantsCount <= 9) {
      if (childrenCount > 0) {
        setChildrenCount(childrenCount - 1);
      }
    }
  };

  // Business logic to handle the infant increament numbers
  const handleInfantIncreament = () => {
    if (adultCount <= 1 && childrenCount <= 8) {
      if (infantsCount < 1) {
        setInfantsCount(infantsCount + 1);
      }
    } else if (adultCount <= 2 && childrenCount <= 7) {
      if (infantsCount < 2) {
        setInfantsCount(infantsCount + 1);
      }
    } else if (adultCount <= 3 && childrenCount <= 6) {
      if (infantsCount < 3) {
        setInfantsCount(infantsCount + 1);
      }
    } else if (adultCount <= 4 && childrenCount <= 5) {
      if (infantsCount < 4) {
        setInfantsCount(infantsCount + 1);
      }
    } else if (adultCount <= 5 && childrenCount <= 4) {
      if (infantsCount < 5) {
        setInfantsCount(infantsCount + 1);
      }
    } else if (adultCount <= 6 && childrenCount <= 3) {
      if (infantsCount < 6) {
        setInfantsCount(infantsCount + 1);
      }
    } else if (adultCount <= 7 && childrenCount <= 2) {
      if (infantsCount < 7) {
        setInfantsCount(infantsCount + 1);
      }
    } else if (adultCount <= 8 && childrenCount <= 1) {
      if (infantsCount < 8) {
        setInfantsCount(infantsCount + 1);
      }
    } else if (adultCount <= 9 && childrenCount === 0) {
      if (infantsCount < 9) {
        setInfantsCount(infantsCount + 1);
      }
    }
  };

  // Business logic to handle the infant decreament numbers
  const handleInfantsDecreament = () => {
    if (adultCount >= 1 && childrenCount >= 0) {
      if (infantsCount > 0) {
        setInfantsCount(infantsCount - 1);
      }
    }
  };

  // Method to handle the OnPress
  const handleModalOnPress = () => {
    handlePassengerSelector(
      cabinItem,
      adultCount,
      childrenCount,
      infantsCount,
      cabin,
    );
    setIsPassengerSelector(false);
  };
  return (
    <>
      <Modal animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setIsPassengerSelector(false)}
            style={styles.closeButton}>
            <Image source={Icons.CLOSE_LOGO} />
          </TouchableOpacity>
          <View style={styles.modalContentContainer}>
            <Text style={styles.cabinTextStyle}>{appConstants.cabin}</Text>
            <TouchableOpacity
              onPress={() => setShowClassItems(!showClassItems)}
              style={styles.cabinSelectorBar}>
              <Text style={styles.barTextStyle}>{cabinItem}</Text>
              <Image source={Icons.DROPDOWN_LOGO} />
            </TouchableOpacity>
            {showClassItems && (
              <View style={styles.itemsMainContainer}>
                {cabinClass.map(item => (
                  <View key={item.id} style={styles.classItemsContainer}>
                    <TouchableOpacity
                      onPress={() => handleSelectCabin(item.class, item.cabin)}
                      style={styles.itemsTextContainer}>
                      <Text style={styles.itemTextStyle}>{item.class}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.passengerTextStyle}>
              {appConstants.passengers}
            </Text>
            <View style={styles.passengerContainer}>
              <Text style={[styles.passengerText, styles.customStyle]}>
                {appConstants.adults}
              </Text>
              <TouchableOpacity onPress={handleAdultDecreament}>
                <Text
                  style={[
                    styles.passengerText,
                    {
                      color: adultActiveColor
                        ? colors.color_0094E6
                        : colors.color_grey,
                    },
                  ]}>
                  -1
                </Text>
              </TouchableOpacity>
              <Text style={styles.passengerText}>{adultCount}</Text>
              <TouchableOpacity onPress={handleAdultIncreament}>
                <Text
                  style={[
                    styles.passengerText,
                    {
                      color: adultActiveColor
                        ? colors.color_grey
                        : colors.color_0094E6,
                    },
                  ]}>
                  +1
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.passengerContainer}>
              <Text style={[styles.passengerText, styles.customStyle]}>
                {appConstants.children}
              </Text>
              <TouchableOpacity onPress={handleChildrenDecreament}>
                <Text
                  style={[
                    styles.passengerText,
                    {
                      color: childrenActiveColor
                        ? colors.color_0094E6
                        : colors.color_grey,
                    },
                  ]}>
                  -1
                </Text>
              </TouchableOpacity>
              <Text style={styles.passengerText}>{childrenCount}</Text>
              <TouchableOpacity onPress={handleChildrenIncreament}>
                <Text
                  style={[
                    styles.passengerText,
                    {
                      color: childrenActiveColor
                        ? colors.color_grey
                        : colors.color_0094E6,
                    },
                  ]}>
                  +1
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.passengerContainer}>
              <Text style={[styles.passengerText, styles.customStyle]}>
                {appConstants.infants}
              </Text>
              <TouchableOpacity onPress={handleInfantsDecreament}>
                <Text
                  style={[
                    styles.passengerText,
                    {
                      color: infantsActiveColor
                        ? colors.color_0094E6
                        : colors.color_grey,
                    },
                  ]}>
                  -1
                </Text>
              </TouchableOpacity>
              <Text style={styles.passengerText}>{infantsCount}</Text>
              <TouchableOpacity onPress={handleInfantIncreament}>
                <Text
                  style={[
                    styles.passengerText,
                    {
                      color: infantsActiveColor
                        ? colors.color_grey
                        : colors.color_0094E6,
                    },
                  ]}>
                  +1
                </Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              gradientStyle={styles.applyButtonStyle}
              customButtonStyle={styles.applyButtonStyle}
              label={appConstants.confirm}
              buttonStyle={styles.buttonStyle}
              onPress={handleModalOnPress}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PassengarSelector;
