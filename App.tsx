/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  LogBox,
  Dimensions

} from 'react-native';

import stylesheet from './config/stylesheet';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


import { NavigationContainer,StackActions,DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeViewController from './Components/HomeViewController';
import Forgotpassword from './Components/Forgotpassword';
import Dashboard from './Components/Dashboard';
import SettingsVC from './Components/SettingsVC';
import LeadMarketplace from './Components/LeadMarketplace';
import InvetoryViewController from './Components/InventoryViewController';
import InventoryMarketPlaces from './Components/InventoryMarketPlaces';
import MarketplaceDetailView from './Components/MarketplaceDetailView';
import LoginView from './Components/LoginViewController';
import { createDrawerNavigator,DrawerContentScrollView } from '@react-navigation/drawer';
import DetailImageViewController from './Components/DetailImageViewController';
import DealerDetailsVC from './Components/DealerDetailsVC';
import { SafeAreaView } from 'react-native-safe-area-context';
import Albumlist from './Components/Albumslist';
import DetailAlbumList from './Components/DetailAlbumList';
import GalleryList from './Components/GalleryList';
import AwesomeProject from './Components/Groupnames';
import IOSAlbumlist from './Components/IOSAlbumlist';
import IOSGalleryList from './Components/IOSGalleryList';
import ImagesViewController from './Components/ImagesViewController';
import RegisterForm from './Components/RgisterViewController';
import OtpInput from './Components/OTPViewController';
import OTPViewController from './Components/OTPViewController';
import NewContact from './Components/NewContact';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();






const sidemenulist = [
  { title: 'Home', content: 'HomeVC',image :require("./assets/Home.png")},
  { title: 'Lead Marketplaces', content: 'leadMarketplace',image : require("./assets/LeadMarketplace.png")},
  { title: 'DashBoard', content: 'DashboardVC',image : require( "./assets/Dashborad.png")},
  { title: 'Evaluations', content: '',image : require( "./assets/Evaluation.png")},
  { title: 'Inventory', content: 'inventoryVC',image : require('./assets/Inventory.png')},
  { title: 'Buy Leads', content: 'LeadMarketplace',image : require('./assets/BuyLeads.png')},
  { title: 'CarTrade Social', content: '',image : require("./assets/social_icon.png")},
  { title: 'Warranties', content: '',image : require("./assets/Warranties.png")},
  { title: 'OEM & Consumer', content: '',image : require("./assets/OEM&CosnumerCars.png")},
  { title: 'CarTrade Price', content: '',image :require( "./assets/cartradePrice.png")},
  { title: 'Inventory Market', content: 'marketplaceVC',image : require("./assets/InventoryMarketplace.png")},
  { title: 'RTO Check', content: '',image : require("./assets/RTOCheck.png")},
  { title: 'Auctions', content: '',image : require( './assets/Auctions.png')},
  { title: 'Payments', content: '',image : require("./assets/Payment.png")},
  { title: 'Dealer Details', content: '',image : require("./assets/DealerDetails.png")},
  { title: 'Settings', content: 'settings',image : require("./assets/Settings.png")}
];
const myItemSeparator = () => {

  return <View style={{ height: 1, backgroundColor: "gray",marginHorizontal:10}} />;
  };
  function CustomDrawerContent({navigation}: {navigation: any}) {
    const width = useWindowDimensions().width * 0.3;  
      return (
     // <DrawerContentScrollView>
        <FlatList 
        data={sidemenulist}
        renderItem={({ item, separators }) => (
         <TouchableOpacity style={{
      flexDirection: 'row',
      height:50,
      flex :1,
        }} onPress={() =>{
          navigation.dispatch(DrawerActions.closeDrawer)
            if(item.content == "logout"){
            navigation.dispatch(StackActions.popToTop())
            }
            else{
              navigation.navigate(item.content)
            } 
        }
        }>
           <Image style ={stylesheet.sidemenuimage} source={item.image}/>
           <Text style = {stylesheet.sidemenuTitle} numberOfLines={1}>
             {item.title}
           </Text>
       </TouchableOpacity>
        )}
        ItemSeparatorComponent={myItemSeparator}
      />
 // </DrawerContentScrollView>    
    );
  }

function Root() {
  return (
    <Drawer.Navigator  screenOptions={{drawerPosition:"right",  drawerStyle: {
      width: Dimensions.get('window').width/2,
    },}} drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="HomeVC" component={HomeViewController} />
    <Drawer.Screen name="leadMarketplace" component={LeadMarketplace}/>
      <Drawer.Screen name="inventoryVC" component={InvetoryViewController}/>
      <Drawer.Screen name="marketplaceVC" component={InventoryMarketPlaces}/>
      <Drawer.Screen name="marketplaceDetailVC" component={MarketplaceDetailView}/>
      <Drawer.Screen name='detailimageVC' component={DetailImageViewController}/>
      <Drawer.Screen name="DealerDetails" component={DealerDetailsVC}/>
  </Drawer.Navigator> 
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginView}   />
      <Stack.Screen name="RootVC" options={{
        headerShown: false}} component={Root}/>
      <Stack.Screen name="ForgotVC" component={Forgotpassword}/>
      <Stack.Screen name="DashboardVC" component={Dashboard}/>
      <Stack.Screen name="GalleryList" component={GalleryList} />
      <Stack.Screen name="GroupNames" component={AwesomeProject} />

      <Stack.Screen name="settings" component={SettingsVC}/>
      <Stack.Screen name="leadMarketplace" component={LeadMarketplace}/>
      <Stack.Screen name="inventoryVC" component={InvetoryViewController}/>
      <Stack.Screen name="marketplaceVC" component={InventoryMarketPlaces}/>
      <Stack.Screen name='detailimageVC' component={DetailImageViewController}/>
      <Stack.Screen name="marketplaceDetailVC" component={MarketplaceDetailView}/>
      <Stack.Screen name="DealerDetails" component={DealerDetailsVC} />
      <Stack.Screen name="Albumlist" component={Albumlist} />
      {/* <Stack.Screen name="IOSAlbumlist" component={IOSAlbumlist} /> */}
      <Stack.Screen name="IOSAlbumlist" component={ImagesViewController} />
      <Stack.Screen name="IOSGalleryList" component={IOSGalleryList} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="OTPViewController" component={OTPViewController} />


      </Stack.Navigator>
  );
}

function App(): JSX.Element {

  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs()
  return (
    <NavigationContainer>
      <MyStack />
  {/* <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginView}   />
      </Stack.Navigator> */}
          </NavigationContainer>
);

}


export default App;
