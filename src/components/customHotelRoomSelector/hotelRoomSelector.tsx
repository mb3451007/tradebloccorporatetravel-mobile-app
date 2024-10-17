/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import styles from './style';
import appConstants from '@src/constants/appConstants';
import {Icons} from '@src/assets';
import colors from '@src/constants/colors';
import CustomButton from '../customButton/customButton';

// Interface for the room selector
interface RoomSelectorProps {
  setRoomSelector: any;
  handleRoomSelector: any;
  // handleCountOfRoomsAdultsChildren: any;
  handleAddRoom: any;
  handleAdultIncrement: any;
  handleAdultDecrement: any;
  handleChildrenIncrement: any;
  handleChildrenDecrement: any;
  noOfRooms: any;
  handleModalConfirm: any;
  handleRemoveRoom: any;
  rooms: any;
  handleCancelRoomSelectorModal:any;
}

const HotelRoomSelector = (props: RoomSelectorProps) => {
  const {
    setRoomSelector,
    handleAddRoom,
    handleAdultIncrement,
    handleAdultDecrement,
    handleChildrenIncrement,
    handleChildrenDecrement,
    handleModalConfirm,
    handleRemoveRoom,
    rooms,
    handleCancelRoomSelectorModal,
  } = props;
  const [adultActiveColor, setAdultActiveColor] = useState(false);
  const childrenActiveColor = false;

  const renderItem = ({item, index}: any) => {
    return (
      <View>
        <View style={styles?.roomCloseIconViewStyle}>
          <Text style={styles.passengerTextStyle}>
            {appConstants.room} {index + 1}
          </Text>
          {item?.id === 1 ? (
            ''
          ) : (
            <TouchableOpacity
              onPress={() => handleRemoveRoom(item?.id)}
              style={styles.closeButton}>
              <Image source={Icons.CLOSE_LOGO} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.passengerContainer}>
          <Text style={[styles.passengerText, styles.customStyle]}>
            {appConstants.adults}
          </Text>
          <TouchableOpacity onPress={() => handleAdultDecrement(index)}>
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
          <Text style={styles.passengerText}>{item?.adults}</Text>
          <TouchableOpacity onPress={() => handleAdultIncrement(index)}>
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
          <TouchableOpacity onPress={() => handleChildrenDecrement(index)}>
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
          <Text style={styles.passengerText}>{item.children}</Text>
          <TouchableOpacity onPress={() => handleChildrenIncrement(index)}>
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
      </View>
    );
  };

  const roomId9 = rooms.find((data: {id: number}) => data.id === 8);
  return (
    <>
      <Modal animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={handleCancelRoomSelectorModal}
            style={styles.closeButton}>
            <Image source={Icons.CLOSE_LOGO} />
          </TouchableOpacity>

          <View style={styles.modalContentContainer}>
            <FlatList
              data={rooms}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id}
            />

            <View style={styles?.roombuttons}>
              {rooms.length === 8 ? (
                ''
              ) : (
                <CustomButton
                  gradientStyle={styles.applyButtonStyle}
                  customButtonStyle={styles.applyButtonStyle}
                  label={appConstants.addRoom}
                  labelStyle={styles.labelStyle}
                  buttonStyle={styles.buttonStyle}
                  onPress={handleAddRoom}
                />
              )}
              <CustomButton
                gradientStyle={styles.applyButtonStyle}
                customButtonStyle={styles.applyButtonStyle}
                label={appConstants.confirm}
                buttonStyle={styles.buttonStyle}
                labelStyle={styles.labelStyle}
                onPress={handleModalConfirm}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HotelRoomSelector;
