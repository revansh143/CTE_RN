import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Text,
    Pressable,
    TouchableOpacity,
    Button,
    ImageBackground,
    Animated,
    useWindowDimensions,
    Dimensions,
    Platform,
    ScrollView,
    Linking
  } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

function DetailImageViewController({route,navigation}){

   
    const [getResults, setResults] = React.useState('');


    const defaultProps = {
      doAnimateZoomReset: false,
      maximumZoomScale: 2,
      minimumZoomScale: 1,
      zoomHeight: Dimensions.get('window').height, 
      zoomWidth: Dimensions.get('window').width,
    }
    const handleResetZoomScale = (event) => {
      this.scrollResponderRef.scrollResponderZoomTo({ 
         x: 0, 
         y: 0, 
         width: this.props.zoomWidth, 
         height: this.props.zoomHeight, 
         animated: true 
      })
    }
    setZoomRef = node => { //the ScrollView has a scrollResponder which allows us to access more methods to control the ScrollView component
      if (node) {
        this.zoomRef = node
        this.scrollResponderRef = this.zoomRef.getScrollResponder()
      }
    }
    
    


    React.useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        let phoneNumber = '';
        if(Platform.OS === 'android'){
          navigation.setOptions({

            headerLeft: () => (
              <View style={{ flex: 1, flexDirection: 'row' }}>
             <Text style= {{fontSize:RFValue(9,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:12,marginStart:5,fontFamily:"Roboto Bold"}}>
              Marketplace Car Images
             </Text>
             </View>
              ), 
              headerTitle : () => (
                <Text  color= "#00000"  title="" />
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
             <Text style= {{fontSize:RFValue(9,Dimensions.get('window').width),textAlign: "left",color :"#000000",marginTop:12,marginStart:5,fontFamily:"Roboto Bold"}}>
              Marketplace Car Images
             </Text>
             </View>
              ), 
              headerTitle : () => (
                <Text  color= "#00000"  title="" />
              ),
            });
          }
      }, [navigation]);
  

    React.useEffect(() => {
        //  fetchData()
     setResults(route.params["images"])
      },[])
    


      const scrollX = React.useRef(new Animated.Value(0)).current;
      const {width: windowWidth} = useWindowDimensions();
      let {height, width} = Dimensions.get('window');
      const screen = Dimensions.get('window')

      scale = new Animated.Value(1)

      onPinchEvent = Animated.event(
        [
          {
            nativeEvent: { scale: this.scale }
          }
        ],
        {
          useNativeDriver: true
        }
      )
    
      onPinchStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
          Animated.spring(this.scale, {
            toValue: 1,
            useNativeDriver: true
          }).start()
        }
      }

      return (
       // <Text>hello detail</Text>

        <SafeAreaView style={styles.container}        
        showsHorizontalScrollIndicator={false}
     >
    
     {/* <ScrollView style={{flex:1,width:"100%",backgroundColor:"#000"}} horizontal={false}> */}
     <View style={{flex:1,width:"100%",justifyContent: 'center',marginTop:100,backgroundColor:"#fff"}}>
       <ScrollView
       style = {{backgroundColor : "#000"}}
         horizontal={true}
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}]
         )}
         scrollEventThrottle={1}>
         {Object.values(getResults).map((image, imageIndex) => {
                   return (
                   <View style={{width: width, height: height/2,justifyContent:"center",backgroundColor : "#000"}} key={imageIndex}>   
                   <Image source={{uri: image}} style={styles.card1} 
                    minimumZoomScale={1}/>
                   </View>
                   );
                  
         })}
       </ScrollView>
       
       
        {/* <Gallery
        style={{flex: 1, backgroundColor: 'black'}}
        images={[
          'http://p10.qhimg.com/t019e9cf51692f735be.jpg',
          'http://ww2.sinaimg.cn/mw690/714a59a7tw1dxqkkg0cwlj.jpg',
          'http://www.bz55.com/uploads/allimg/150122/139-150122145421.jpg'
        ]}
      /> */}
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
     {/* </ScrollView> */}
     <View style={{backgroundColor:"#ae0000",marginBottom:0,height:50}}>
      <Pressable
       style={{ alignItems: 'center',
       justifyContent: 'center',
       paddingVertical: 12,
       paddingHorizontal: "50%",
       borderRadius: 4,
       elevation: 3,
       color : "#ae0000",
       backgroundColor : "#ae0000",
       width:"100%"
       }}
        onPress={() => Linking.openURL(Platform.OS == 'android' ?  "tel:"+route.params["phonenumber"] : "telprompt:"+route.params["phonenumber"])}>
        <Text style={{color:"#fff",width:"100%",justifyContent:'center'}}>CONTACT SELLER</Text>
      </Pressable>
      </View>
   </SafeAreaView>
      );
}
const styles = StyleSheet.create({
    fontStyle:{
      fontSize:14,textAlign: "left",color :"#6D6D6D",flex:1/3
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor : "#000000"
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
      backgroundColor:"#000000",
      resizeMode : "stretch",
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
    //   marginTop:"50%",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor : "#fff"
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
        },
       
       
        button: {
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
    
  
export default DetailImageViewController