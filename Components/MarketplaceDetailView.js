import React from 'react';

// import InventoryMarketPlaces,{styles} from './InventoryMarketPlaces';
// import { StyleSheet, View, Text,Button,TouchableOpacity,Image,FlatList } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Pressable,
    TouchableOpacity,
    Button,
    ImageBackground,
    Animated,
    useWindowDimensions,
    Alert,
    Linking,
    Dimensions
  } from 'react-native';
import bgcolors from '../config/bgcolors';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { StackActions } from '@react-navigation/native';
import { getApi } from '../config/APIResponse';
import { resolveConfig } from 'metro-config';

function MarketplaceDetailView({route,navigation}){

    const  data  = route.params.item;
    const [getResults, setResults] = React.useState('');
    const [getdetailData, setdetailData] = React.useState('');

    const [getcarInfo, setcarInfo] = React.useState('');
    const [getclearcarinfo, setclearcarinfo] = React.useState('');
    const [geturl,setUrl] = React.useState(Platform.OS == 'android' ? "https://" : " ")
    const [getselection,setSelectin] = React.useState(0)

    var carinfo_ios = []
    var carinfo = []
    
    React.useEffect(() => {
          getData()
      },[])
    const getData = () => {
      
      getApi(bgcolors.baseURL,{
        action: "detailedmarketplace",
        dealer_id: "5995",
        listing_id : data.id,
        api_id:  "cteios2020v3.0",
      }).then(data => { console.log("data", data)
      result = JSON.parse(JSON.stringify(data))
        if(result.status == 1){
          let inventoryfields = result.car
          carinfo = result.car.gallery
          carinfo.forEach((element) => {
          images.push(element.xhdpi);
         });
         setResults(images)    
         const obj = {
          "images": images,
          "phonenumber": result.car.sellernumber
        }
        setdetailData(obj)
         result["Car Information IOS"].map((userData) => {
          userData.map( (data) => {
            carinfo_ios.push(data) 
          }
          );
         });    
         setcarInfo(carinfo_ios)
         setclearcarinfo(carinfo_ios)
         setSelectin(0)
        }
        else{
          Alert.alert(result.details)
        }
      }) 
    }
    const getCertificate = () => 
    {
      getApi(bgcolors.baseURL,{
        action: "getconditionreport",
              dealer_id: "5995",
              listing_id : data.id,
              api_id:  "cteios2020v3.0",
      }).then(data => { console.log("data", data)
      result = JSON.parse(JSON.stringify(data))
        if(result.status == 1){
          setUrl(result.url)
        }
        else{
          Alert.alert(result.details)
        }
      })
      }
      const getPrice = () => 
      {
        getApi(bgcolors.baseURL,{
          action: "gettrueprice",
          dealer_id: "5995",
          listing_id : data.id,
          api_id:  "cteios2020v3.0",
        listing_price : data.price,
        make : data.make,
        manuf_year : data.mfgyear,
        model:  data.model,
        owner:data.owner,
        version:data.version,
        city : data.city,
        }).then(data => { console.log("data", data)
        result = JSON.parse(JSON.stringify(data))
          if(result.status == 1){
            setUrl(result.url)
          }
          else{
            Alert.alert(result.details)
          }
        })
      }
    
   
    React.useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        const popAction = StackActions.pop(1);
        if(Platform.OS === 'android'){

          navigation.setOptions({
            headerLeft: () => (
           <View style={{ flex: 1, flexDirection: 'row' }}>
           <Text style= {{fontSize:RFValue(9,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:12,fontFamily:"Roboto Bold"}}>
            Marketplace Inventroy Car
          </Text>
              </View>
            ), 
            headerTitle : () => (
              <Text  color= "#fff"  title="" />
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
         <Text style= {{fontSize:RFValue(8,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:12,fontFamily:"Roboto Bold",width:"100%"}}>
          Marketplace Inventroy Car
         </Text>
            </View>
          ), 
          headerTitle : () => (
            <Text  color= "#fff"  title="" />
          ),
        });
      }
      }, [navigation]);

      carinfo = getResults
     

    const onProductDetailsWebViewMessage = event => {
        setWebviewHeight(Number(event.nativeEvent.data)/PixelRatio.get())
    }
  
    var images =  []

    
    const FooterFlatlist= ({}) => {
      return(
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 1, 
          width : "100%",
          backgroundColor : "black"
        }}
        
        >
      
   <FlatList 
        style={{flex:1,}}
      data={getcarInfo}
      renderItem={({item,index}) => (
            <TouchableOpacity style={{
            flex: 1 }} >
              <View style = {{ flexDirection: 'row',backgroundColor : index%2 == 0 ? "white" : "#F4F3F4",height:50}}>
              <Text style = {{color:"#000",textAlign:"left",margin:10,width : "25%",fontFamily:"Roboto Bold",fontSize : RFValue(9,Dimensions.get('window').width),marginTop:20}} >
             {item.name}
              </Text>
              <Text style = {{color:"#5A5A5A",textAlign:"left",margin:10,width : "65%",fontFamily:"Roboto Regular",fontSize : RFValue(9,Dimensions.get('window').width),marginTop:20}}>
             {item.value}
              </Text>
              </View>
     </TouchableOpacity>
      )}
      //Setting the number of column
      keyExtractor={(item, index) => 
        index}
      ListFooterComponentStyle={{ flexGrow: 1}}
      contentContainerStyle={{ flexGrow: 1 }}
    />
    <AutoHeightWebView hidden = {geturl.length == 0 ? true : false} 
scrollEnabled = {false}
 automaticallyAdjustContentInsets={false}
 javaScriptEnabled={true}
  source={{ uri:geturl.length == 0 ? geturl : geturl}}
/> 
   </View>

    
      );
   }   
    const FooterView = ({}) => {
  
    return(

    

<AutoHeightWebView hidden = {geturl.length == 0 ? true : false} style = {{backgroundColor : "red"}}
scrollEnabled = {false}
 automaticallyAdjustContentInsets={false}
 javaScriptEnabled={true}
  source={{ uri:geturl}}
/> 
    );
    }
    const headeView =({}) => {
      return(
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 1, 
          marginBottom:0,
          backgroundColor : "#ffffff"
        }}>       
   <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(  [{nativeEvent: {contentOffset: {x: scrollX}}}]
          )}
          scrollEventThrottle={1}>
          {Object.values(getResults).map((image, imageIndex) => {
            return (
              <TouchableOpacity style={{
                flex: 1 }} onPress={() => navigation.push("detailimageVC",getdetailData)}>
              <View style={{width: windowWidth, height: 350}} key={imageIndex}>
                  <ImageBackground source={{uri: image}} style={styles.card1}>
                </ImageBackground>
              </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {Object.values(getResults).map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, {width}]}
              />
            );
          })}
        </View>
      </View>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
          <Text style= {{fontSize:RFValue(10,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:15,marginTop:1,  fontFamily : "Roboto Bold"
}} >{'\u20B9'} {data.price}</Text>
             <View style={{ flex: 1, flexDirection: 'row',marginTop:10}}>
             <Text style= {{fontSize:RFValue(10,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:5,width:"75%",height:40,fontFamily : "Roboto Bold"}}>
              {data.make} {data.model} {data.version}
             </Text>
             <Image
          style={{ width: 88, height: 30,alignItems:'flex-end'}}
          source={require('../assets/certified.png')}
          resizeMode='contain'
        />
        </View>
              <View style={{ height: 1,width : "100%", backgroundColor: "grey",marginTop:5}} />
             <View style={{ flex: 1, flexDirection: 'row',height:30}}>
             <Text style= {styles.fontStyle} >{data.mfgyear}  </Text>
             <Text style= {styles.fontStyle} >| {data.mileage}KMs </Text>
             <Text style= {styles.fontStyle} >| {data.fueltype} </Text>
             </View>
             <View style={{ flex: 1, flexDirection: 'row',height:30}}>
             <Text style= {styles.fontStyle} >{data.transmission} </Text>
             <Text style= {styles.fontStyle} >| {data.color} </Text>
             <Text style= {styles.fontStyle} >| {data.owner} Owner</Text>
             </View> 
       </View>
    </View>
      );
    }
  
      var DATA = [
        {
          id: '0',
          title:  'DETAILS',
        },
        {
          id: '0',
          title:  'RIGHT PRICE',
        },
        {
          id: '0',
          title:  'CERTIFICATION',
        },
      ];

     function likePost({ item, index }) {
      setSelectin(index)

      if(index == 0){
        setcarInfo(getclearcarinfo)
        setUrl(Platform.OS == 'android' ? "https://" : " ")
      }
      if(index == 2){
        setcarInfo([])
        getCertificate()
      // setUrl("https://api.cartrade.com/mobile_api_json/GetConditionReport_latest_html.php?id=NzM0NTEwOA==") 
      }
      if(index == 1){
        setcarInfo([])
        getPrice()
       // setUrl("https://uat.cartradeexchange.com/mob/getusedcarpricequote?make=V4bY8YeWIBzcCVLt_rk2Pg&model=NTBDtjIYA8Qi7F0Efh8sjg&variant=U2IGWmOFVIIQKL5k6ZNYx3IrHPCVhpvRzSu_HsVrzIw&owners=6Yx9QFXoRkX-Bhn-UqnmnQ&entryYear=6V0k9k_wzEgc9uTa7D62pA&makeYear=Xi9e6tFzTWUfrwuUfpiXMw&cityId=94PXeRy-gq-33efr8e4xhA&kilometers=1Okqm4uJSWm5HGWrexN1tQ&valuationType=2")
      }
    }
      
    
      const scrollX = React.useRef(new Animated.Value(0)).current;
      const {width: windowWidth} = useWindowDimensions();
      return (
     // <FlatlistCell />
      <SafeAreaView style={styles.container}        
         showsHorizontalScrollIndicator={false}
      >
    <FlatList
        style={{flex:1,backgroundColor:"#fff",width:"100%"}}
      data={DATA}
      renderItem={({item,index}) => (
        
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 1, 
            width : 100,
            height:40,
            backgroundColor : "black"
          }}>
            <TouchableOpacity style={{
            flex: 1 }} onPress={() => 
               likePost({ item, index })}>
              <View>
              <Text style = {{color:"white",alignItems:"center",textAlign:"center",margin:10,fontSize:RFValue(8,Dimensions.get('window').width),fontFamily:"Roboto Bold"}} numberOfLines={2}>
             {item.title}
              </Text>
              <View style={{ height: 2, backgroundColor: getselection == index ? "#ae0000" : "#000",marginTop:0}} />
              </View>
     </TouchableOpacity>
     </View>
     
      )}
      //Setting the number of column
      numColumns={3}
      keyExtractor={(item, index) => 
        index}
      ListFooterComponentStyle={{ flexGrow: 1}}
      contentContainerStyle={{ flexGrow: 1 }}
      ListHeaderComponent={headeView}
      ListFooterComponent={FooterFlatlist}
          />
       {/* <FooterFlatlist />
       <FooterView /> */}
      <View style={{backgroundColor:"#ae0000",height:50}}>
      <Pressable
       style={{ alignItems: 'center',
       justifyContent: 'center',
       paddingVertical: 12,
       paddingHorizontal: "50%",
       borderRadius: 4,
       elevation: 3,
       //  color : "#ae0000",
       //  backgroundColor : "#ae0000",
       width:"100%"
       }}
        onPress={() =>  Linking.openURL(Platform.OS == 'android' ?  "tel:"+data.sellernumber : "telprompt:"+data.sellernumber)}>
        <Text style={{color:"#fff",width:"100%",justifyContent:'center',fontSize:RFValue(10,Dimensions.get('window').width),fontFamily:"Roboto Regular"}}>{data.sellernumber}</Text>
      </Pressable>
      </View>
    </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  fontStyle:{
    fontSize:RFValue(7,Dimensions.get('window').width),textAlign: "left",color :"#6D6D6D",flex:1/3,fontFamily:"Roboto Regular"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },
  card1: {
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode : 'contain'

  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    margin:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
    pagerView: {
      flex: 1,
    }, 
    viewPager: {
        flex: 1,
        backgroundColor : "@ae0000",

      },
      page: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: "100%",
        height: 200,
        margin: 0,
        flex : 1,
        marginEnd : 0,
        backgroundColor : "red",
       // resizeMode: 'contain',
       },button: {
        flex:1/3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        elevation: 3,
        color : "white",
        margin : "2%",
        marginTop : 100,
        height:30,
        backgroundColor : "black",
      },
      text: {
        fontSize: 12,
        lineHeight: 21,
        letterSpacing: 0.25,
        color : "#fff",
      },
  });
  
export default MarketplaceDetailView