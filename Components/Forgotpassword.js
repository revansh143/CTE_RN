import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Image,
    Text
  } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

function Forgotpassword({navigation})  {
  let geturl = 'https://www.cartradeexchange.com/mob/forgot_password/ios'

return(
  <AutoHeightWebView hidden = {geturl.length == 0 ? true : false} style = {{backgroundColor : "#fff"}}
  scrollEnabled = {false}
  automaticallyAdjustContentInsets={false}
  javaScriptEnabled={true}
  source={{ uri:geturl}}
  /> 
    // <WebView 
    //   source={{ uri: 'https://www.cartradeexchange.com/mob/forgot_password/ios'}} 
    // />
);
}
export default Forgotpassword
