


import AutoHeightWebView from 'react-native-autoheight-webview';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Button,
  Dimensions
} from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';
function DealerDetailsVC({navigation})  {
  let geturl = 'https://api.cartradeexchange.com/mob/mobile_dealershipdetails/5995/newversion'


  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    if(Platform.OS === 'android'){
      navigation.setOptions({
        headerRight: () => (
          <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
          <Image
          style={{ width: 20, height: 20,margin:10 }}
          source={require('../assets/menu.png')}
          resizeMode='contain'
          />
       </TouchableOpacity>
          </View>
        ), 
        headerTitle : () => (
          <Text  color= "#ae0000"  title="" />
        ),
        headerLeft: () => (
          <View style={{ flex: 1, flexDirection: 'row' }}>
         
      <Text style= {{fontSize:RFValue(9,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:12,marginStart:5,fontFamily:"Roboto Bold"}}>
        Dealer Details
      </Text>
          </View>
        ), 
        headerTitle : () => (
          <Text  color= "#fff"  title="" />
        ),
      });

    }else{
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
         <Image
        style={{ width: 20, height: 20,margin:10 }}
        source={require('../assets/menu.png')}
        resizeMode='contain'
      />
     </TouchableOpacity>
        </View>
       
      ), 
      headerTitle : () => (
        <Button  color= "#ae0000"  title="" />
      ),
      headerLeft: () => (
        <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
         <Image
        style={{ width: 20, height: 20,marginTop:10 }}
        source={require('../assets/back-arrow.png')}
        resizeMode='contain'
      />
     </TouchableOpacity>
    <Text style= {{fontSize:RFValue(9,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:12,marginStart:5,fontFamily:"Roboto Bold"}}>
      Dealer Details
    </Text>
        </View>
      ), 
      headerTitle : () => (
        <Text  color= "#fff"  title="" />
      ),
    });
  }
  }, [navigation]);

return(
  <AutoHeightWebView hidden = {geturl.length == 0 ? true : false} style = {{backgroundColor : "#fff"}}
   javaScriptEnabled={true}
    source={{ uri:geturl}}
  />
);
}
export default DealerDetailsVC