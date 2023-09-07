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

  function OemConsumerCars({navigation}){
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
          OEM & Consumer Cars
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
    const [getpriceURL, setpriceURL] = React.useState('');

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
      const getPai = (leadid) => {
        console.log(leadid)
        getApi(bgcolors.baseURL,{
                action: "pai",
                api_id:  "cteios2020v3.0",
                app_code : "A3DC9491-02E3-4477-AF24-CF9BA3373789",
                dashboard_count : "",
                dashboard_value : "",
                dealer_id: 5995,
                design_version : "1",
                device_id: "A3DC9491-02E3-4477-AF24-CF9BA3373789",
                search_key : "",
                "lead_id" : leadid,
                "pricetype" : "2"
        }).then(data => { 
        result = JSON.parse(JSON.stringify(data))
        if(result.status == 1){
             setpriceURL(result.url)
             navigation.push('CTEPrice',{'priceURL':result.url})
          }
          else{
            Alert.alert(response.details)
          }
        })   
      }
    const getData = () => {
      getApi(bgcolors.baseURL,{
              action: "consumeroffers",
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
      }).then(data => { 
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
    return(
        <FlatList
          data={getResults}
          renderItem={({ item, separators }) => (
             <View style ={styles.card}> 
             <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
             <Text style={{fontFamily:'"Roboto Bold"',fontSize:18,color:"#000"}}>
              {item.title}
             </Text>
             <Text style={{fontFamily:'"Roboto Regular"',fontSize:16,color:"#D3D3D3",marginTop:5}}>
              {item.cl_text}
             </Text>
             
             <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch',marginTop:10 }}>
             <View style={{ marginEnd:10 }}>
             <Image style ={styles.image} source={{uri:item.images.xhdpi == "" ? undefined : item.images.xhdpi}}/>
             </View>
             <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
             <Text style= {{fontSize:14,textAlign: "left",color :"#000",marginTop:5,fontFamily: 'Roboto Regular',marginTop:1}} >{item.mileage} Kms |  Diesel</Text>
             <Text style= {{fontSize:14,textAlign: "left",color :"#000",marginTop:5,fontFamily: 'Roboto Regular',marginTop:5}} >{item.color}    | Owner:{item.owner}</Text>
             <Text style= {{fontSize:14,textAlign: "left",color :"#000",marginTop:5,fontFamily: 'Roboto Regular',marginTop:5}} >Exp Price: {item.ucm_exp_price}</Text>
             <TouchableOpacity onPress={() => {
                getPai(item.id)
             }}>
             <Text style= {{fontSize:14,textAlign: "left",color :"#6495ED",marginTop:5,fontFamily: 'Roboto Regular',marginTop:5,textDecorationLine: "underline",
             textDecorationStyle: "solid",
             textDecorationColor: "#6495ED",}} >{item.pai_text}s</Text>
              </TouchableOpacity>
             <Text style= {{fontSize:14,textAlign: "left",color :"#000",marginTop:5,fontFamily: 'Roboto Regular',marginTop:5}} > {item.area}</Text>

             </View> 
             </View>
             </View>
             <Text style= {{fontFamily:'"Roboto Regular"',fontSize:16,color:"#D3D3D3"}} >{item.date}</Text>
             <Text style= {{fontFamily:'"Roboto Bold"',fontSize:16,color:"#ae0000",textAlign:"right"}} >{item.button_text}</Text>
             <Text style= {{fontSize:14,color :"#a7a7a7",marginTop:10,marginStart:1,textAlign: 'center'}} >{item.mark_text}</Text>
             </View>
          )}
          />
    );
  }
  export default OemConsumerCars
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