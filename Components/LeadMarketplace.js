import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Pressable,
    TouchableOpacity,
    Dimensions,
    Platform
  } from 'react-native';
import bgcolors from '../config/bgcolors';
import { getApi } from '../config/APIResponse';

  function LeadMarketplace({navigation}){
    React.useEffect(() => {
      // Use `setOptions` to update the button that we previously specified
      // Now the button includes an `onPress` handler to update the count
      if(Platform.OS === 'android'){
        navigation.setOptions({
          headerLeft: () => (
            <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style= {{fontSize:16,textAlign: "left",color :"#000000",marginTop:10,marginStart:10,fontFamily:"Roboto-Bold"}}>
            Lead Marketplaces
             </Text>
            </View>
          ), 
          headerTitle : () => (
            <Text  color= "#ae0000"  title="" />
          ),
        });
      }else{
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
      <Text style= {{fontSize:16,textAlign: "left",color :"#000000",marginTop:10,marginStart:10,fontFamily:"Roboto-Bold"}}>
        Lead Marketplaces
      </Text>
          </View>
        ), 
        headerTitle : () => (
          <Text  color= "#ae0000"  title="" />
        ),
      });
    }
    }, [navigation]);
    
    var result = [];
    var carsList = [];

    const [getResponse, setResponse] = React.useState('');
    const [getResults, setResults] = React.useState('');

 const useCheckFeatureOn = (item) => {
  var str = '';
  item.cars.forEach(subproduct => {
    carsList.push(subproduct.car)
    str += subproduct.car + "\n ";
   })
   return str
}


    React.useEffect(() => {
        //  fetchData()
          getData()
      },[])
    const getData = () => {
      getApi(bgcolors.baseURL,{
        action: "getconditionreport",
        action: "leadmarketplace_v1",
        api_id:  "cteios2020v3.0",
        dealer_id: 5995,
        device_id: "A3DC9491-02E3-4477-AF24-CF9BA3373789",
        filter_age : "",
        filter_city : "",
        filter_fuel : "",
        filter_hot : "n",
        filter_make : "",
        filter_model : "",
        filter_owners : "",
        page_limit : 20,
        showleads : 0,
        spage : 1,
      }).then(data => { console.log("data", data)
      result = JSON.parse(JSON.stringify(data))
        if(result.status == 1){
          setResults(result.result)
        }
        else{
          Alert.alert(result.details)
        }
      })
    }
    const myItemSeparator = () => {
        return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
        };
    return(
        <FlatList
          data={getResults}
        //   keyExtractor={(item, index) => item.result}
          renderItem={({ item, separators }) => (
             <TouchableOpacity onPress={() => navigation.navigate("detailhomepage",{item, screen: 'Detail Page' })}>
             <View style ={styles.card}> 
             <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
             <Text style= {styles.textstyle} >(Click to view deal details)</Text>
             <Text style = {{  fontFamily : "Roboto Regular",
              fontSize : Dimensions.get('window').width > 375 ? 18 : 16,color:"#000000"}}>
               Added on : {item.added_on}
             </Text>
             <Text style= {{textAlign: "left",color :"#d3d3d3",marginTop:5,fontFamily : "Roboto Italic", fontSize : Dimensions.get('window').width > 375 ? 15 : 13}} >{item.source}</Text>
             <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10,marginTop:5}} />
             </View> 
             <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
             <Text style= {{textAlign: "left",color :"#000000",marginTop:10,fontFamily : "Roboto Medium", fontSize : Dimensions.get('window').width > 375 ? 15 : 13}} numberOfLines={1}> Inquired Cars </Text>
             <Text style= {{textAlign: 'left',color :"#000000",marginStart:10,marginEnd:10,marginTop:10,fontFamily : "Roboto Regular", fontSize : Dimensions.get('window').width > 375 ? 15 : 13,justifyContent:'flex-start'}} > {useCheckFeatureOn(item)} </Text>
            
            <View style={{ flexDirection: 'column',flex : 1,alignItems:'center'}}>
            <Pressable style={[styles.buttonShow,item.click_view == "y" ? {} : styles.buttonhide]} onPress={() => {
               //  navigation.navigate('ForgotVC')
               }}>
           <Text style = {styles.text}>CLICK TO VIEW LEAD DETAILS</Text>
           </Pressable>
           <View style={{ height: 1,width :  item.click_view == "n" ? "100%" : 0, backgroundColor: "#d3d3d3",marginHorizontal:10,marginTop:5}} />

           <View style={[styles.viewbottomlist,item.click_view == "n" ? {} : styles.buttonhide]}>
           <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
          style={[item.click_view == "n" ? {width: 30, height: 30,marginTop:10,marginStart:"30%"} : styles.buttonhide]}
          source={require('../assets/SMS.png')}
          resizeMode='contain'
          />
          </TouchableOpacity>
          </View>
       <View style={{ height:  item.click_view == "n" ? 40 : 0,width : 1, backgroundColor: "#d3d3d3",marginTop:5}} />
       <View style={ [item.click_view == "n" ? { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'} : styles.buttonhide]}   >
       <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image
          style={[item.click_view == "n" ? {width: 30, height: 30,marginTop:10,marginStart:"30%"} : styles.buttonhide]}
          source={require('../assets/chat_whatsapp.png')}
          resizeMode='contain'
        />
       </TouchableOpacity>
       </View>
       <View style={{ height: item.click_view == "n" ? 40 : 0,width : 1, backgroundColor: "#d3d3d3",marginHorizontal:10,marginTop:5}} />
       <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image
          style={[item.click_view == "n" ? {width: 30, height: 30,marginTop:10,marginStart:"30%"} : styles.buttonhide]}
          source={require('../assets/icon_plus_green.png')}
          resizeMode='contain'
        />
       </TouchableOpacity>
       </View>
       </View>
           </View>
             </View>
             </View>
             </TouchableOpacity>
          )}
          />
    );  
  }

  export default LeadMarketplace


  const styles = StyleSheet.create({
    viewbottomlist:{
       flex: 1, flexDirection: 'row' 
    },
    textstyle: {
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      textDecorationColor: "#000",
      fontFamily : "Roboto-Bold",
      fontSize : Dimensions.get('window').width > 375 ? 18 : 16,
      color: "#000000"
   },
    card: {
    //  shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
    //  shadowRadius: 6,
    //  shadowOpacity: 0.26,
      backgroundColor: '#fff',
      // padding: 10,
     // borderRadius: 10,
      margin: 5,
      borderColor : "#d3d3d3",borderBottomWidth:1,borderTopWidth:1,borderRightWidth:1,borderLeftWidth:1,
  
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 16,
      // borderWidth: 1,
      // borderColor: 'red',
    },
    image: {
      width: 150,
      height: 150,
      flex : 1,
      top : 0,
    },
    shareimage: {
      width: 15,
      height: 15,
     top : 0,
     backgroundColor : 'white',
     right : 25,
     borderRadius : 10,
    },
    textCenter: {
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '50%',
      // borderWidth: 1,
      // borderColor: 'blue',
    },
    topBorder :{
      width: '25%%',
      backgroundColor: '#00B8D4',
      borderRightColor: 'red',
      borderRightWidth: 5,
    },
    buttonhide: {
     width:0,
      height:0,
    },
    buttonShow: {
      width:"70%",
       height:40,
       backgroundColor : "#ae0000",
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 4,
     },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      elevation: 3,
      color : "#000000",
      margin : "2%",
      marginTop : 100,
      width : "70%",
      height:30,
      backgroundColor : "#ae0000",
    },
    text: {
      fontSize: 12,
      lineHeight: 21,
      letterSpacing: 0.25,
      color : "#fff",
      fontFamily : "Roboto Bold",
      fontSize : Dimensions.get('window').width > 375 ? 15 : 13
    },
  }
  )