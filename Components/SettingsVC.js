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
    Platform,
    
  } from 'react-native';
  import { NavigationContainer,StackActions } from '@react-navigation/native';
  import * as ImagePicker from 'react-native-image-picker';
  import MultiImagePicker from 'react-native-image-crop-picker';

  import { RFValue } from 'react-native-responsive-fontsize';
import stylesheet from '../config/stylesheet';
import CameraRoll from '@react-native-community/cameraroll';
 import  { getAlbums } from "react-native-cameraroll-image-picker";




function SettingsVC({navigation}){
  const [albumlist, setAlbum] = useState('');

var getalbum = [];
 
  // Call on App Start.
  useEffect(() => {
    (async function handleGetAlbums() {
            const result = await getAlbums({assetType: "Photos", albumType: "All",});
            getalbum = result;
            setAlbum(result)

          })();
    

  }, []);
 
 
  
 
 
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
  const [titles, setTitles] = useState('');
  var userList = []

  useEffect(() => {
    askPermission();
  }, []);
 
   const getPhotos = () => {
    // for each album, get the first photo

    const albumDataAll =  Promise.all(albumlist.map(async (album) => {
        const photos =  CameraRoll.getPhotos({
          first: 1,
          assetType: "Photos",
          groupName: album['value'],
          groupTypes: "Album"
        }) .then(res => {
            albumimages.push(res.edges)
           res.edges.forEach((gallery) => {
            userList.push({'image':gallery.node.image.uri,'group_name':album['value']})
           });
           setData(userList)
        })
        .catch(error => {
          console.log(error);
        });;
    }));
  };
  const askPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
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



multipleimages = () => {
  MultiImagePicker.openPicker({
    multiple: true,
    compressImageQuality: 0.5,
    maxFiles:10,
}).then(async images => {
const result = [];
for await (const image of images) {
    result.push(image.path);
}
setImages(result)


});
}

  OpenlaunchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
      }
    });
  }
 const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        multiple : true
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
          this.fileData = response.data,
          this.fileUri = response.uri
      }
    });  
  }

    React.useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        if(Platform.OS === 'android'){
          navigation.setOptions({
            headerLeft: () => (
            <View style = {{  flexDirection: 'row',
          }} >
          </View>
          ),
          headerTitle : () => (
            <Text style={{color:"#ae0000",fontFamily: 'Roboto Bold',fontSize:RFValue(10,Dimensions.get('window').width)}}>Settings</Text>
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

    <View style = {{  flexDirection: 'column',flex : 1,alignItems:'center'
}} >
    <Text style = {{color : "#ae0000",marginTop : 50,fontSize: 22,fontFamily: 'Roboto Bold',
}}> Version 11.0 </Text>
    <Pressable style={stylesheet.settingsbutton} onPress={() => {
       //   getPhotos()
       OpenlaunchCamera()
          }}>
      <Text style = {stylesheet.settingstext}>Multiple Gallery</Text>
    </Pressable>
    <Pressable style={stylesheet.settingsbutton} onPress={() => {
        //  navigation.navigate('About')
        if(Platform.OS == 'android'){
          navigation.navigate('Albumlist') 
        }else{
          //navigation.navigate('Albumlist') 
         navigation.navigate('IOSAlbumlist') 
        }    
          }}>
      <Text style = {stylesheet.settingstext}>Gallery</Text>
    </Pressable>

    <Pressable style={stylesheet.settingsbutton} onPress={() => {
        //  navigation.navigate('Albumlist')
          }}>
      <Text style = {stylesheet.settingstext}>System info</Text>
    </Pressable>
    <Pressable style={stylesheet.settingsbutton} onPress={() => {
         navigation.dispatch(popAction)
          }}>
      <Text style = {stylesheet.settingstext}>Logout</Text>
    </Pressable>
    <View >
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({ item, index }) => (
        <View style={{backgroundColor:'#fff', margin: 4,width:"50%"}}>
         <Text>{item['group_name']}</Text>
         <Image style={{ height: 150, width: "100%" }} source={{ uri: item['image'] }} />
        </View>
      )}
    />
      </View>
      </View>
    // </View>
);
  }
  export default SettingsVC
 