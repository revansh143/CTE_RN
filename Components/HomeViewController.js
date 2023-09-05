import React, {useEffect, useState} from 'react';
import stylesheet from '../config/stylesheet';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  ImageBackground,
} from 'react-native';
import bgcolors from '../config/bgcolors';
// import AsyncStorage from '@react-native-community/async-storage';
import { getData } from '../config/APIResponse';

const TopBarItems = [  { title: 'Inventory', content: 'Main',image :require('../assets/Inventory.png'),component:"inventoryVC"},
{ title: 'Buy Leads', content: 'contact',image :require('../assets/BuyLeads.png'),component:"leadMarketplace"},
{ title: 'Auctions', content: 'logout',image :require( '../assets/Auctions.png'),component:"leadMarketplace"}]
const bottombarItems = [
    { title: 'Inventory Marketplace', content: 'Main',image :require("../assets/InventoryMarketplace.png"),component:"marketplaceVC"},
    { title: 'Lead Marketplace', content: 'Main',image :require("../assets/LeadMarketplace.png"),component:"leadMarketplace"},
    { title: 'Dashboard', content: 'contact',image :require( "../assets/Dashborad.png"),component:"DashboardVC"},
    { title: 'Dealer Details', content: 'logout',image : require("../assets/DealerDetails.png"),component:"DealerDetails"},

    { title: 'OEM & Consumer Cars', content: 'contact',image : require("../assets/OEM&CosnumerCars.png"),component:""},
    { title: 'Evalutions', content: 'logout',image :require( "../assets/Evaluation.png"),component:""},
    { title: 'RTO Check', content: 'contact',image : require("../assets/RTOCheck.png"),component:""},
    { title: 'CarTrade Price', content: 'logout',image :require( "../assets/cartradePrice.png"),component:""},
    { title: 'CarTrade Social', content: 'Main',image :require("../assets/social_icon.png"),component:"marketplaceVC"},
    { title: 'Warranties', content: 'Main',image :require("../assets/Warranties.png"),component:""},
    { title: 'Payments', content: 'logout',image : require("../assets/Payment.png"),component:""},
    { title: ' ', content: 'logout',image : "",component:"s"},
  ];
    let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = 'tel:9014872303';
    } else {
        phoneNumber = 'telprompt:9014872303';
    }
  
function HomeViewController({navigation})  {
  const getData = async (key) => {
  
    React.useEffect(() => {
      navigation.setOptions({
        headerTitle:() =>(
          <Text></Text>
        ),
        headerLeft: () => (
          <Image
          style={{ width: 120, height: 50 }}
          source={require('../assets/cte_logo.png')}
          resizeMode='contain'
        />
        ),
        headerRight: () => (
          <View style = {{  flexDirection: 'row',
        }} >
          <TouchableOpacity 
          onPress={() => navigation.navigate('settings')}>
         <Image
          source={
            require("../assets/Settings.png")
          }
          style={stylesheet.settingimageStyle}
         />
         </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => Linking.openURL(phoneNumber)}>
          <Image
          source={
            require("../assets/dealer-helpline.png")
          }
          style={stylesheet.imageStyle}
        />
        </TouchableOpacity>
        </View>
        ),
      });
    }, [navigation]);

   const footerview =({}) => {
    return(
      <SafeAreaView style={stylesheet.container}>
      <FlatList style={{marginTop : 20}}
      data={bottombarItems}
      renderItem={({item,index}) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: 0, 
            width : 100,
            height :100,
          }}>
            <TouchableOpacity style={{
            flex: 1, opacity: index <= 3 ? 1.0 : 0.5
          }} onPress={() => index <= 3 ? navigation.navigate(item.component) : ""}>
            <View style={stylesheet.imagecontainer}>
            <Image
            style={{ justifyContent: 'center',
            alignItems: 'center',
            height: 45,
            width:45,
            backgroundColor: '#fff',}}
            source={item.image}
           />
            </View>
            <View style={stylesheet.imagecontainer}> 
            <Text style = {stylesheet.headlinebootom} numberOfLines={2}>
       {item.title}           
     </Text>
     </View>  
     </TouchableOpacity>
        </View>
      )}
      //Setting the number of column
      numColumns={3}
      keyExtractor={(item, index) => index}
      scrollEnabled={false}
    />
    </SafeAreaView>
    );
   }
  
    return (
      <SafeAreaView style={stylesheet.container}>
           <FlatList
            style={{flex:1,shadowColor: '#171717', shadowOpacity: 0.2, shadowRadius: 3,}}
          data={TopBarItems}
          renderItem={({item}) => (
            <ImageBackground  source={require('../assets/CTE-Header-BG.png')} style={{flex:1}} >
                <View
                style={{
                flex: 1,
                flexDirection: 'column',
                margin: 10, 
                width : 100,
                height :100,
                }}>
                  {/* navigation.navigate(item.component) */}
                <TouchableOpacity style={{
                flex: 1,marginStart:10,opacity : 1.0 }} onPress={() => navigation.navigate(item.component)}>
                <View style={stylesheet.imagecontainer}>
                <View style = {stylesheet.imageThumbnailbg}>
                <Image
                style={stylesheet.imageThumbnail}
                source={item.image}
                />
                </View>
                </View>
                <View style={stylesheet.imagecontainer}> 
               <Text style = {stylesheet.headline} numberOfLines={2}>
                {item.title}
               </Text>
               </View>
               </TouchableOpacity>
                </View>
            </ImageBackground>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
          ListFooterComponent={footerview}
        />
      </SafeAreaView>
    );
}
  export default HomeViewController;

  