import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,Button,View,TouchableOpacity,Text,Image,Dimensions, Platform
  } from 'react-native';
  import AutoHeightWebView from 'react-native-autoheight-webview';
  import stylesheet from '../config/stylesheet';
import { RFValue } from 'react-native-responsive-fontsize';

function handleBackPress() {
    navigation.goBack();
    return true;
  }

function Dashboard({navigation}){
    React.useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        if(Platform.OS === "android"){
          navigation.setOptions({
            headerLeft: () => (
              <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style= {{fontSize:RFValue(10,Dimensions.get('window').width),textAlign: "left",color :"#ae0000",marginTop:10,marginStart:10,fontFamily:"Roboto Bold"}}>
             Dashboard
              </Text>
              </View>
            ), 
            headerTitle : () => (
              <Text  color= "#ae0000"  title="" />
            ),
          });
        }
        else{
          navigation.setOptions({
            headerLeft: () => (
              <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
               <Image
              style={{ width: 20, height: 20,marginTop:10 }}
              source={require('../assets/back-arrow.png')}
              resizeMode='contain'
            />
           </TouchableOpacity>
          <Text style= {{fontSize:RFValue(10,Dimensions.get('window').width),textAlign: "left",color :"#ae0000",marginTop:10,marginStart:10,fontFamily:"Roboto Bold"}}>
            Dashboard
          </Text>
              </View>
            ), 
            headerTitle : () => (
              <Text  color= "#ae0000"  title="" />
            ),
          });
        }
     
      }, [navigation]);
      const dashboardURL = 'https://www.cartradeexchange.com/include_ctemobiledashboardnew?uid=KDk3OUU8UzRZLjM0YApgCg=='

return(   
    <AutoHeightWebView hidden = {dashboardURL.length == 0 ? true : false} style = {{backgroundColor : "#fff"}}
   javaScriptEnabled={true}
    source={{ uri:dashboardURL}}
  />
);
}
export default Dashboard