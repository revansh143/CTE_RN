import React, {useEffect, useState} from 'react';
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
    Modal,
    Linking,
    Dimensions
  } from 'react-native';
  import stylesheet from '../config/stylesheet';
import bgcolors from '../config/bgcolors';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Loader from './Loader';
import { getApi } from '../config/APIResponse';
//import Modal from "react-native-modal";

  function InventoryMarketPlaces({navigation}){

    const [isloading, setloading] = useState(false);

    const [getCity, setCity] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const [modalInfo, setModalInfo] = React.useState("");
    const DATA = [
      {
        title: 'New Delhi',
      },
      {
        title: 'Mumbai',
      },
      {
        title: 'Kolkata',
      },
    ];
    
   

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
            Marketplace Inventroy
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
        Marketplace Inventroy
      </Text>
          </View>
        ), 
        headerTitle : () => (
          <Text  color= "#fff"  title="" />
        ),
      });
    }
    }, [navigation]);
    var result = [];
    var carsList = [];
 const [getResults, setResults] = React.useState('');
 const useCheckFeatureOn = (item) => {
  var str = '';
  item.cars.forEach(subproduct => {
    carsList.push(subproduct.car)
    str += subproduct.car + "\n ";
   })
   return str
}
const imageThumb = (item) =>
{
  return item.images.xhdpi
}

    React.useEffect(() => {
        //  fetchData()
        setCity('Mumbai')
          getData()
      },[])
    const getData = () => {
       setloading(true)

       getApi("https://uat.cartradeexchange.com/mobile_api_json/",{
        action: "marketplace",
        certification_filter:  "0",
        city : getCity,
             dealer_id: "5995",
             from_index : "1",
             latitude: "16.992004",
             longitude : "82.240575",
             order_list : "",
             pics : "0",
             api_id:  "cteios2020v3.0",
      }).then(data => { console.log("data", data)
      setloading(false)
      result = JSON.parse(JSON.stringify(data))
        if(result.status == 1){
          let inventoryfields = result.result
          setResults(inventoryfields)
        }
        else{
          Alert.alert(response.details)
        }
      })
    }
    const myItemSeparator = () => {
        return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
        };
    return(
      <SafeAreaView>
        <View style={{backgroundColor : "#fff",
      padding: 2,
      borderColor : "#d3d3d3",borderBottomWidth:1,borderTopWidth:1,borderRightWidth:1,borderLeftWidth:1,  shadowColor: '#000',    flexDirection: 'row',
      }}>
     <Loader loading ={isloading}/>
     <Text style={{color : "#000",
     fontFamily : "Roboto Bold",
     fontSize : RFValue(9,Dimensions.get('window').width),height:30,justifyContent: "center",alignItems:'center',marginTop:10,}}>Markerplace Inventory</Text>
      <TouchableOpacity onPress={() =>  setIsModalVisible(true)}>
      <Text style={{color : "#000",
    fontFamily : "Roboto Bold", flex: 1,
    justifyContent: 'center',
    alignItems: 'center',marginTop:20,marginStart:"50%",
    fontSize : RFValue(9,Dimensions.get('window').width),height:30,justifyContent: "center",alignItems:'center',marginTop:10}}>{getCity}</Text>
         </TouchableOpacity>
          </View>
        <FlatList
          data={getResults}
          renderItem={({ item, separators }) => (
             <View style ={stylesheet.card}> 
              <TouchableOpacity onPress={() => 
                 navigation.push("marketplaceDetailVC",{item},{goBack:"marketpage"})}>
             <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
             <Text  style= {{fontSize:RFValue(10,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:5,marginTop:1,fontFamily:"Roboto Bold"}}>
              {item.make} {item.model} {item.version}
             </Text>
             <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch',marginTop:10 }}>
             <View style={{ marginEnd:10 }}>
             <Image style ={stylesheet.image} source={{uri:imageThumb(item)}}/>
              </View>
             <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
             <Text style= {{fontSize:RFValue(10,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:5,marginTop:1,  fontWeight: 'bold',fontFamily:"Roboto Bold"
}} >{'\u20B9'} {item.price}</Text>
             <Text style= {stylesheet.textstyle} >CHECK MARKET PRICE</Text>

             <Text style= {{fontSize:RFValue(7,Dimensions.get('window').width),textAlign: "left",color :"#6D6D6D",marginTop:5,marginTop:20,fontFamily:"Roboto Regular"}} >{item.mfgyear}  |{item.mileage}KMs</Text>

             <Text style= {{fontSize:RFValue(7,Dimensions.get('window').width),textAlign: "left",color :"#6D6D6D",marginTop:5,marginTop:20,fontFamily:"Roboto Regular"}} >{item.fueltype} |{item.color}</Text>
             <Image
              style={{ width: 88, height: 30,marginTop:10 }}
              source={require('../assets/certified.png')}
              resizeMode='contain'
             />
             </View> 
             </View>
             </View>
             </TouchableOpacity>
             <View style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch' }}>
             <Text style= {{fontSize:RFValue(5,Dimensions.get('window').width),textAlign: "left",color :"#6D6D6D",marginStart:1,marginEnd:30,fontFamily:"Roboto-Italic"}} >{item.postingdate}</Text>
             <Text style= {{fontSize:RFValue(5,Dimensions.get('window').width),textAlign: "left",color :"#6D6D6D",fontFamily:"Roboto Italic"}} >{item.distance} KMs away</Text>
             <View style={stylesheet.centeredView}>
             <Modal 
             transparent={true}
             visible={modalVisible}
             onRequestClose={() => {
             //  Alert.alert('Modal has been closed.');
             setModalVisible(!modalVisible);
             }}>
           <View style={stylesheet.centeredView}>
           <View style={stylesheet.modalView}>
           <Text style={{color : "#CB1500",textAlign:'left',fontFamily : "Roboto Regular", fontSize : RFValue(10,Dimensions.get('window').width)}}>Contact Details</Text>
           <Text style={stylesheet.modalText}>{item.sellername}</Text>
           <View style={{backgroundColor:"#CB1500",height:1,width:"100%",marginBottom:15}}>       
           <Text style={stylesheet.modalText}>{item.selleraddress}</Text>
           </View>
          <Text style={stylesheet.modalText}>{item.selleraddress}</Text>
            <View style={{ flexDirection: 'row'}}>
            <Image
          style={{ width: 50, height: 50,marginTop:0 }}
          source={require('../assets/toll-free-call.png')}
          resizeMode='contain'
        />
            <Text style={{color : "#ae0000", textAlign:'left',marginTop:15,height:50,justifyContent:'center',fontFamily : "Roboto Regular", fontSize : RFValue(7,Dimensions.get('window').width)}}>{item.sellernumber}</Text>
            </View>
            <View style={{ flexDirection: 'row',width:"50%",alignItems:"flex-end",marginStart:"50%"}}>
            <Pressable
             style={stylesheet.inventorybuttonPlain}
              onPress={() => [Linking.openURL(Platform.OS == 'android' ?  "tel:"+item.sellernumber : "telprompt:"+item.sellernumber),setModalVisible(false)]
              }>
              <Text style={stylesheet.textStyleplain}>CALL</Text>
            </Pressable>
              <Pressable
              style={stylesheet.inventorybuttonPlain}
              onPress={() => setModalVisible(false)}>
              <Text style={stylesheet.textStyleplain}>CLOSE</Text>
              </Pressable>
          </View>
          </View>
        </View>
      </Modal>
      </View>
      <Pressable
       style={stylesheet.inventorybutton}
        onPress={() => setModalVisible(true)}>
        <Text style={stylesheet.textStyle}>CONTACT SELLER</Text>
      </Pressable>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
       </View>
             </View>
          )}
          />
<View style={stylesheet.centeredView}>
             <Modal
             animationType="slide"
             transparent={true}
             visible={isModalVisible}
             onRequestClose={() => {
             Alert.alert('Modal has been closed.');
             setModalVisible(!isModalVisible);
             }}>
        <View style={stylesheet.centeredView}>
        </View>
          <View style={stylesheet.modalViewfilter}>
          <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => 
                [setCity(item.title),
                setIsModalVisible(false),getData()]}>
             <View style={{ flex: 1, flexDirection: 'row' }}>
             <Text style={{color:"#fff",height:25,marginTop:20,margin:10,flex:1}}>{item.title}</Text>
             <Image
             style={{ width: 20, height: 20,  flex: 1,
             justifyContent: 'center',
             alignItems: 'center',marginTop:20,margin:10 }}
             source={require('../assets/radio_uncheck.png')}
              resizeMode='contain'
             />  
             </View>
             </TouchableOpacity>    
          )}
          style={{ height: 200,width:"100%" }}
          ItemSeparatorComponent={<View style={{ height: 1, backgroundColor: "gray",marginHorizontal:10,width:"100%"}} />}
        />
          </View>
      </Modal>
      </View>
          </SafeAreaView>
    ); 
  }
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 40,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
  });
  export default InventoryMarketPlaces


  