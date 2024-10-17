/* eslint-disable prettier/prettier */
import appConstants, {graphQLConstants} from '@src/constants/appConstants';
import React from 'react';
import {
  Text,
  Modal,
  View,
  ImageBackground,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import styles from './styles';
import CustomHeader from '../customHeader/customHeader';
import {Icons} from '@src/assets';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@src/constants/colors';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface BlogDetailsModalProps {
  blogModalData: any;
  setBlogDetailsModal: any;
}

const BlogDetailsModal = (props: BlogDetailsModalProps) => {
  const {blogModalData, setBlogDetailsModal} = props;

  return (
    <Modal statusBarTranslucent={true}>
      <ImageBackground
        imageStyle={styles.coverImgStyle}
        source={{
          uri: `${graphQLConstants.https}${
            blogModalData?.fields?.coverImage?.fields?.file?.url ||
            blogModalData?.fields?.picture?.fields?.file?.url
          }`,
        }}>
        <LinearGradient
          style={styles.coverImgStyle}
          colors={[colors.color_rgba0004, colors.color_rgba0004]}>
          <CustomHeader
            headerContainerCustomStyle={
              Platform.OS === 'ios'
                ? styles.iosBlogHeaderStyle
                : styles.headerContainerStyle
            }
            leftIcon={Icons.BACK_LOGO}
            headerLabel={appConstants.blog}
            leftIconStyle={styles.leftIconStyle}
            headerLabelStyle={styles.headerLabelStyle}
            lefticonOnPress={() => setBlogDetailsModal(false)}
          />
          <View style={styles.blogDateTextContainerStyle}>
            <Text style={styles.blogTextStyle}>
              {moment(blogModalData?.fields?.date).format(
                appConstants.MMMMDDYYYY,
              )}
            </Text>
            <Text style={[styles.blogTextStyle, styles.blogTitleStyle]}>
              {blogModalData?.fields?.title}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <KeyboardAwareScrollView>
        {blogModalData?.fields?.title === undefined ||
        blogModalData?.fields?.content?.content === undefined ? (
          <View style={styles.noBlogContainerStyle}>
            <Image style={styles.noBlogImgStyle} source={Icons.noBlog} />
          </View>
        ) : (
          <FlatList
            data={blogModalData?.fields?.content?.content}
            contentContainerStyle={styles.contentFlatListStyle}
            renderItem={({item}) => {
              return (
                <View>
                  <View style={styles.textViewContainer}>
                    {item?.content?.map(
                      (el: any) =>
                        el?.value && (
                          <Text
                            style={
                              (styles.contentValueTextStyle,
                              el?.marks[0]?.type === 'bold'
                                ? styles.boldTextStyle
                                : styles.contentValueTextStyle)
                            }>
                            {el?.value}
                          </Text>
                        ),
                    )}
                  </View>
                  {item?.data?.target?.fields?.file?.url && (
                    <Image
                      style={styles.contentImgStyle}
                      source={{
                        uri: `${graphQLConstants.https}${item?.data?.target?.fields?.file?.url}`,
                      }}
                    />
                  )}

                  <Text style={styles.contentValueTextStyle}>
                    {console.log(item?.content, 'contetn')}

                    {item?.content?.map((ul: any) =>
                      ul?.content?.map((ul1: any) =>
                        ul1?.content?.map((ul2: any) => {
                          return (
                            <>
                              {item?.nodeType === 'unordered-list' && (
                                <View
                                  style={
                                    Platform.OS === 'ios'
                                      ? styles.iosViewStyle
                                      : styles.listViewStyle
                                  }
                                />
                              )}
                              <Text
                                style={
                                  item.nodeType === 'unordered-list' &&
                                  styles.unOrderedListStyle
                                }>{`${ul2?.value}\n`}</Text>
                            </>
                          );
                        }),
                      ),
                    )}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default BlogDetailsModal;
