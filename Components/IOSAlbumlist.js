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
    Dimensions,
    ScrollView,
    Animated,
    useWindowDimensions,
    Alert,
    NativeModules,
    PermissionsAndroid,
    ImageBackground,
    Platform
  } from 'react-native';
   import { NavigationContainer,StackActions } from '@react-navigation/native';
   import { RFValue } from 'react-native-responsive-fontsize';
   import CameraRoll from '@react-native-community/cameraroll';
   import  { getAlbums } from "react-native-cameraroll-image-picker";
   import RNPhotosFramework from 'rn-photos-framework';

function IOSAlbumlist({navigation}){

  const [gallerylist, setAlbum] = useState('');
  const [usergallerylist, setuserAlbum] = useState('');


var getalbum = [];
var images = [];


// groupTypes : The group where the photos will be fetched, one of 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream' and 'SavedPhotos'. (Default: Album)
  // Call on App Start.
  useEffect(() => {
    RNPhotosFramework.requestAuthorization().then(statusObj => {
      if (statusObj.isAuthorized) {
        RNPhotosFramework.getAlbums({
          type: "smartAlbum",  
          assetCount: "exact",
          fetchOptions: {
            sortDescriptors: [
              {
                key: "title",
                ascending: true
              }
            ],
            includeHiddenAssets: false,
            includeAllBurstAssets: false
          },
          trackInsertsAndDeletes: true,
          trackChanges: false
        }).then(queryResult => {
            setAlbum(queryResult.albums)
        });
      }
    });  
  }, []);
  const getnormalAlbums = () => {
    RNPhotosFramework.requestAuthorization().then(statusObj => {
      if (statusObj.isAuthorized) {
        RNPhotosFramework.getAlbums({
          type: "album",  
          fetchOptions: {
            sortDescriptors: [
              {
                key: "title",
                ascending: true
              }
            ],
            includeHiddenAssets: false,
            includeAllBurstAssets: false
          },
          trackInsertsAndDeletes: true,
          trackChanges: false
        }).then(queryResult => {
            setuserAlbum(queryResult.albums)
        });
      }
    });
  };
  const fileuri = ''
  const filedata = ''
  const [getImages, setImages] = React.useState('');
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {width: windowWidth} = useWindowDimensions();
  let {height, width} = Dimensions.get('window');
  const screen = Dimensions.get('window')

  var albumimages =  []
  var albumtitles = []
  const [data, setData] = useState([]);
  const [userData, setuesrData] = useState('');
  const [titles, setTitles] = useState('');
  var userList = []

  useEffect(() => {
    askPermission();
  }, []);
   const getPhotos = () => {
      gallerylist.forEach((album) => {
        album.getAssets({
          //The fetch-options from the outer query will apply here, if we get
          startIndex: 0,
          endIndex: 0,
          mediaTypes:"Images",
          //When you say 'trackInsertsAndDeletes or trackAssetsChange' for an albums assets,
          //They will be cached and tracking will start.
          //Call album.stopTracking() to stop this. ex. on componentDidUnmount
          trackInsertsAndDeletes: true,
          trackChanges: false
      }).then((response) => {
        albumimages.push(response.assets)
        if(album['title'] == 'Videos'){
        }
        else{
        response.assets.forEach((gallery) => {
         userList.push({'image':gallery.image.uri,'group_name':album['title'],'count':album['assetCount'],'album':album})
        });
        }
        setData(userList)
      })
      .catch(error => {
        console.log(error);
      });; 
       
    });
  };
  const askPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      } else {
        getPhotos();
      }
    } else {
      getPhotos();
    }
  };
    React.useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count

        if(Platform.OS === 'android'){
          navigation.setOptions({
            headerLeft: () => (
              <View style = {{  flexDirection: 'row',
            }} >
              <TouchableOpacity 
            onPress={() => navigation.goBack()}>
            <Text style={{color:"#000",marginStart:10}}>Back</Text>
            </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style = {{  flexDirection: 'row',
          }} >
            <TouchableOpacity 
          onPress={() => navigation.goBack()}>
          <Text style={{color:"#000",marginEnd:10}}>Done</Text>
          </TouchableOpacity>
          </View>
        ),
          headerTitle : () => (
            <Text style={{color:"#ae0000",fontFamily: 'Roboto Bold',fontSize:RFValue(8,Dimensions.get('window').width)}}>Gallery</Text>
          ),
        });
        }else{
          navigation.setOptions({
            headerLeft: () => (
            <View style = {{  flexDirection: 'row',
          }} >
            <TouchableOpacity 
          onPress={() => navigation.goBack()}>
           <Image
            source={
              require("../assets/back-arrow.png")
            }
            style={{width:25,height:25,marginLeft:5}}
          />
          </TouchableOpacity>
          </View>
          ),
          headerTitle : () => (
            <Text style={{color:"#ae0000",fontFamily: 'Roboto Bold',fontSize:RFValue(10,Dimensions.get('window').width)}}>Settings</Text>
          ),
        });
        }
      }, [navigation]);

        const popAction = StackActions.pop(2);
return(
    <View style = {{  flexDirection: 'column',flex : 1,alignItems:'center'}}  onLayout={getPhotos}>
    <View >
       <FlatList
        data={data}
       numColumns={2}
       renderItem={({ item, index }) => (
        <View style={{backgroundColor:'#fff', margin: 4,width:"50%"}}>
           <TouchableOpacity onPress={() => 
            {
              item['album'].getAssets({
                mediaType:"image",
                trackInsertsAndDeletes: true,
                trackChanges: false
            }).then((response) => {
              let imagesofAlbum = []
              response.assets.forEach((gallery) => {
                imagesofAlbum.push({'image':gallery.image})
              });
              if(imagesofAlbum.count != 0){
                navigation.navigate('IOSGalleryList',{'albumname':imagesofAlbum})
              }
            })
            .catch(error => {
              console.log(error);
            }); 
            }
            } 
            >
         <ImageBackground style={{ height: 150, width: "100%" }} source={{ uri: item['image'] }} >
         <View  style={{    width: '100%',
    height: 30,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
    opacity:0.5 }}>
         <Text style={{color:"#fff",fontFamily: 'Roboto Bold',fontSize:RFValue(8,Dimensions.get('window').width),justifyContent: 'flex-start',width:"100%"}}>{item['group_name']}-{item['count']}</Text>
          </View> 
         </ImageBackground>
         </TouchableOpacity>
        </View>
      )}
    />
      </View>
      </View>
);
}
export default IOSAlbumlist
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    color : "#000000",
    margin : "2%",
    marginTop : 10,
    width : "60%",
    backgroundColor : "#ae0000",
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color : "#fff",
  },
  scrollContainer: {
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },
});