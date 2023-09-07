import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
  } from 'react-native';
import bgcolors from '../config/bgcolors';
import { getApi } from '../config/APIResponse';
import { Share } from 'react-native';

  function InvetoryViewController({navigation}){
    React.useEffect(() => {
      // Use `setOptions` to update the button that we previously specified
      // Now the button includes an `onPress` handler to update the count
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
          <Text style= {{fontSize:16,textAlign: "left",color :"#000000",marginTop:10,marginStart:10,fontFamily:"Roboto Bold"}}>
          Online Inventory
          </Text>
          </View>
        ), 
        headerTitle : () => (
          <Text  color= "#fff"  title="" />
        ),
      });
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
  return item.image_thumbnail
}
const options = {
  title: 'My thoughts.',
  message: 'I want to share more with the world!',
  url: 'https://google.com'
}

const onShare = async () => {
  try {
    const result = await Share.share({
         title: 'My thoughts.',
         message: 'I want to share more with the world!',
         url: 'https://google.com'
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
}

    React.useEffect(() => {
          getData()
      },[])
    const getData = () => {
      getApi(bgcolors.baseURL,{
              action: "loadallinventory",
              api_id:  "cteios2020v3.0",
              app_code : "A3DC9491-02E3-4477-AF24-CF9BA3373789",
              dashboard_count : "",
              dashboard_value : "",
              dealer_id: 5995,
              design_version : "1",
              device_id: "A3DC9491-02E3-4477-AF24-CF9BA3373789",
              search_key : "",
              show_archieve : "n",
              show_sold : "n",
              sort_by : "all",
              spage : "1",
              status_filters : 'all',
      }).then(data => { console.log("data", data)
      result = JSON.parse(JSON.stringify(data))
      if(result.status == 1){
          let inventoryfields = result.inventory
            setResults(inventoryfields.fields)
            console.log(getResults)
        }
        else{
          Alert.alert(response.details)
        }
      })   
    }
    return(
        <FlatList
          data={getResults}
          renderItem={({ item, separators }) => (
             <View style ={styles.card}> 
             <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
             <Text >
              {item.make} {item.model} {item.variant} ({item.mfgyear})
             </Text>
             <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch',marginTop:10 }}>
             <View style={{ marginEnd:10 }}>
             <Image style ={styles.image} source={{uri:item.image_thumbnail == "" ? undefined : item.image_thumbnail}}/>
             </View>
             <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
             <Text style= {{fontSize:14,textAlign: "left",color :"#a7a7a7",marginTop:5,fontFamily: 'Roboto Italic',marginTop:1}} >{item.price}</Text>
             <Text style= {styles.textstyle} >CHECK MARKET PRICE</Text>
             <Text style= {{fontSize:14,textAlign: "left",color :"#a7a7a7",marginTop:5,fontFamily: 'Roboto Italic',marginTop:5}} >{item.mileage} KMs    |{item.fuel}</Text>
             <Text style= {{fontSize:14,textAlign: "left",color :"#a7a7a7",marginTop:5,fontFamily: 'Roboto Italic',marginTop:5}} >{item.color}</Text>
             </View> 
             </View>
             </View>
             <View style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch' }}>
             <Text style= {{fontSize:14,textAlign: "left",color :"#a7a7a7",marginTop:15,marginStart:1}} >Added on {item.addeddate}</Text>
             <Text style= {{fontSize:14,textAlign: "left",color :"#a7a7a7",marginTop:15,}} >Last Updated {item.updated}</Text>
              </View>
              <View style={{ height: 1, backgroundColor: "grey",marginTop:5}} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
             <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
             <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image
           style={{ width: 20, height: 20,marginTop:10, flex:1,marginStart:"50%"}}
           source={require('../assets/chat_whatsapp.png')}
           resizeMode='contain'
           />
       </TouchableOpacity>
       </View>
       <View style={{ height: 20,width : 1, backgroundColor: "grey",marginHorizontal:10,marginTop:5}} />
       <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
       <TouchableOpacity onPress={onShare}>
           <Image
          style={{  width: 20, height: 20,marginTop:10,marginStart:"50%"}}
          source={require('../assets/editNew.png')}
          resizeMode='contain'
          />
       </TouchableOpacity>
       </View>
       </View>
             </View>
          )}
          />
    );
  }
  export default InvetoryViewController
  const styles = StyleSheet.create({
    textstyle: {
      color :  "#ae0000",
   },
   image: {
    // width: 150,
    // height: 150,
    margin: 5,
    flex : 1,
    marginEnd : 10,
   // resizeMode: 'contain',
  },
    card: {
  
      shadowOpacity: 0.26,
      elevation: 8,
      backgroundColor: '#fff',
      padding: 10,
     // borderRadius: 10,
      margin: 5,
  
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
   
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
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
    },
  }
  )