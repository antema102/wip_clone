import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import { COLORS } from '../../../../resources/constants';
import { useLocation } from 'react-router-dom';
import Loader from '../../../components/Loader';

const NewsWebViewScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* <Header
        {...props}
        style={{ elevation: 2, }}
      /> */}
      <Text style={styles.title}>{props?.data?.title}</Text>
      <TextInput
        style={{ color: COLORS.black, fontSize: 14}}
        multiline={true}
        numberOfLines={20}
        value={props?.data?.body}
        editable={false}
        selectTextOnFocus={false}
  />

     {/*
     <WebView css={{ color: COLORS.black, fontSize: 14}} source={{ html: params?.data?.body}} 
        
        onLoadStart={({ nativeEvent }) => {
          setIsLoading(nativeEvent.loading);
        }}
        onLoadEnd={({ nativeEvent }) => {
          setIsLoading(nativeEvent.loading);
        }}
      />

      */}

      {isLoading ? <Loader /> : null}

    </ScrollView>
  );
};


export default NewsWebViewScreen; 
