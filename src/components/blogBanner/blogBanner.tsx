/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {Icons} from '@src/assets';
import appConstants, {graphQLConstants} from '@src/constants/appConstants';
import navigationConstants from '@src/constants/navigationConstants';
import {navigate} from '@src/navigation/navigationMethods';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import {graphQLSpaceID, graphQLAccessToken} from '@env';
import {createClient} from 'contentful';
import colors from '@src/constants/colors';
import LinearGradient from 'react-native-linear-gradient';

const BlogBanner = () => {
  const [blogContentData, setBlogContentData] = useState<any[]>([]);

  //===========client ID============
  const client = createClient({
    space: graphQLSpaceID,
    accessToken: graphQLAccessToken,
  });

  const fetchBlogContent = async () => {
    try {
      const resp = await client.getEntries();
      const {items}: any = resp;
      console.log(items, 'resp');
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

  return (
    <>
      <TouchableOpacity
        onPress={() => navigate(navigationConstants.BLOG)}
        activeOpacity={appConstants.activeOpacity}
        style={styles.blogImageContainerStyle}>
        <ImageBackground
          style={styles.imageContainerStyle}
          imageStyle={styles.blogImageStyle}
          source={{
            uri: `${graphQLConstants.https}${blogContentData?.[0]?.fields?.coverImage?.fields?.file?.url}`,
          }}>
          <LinearGradient
            style={styles.linearGradientStyle}
            colors={[colors.transparent, colors.color_rgba0004]}>
            <View style={styles.blogTextContainerStyle}>
              <Text style={styles.blogTextStyle}>
                {moment(blogContentData?.[0]?.fields?.date).format(
                  'MMMM DD,YYYY',
                )}
              </Text>
              <Text style={[styles.blogTextStyle, styles.blogTitleStyle]}>
                {blogContentData?.[0]?.fields?.title}
              </Text>
              <Text style={styles.blogTextStyle}>
                {blogContentData?.[0]?.fields?.slug}
              </Text>
              <Image style={styles.exploreImgStyle} source={Icons.explore} />
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
};

export default BlogBanner;
