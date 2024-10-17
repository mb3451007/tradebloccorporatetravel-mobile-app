/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icons } from '@src/assets';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import styles from './styles';
import colors from '@src/constants/colors';
import CustomHeader from '@src/components/customHeader/customHeader';
import appConstants, { graphQLConstants } from '@src/constants/appConstants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { graphQLSpaceID, graphQLAccessToken } from '@env';
import { createClient } from 'contentful';
import moment from 'moment';
import { back } from '@src/navigation/navigationMethods';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BlogDetailsModal from '@src/components/blogDetailsModal/blogDetailsModal';

const Blog = () => {
  const navigation = useNavigation();
  const [blogContentData, setBlogContentData] = useState<any>([]);
  const [blogDetailsModal, setBlogDetailsModal] = useState<any>(false);
  const [blogModalData, setBlogModalData] = useState<any>([]);
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

  const client = createClient({
    space: graphQLSpaceID,
    accessToken: graphQLAccessToken,
  });

  const fetchBlogContent = async () => {
    try {
      const resp = await client.getEntries();
      const { items }: any = resp;
      const filterPostData = items?.map((obj: any) => {
        if (obj?.sys?.contentType?.sys?.id === 'post') {
          return obj;
        }
      });
      const filteredData = filterPostData?.filter(
        (data: any) => data !== undefined,
      );

      setBlogContentData(filteredData);

    } catch (error) {
      console.log(error, 'QL-error');
    }
  };

  useEffect(() => {
    fetchBlogContent();
  }, []);

  const handleParticularBlogSelect = (blog: any) => {
    setBlogModalData(blog);
    setBlogDetailsModal(true);
  };

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={colors.transparent}
        barStyle="dark-content"
      />
      <ImageBackground
        style={styles.blogHeaderImageContainer}
        source={Icons.blog_Header}>
        <CustomHeader
          headerContainerCustomStyle={Platform.OS === 'ios' ? styles.iosBlogHeaderStyle : styles.headerContainerCustomStyle}
          leftIcon={Icons.BACK_LOGO}
          leftIconStyle={styles.leftIconStyle}
          headerLabel={appConstants.blog}
          headerLabelStyle={styles.headerLabelStyle}
          lefticonOnPress={() => back()}
        />
        <Image style={styles.travelClubImgStyle} source={Icons.travelClub} />
      </ImageBackground>
      <KeyboardAwareScrollView style={{}}>
        <FlatList
          data={blogContentData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => handleParticularBlogSelect(item)}
                style={styles.blogImageContainerStyle}>
                <ImageBackground
                  style={styles.imageContainerStyle}
                  imageStyle={styles.blogImageStyle}
                  source={{
                    uri: `${graphQLConstants.https}${item?.fields?.coverImage?.fields?.file?.url ||
                      item?.fields?.picture?.fields?.file?.url
                      }`,
                  }}>
                  <LinearGradient
                    style={styles.linearGradientStyle}
                    colors={[colors.transparent, colors.color_rgba0004]}>
                    <View style={styles.blogDetailsContaionerStyle}>
                      <Text style={styles.blogTextStyle}>
                        {moment(item?.fields?.date).format(
                          appConstants.MMMMDDYYYY,
                        )}
                      </Text>
                      <Text
                        style={[styles.blogTextStyle, styles.blogTitleStyle]}>
                        {item?.fields?.title}
                      </Text>
                      <Text style={styles.blogTextStyle}>
                        {item?.fields?.slug}
                      </Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </KeyboardAwareScrollView>
      {blogDetailsModal && (
        <BlogDetailsModal
          blogModalData={blogModalData}
          setBlogDetailsModal={setBlogDetailsModal}
        />
      )}
    </>
  );
};

export default Blog;
