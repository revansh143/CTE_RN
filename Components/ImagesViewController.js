  // Example of Collapsible/Accordion/Expandable List View in React Native
// https://aboutreact.com/collapsible-accordion-expandable-view/

// import React in our code
import React, {useState,useEffect} from 'react';
import { Dimensions,ActivityIndicator } from 'react-native';
import RNPhotosFramework from 'rn-photos-framework';
import { RFValue } from 'react-native-responsive-fontsize';
import { openDatabase } from 'react-native-sqlite-storage';


// import all the components we are going to use
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';


// import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';

// import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image';

// Dummy content to show
// You can also use dynamic data by calling web service
var CONTENT = [];
var SMARTCONTENT = [];



function ImagesViewController({navigation}){
  // Default active selector
  const [activeSections, setActiveSections] = useState([]);
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);
  // MultipleSelect is for the Multiple Expand allowed
  // True: Expand multiple at a time
  // False: One can be expand at a time
  const [multipleSelect, setMultipleSelect] = useState(false);

  const [gallerylist, setAlbum] = useState();
  const [data, setData] = useState();
  const [sectionTitle, setSectionTitle] = useState();
  const [selectionImagesDB, setselectionImagesDB] = useState([])

  var groupnames = []
  var userList = []
  var db = openDatabase({ name: 'UserDatabase.db' });

  const createImagesTable = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM GalleryImages', [], (tx, results) => {
        let images = []
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          images.push(row.imageURl)
        }
        setselectionImagesDB(images)
      })
    })
    db.transaction(function (txn) {
       txn.executeSql(
         'CREATE TABLE IF NOT EXISTS GalleryImages(id INTEGER PRIMARY KEY AUTOINCREMENT,imageURl VARCHAT(20) UNIQUE)',
           []
       );
    });
}
  React.useEffect(() => {
    createImagesTable()
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
        <Text style={{color:"#000",marginStart:10}}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.goBack()}>
        <Text style={{color:"#000",marginStart:10}}>prev</Text>
        </TouchableOpacity>
      </View>
      ),
      headerTitle : () => (
        <Text style={{color:"#ae0000",fontFamily: 'Roboto Bold',fontSize:RFValue(10,Dimensions.get('window').width)}}>RHS</Text>
      ),
      headerRight: () => (
        <View style = {{  flexDirection: 'row',
      }} >
          <TouchableOpacity 
        onPress={() => navigation.goBack()}>
        <Text style={{color:"#000",marginStart:10}}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.goBack()}>
        <Text style={{color:"#000",marginStart:10}}>Done</Text>
        </TouchableOpacity>
      </View>
      ),
    })
  }
  }, [navigation]);
  const getAlbums = () => {
  if(CONTENT.length == 0){
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
          //  getPhotos()
            queryResult.albums.forEach((album) => {
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
              if(album['title'] == 'Videos'){
              }
              else{
              response.assets.forEach((gallery) => {
               userList.push({'image':gallery.image.uri,'group_name':album['title'],'count':album['assetCount'],'album':album})
              });
              }
              CONTENT = userList   
             })
            .catch(error => {
              console.log(error);
            });
          });
          getsmartalbums()        
        });
      }
    });
  }
    };  
  const getsmartalbums = () => {
    if(SMARTCONTENT.length == 0){
      RNPhotosFramework.getAlbums({
      type: 'album',
      subType: 'any',
      assetCount: 'exact',
      fetchOptions: {
        sortDescriptors : [
          {
            key: 'title',
            ascending: true
          }
        ],
        includeHiddenAssets: false,
        includeAllBurstAssets: false
      },
      //When you say 'trackInsertsAndDeletes or trackChanges' for an albums query result,
      //They will be cached and tracking will start.
      //Call queryResult.stopTracking() to stop this. ex. on componentDidUnmount
      trackInsertsAndDeletes : true,
      trackChanges : false
   
    }).then((queryResult) => {
      queryResult.albums.forEach((album) => {
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
        if(album['title'] == 'Videos'){
        }
        else{
        response.assets.forEach((gallery)   => {
         userList.push({'image':gallery.image.uri,'group_name':album['title'],'count':album['assetCount'],'album':album})
        }); 
        }
        CONTENT = userList   
        SMARTCONTENT = userList
       })
      .catch(error => {
        console.log(error);
      });
    });
    });
  }
};
    
  useEffect(() => {
    askPermission();
  }, []);
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
      }
    } else {
    }
  };

  const toggleExpanded = () => {
    // Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    // Setting up a active section state
   // setSectionTitle(CONTENT[sections[0]["group_name"]])
    setactivityloading(true)
    typeof CONTENT[sections[0]] === "undefined" ? "" :
    CONTENT[sections[0]]['album'].getAssets({
     mediaType:"image",
     prepareForSizeDisplay:'', 
     trackInsertsAndDeletes: true,
     trackChanges: false,
     
     sortDescriptors : [
      {
        key: 'date',
        ascending: true
      }
    ],
 }).then((response) => {
   setSectionTitle(CONTENT[sections[0]]['group_name'])
   //list.sort((a, b) => (a.qty > b.qty) ? 1 : -1)
   setData(response.assets)
 })
 .catch(error => {
   console.log(error);
 }); 
    setActiveSections(
      sections.includes(undefined) ? [] : sections
    );
  };

  const renderHeader = (section, _, isActive) => {
    // Accordion header view
    return (
      <View
        duration={400}
        style={[
          styles.imageheader,
          isActive ? styles.imageactive : styles.imageinactive
        ]}
        transition="backgroundColor">
        <Text style={styles.imageheaderText}>
          {section['group_name']}-{section['count']}
        </Text>
      </View>
    );
  };
  const [categroy, updateCategory] = React.useState([]);
  const [selectedImages, setselectedImages] = React.useState([]);
  var previousSelection = []

  const [getDic, setDic] = React.useState([]);
  var myMap = new Map();
  const [getactivityloading, setactivityloading] = React.useState(false);


  const updateOnPress = (index,section) => {
     var categories = data.map((item) => {
      if(item.selected == 0){
        item.selected = 0;
      }
      return item;
     });
     if(categories[index].selected == 1){
      categories[index].selected = 0;
     }
     else{
      categories[index].selected = 1;
     }
     updateCategory(categories);
     var item = data[index]

     db.transaction((tx) => {
      tx.executeSql('SELECT * FROM GalleryImages WHERE imageURl=?', [item.image.uri], (tx, results) => {
        if(results.rows.length == 0){
            tx.executeSql(
              'INSERT INTO GalleryImages (imageURl) VALUES (?)',
              [item.image.uri],
              (tx, results) => {
              })
        }
        else{
            db.transaction((tx) => {
              tx.executeSql('DELETE FROM GalleryImages WHERE imageURl=?', [item.image.uri], (tx, results) => {
                createImagesTable()
               });
             })
        }  
       });
     })
   
      previousSelection = selectedImages
      if(previousSelection.includes(item.image.uri)){
        previousSelection.pop(item.image.uri)
       }else{
        previousSelection.push(item.image.uri)
       }
     setselectedImages(previousSelection)
     myMap.set(sectionTitle, previousSelection);
     setDic(myMap)
   };
   const renderContent = (section, _, isActive) => {
    // Accordion Content view
    return (
      <View>
      <FlatList 
      //horizontal
      data={data}
      numColumns={4}
      renderItem={({ item, index }) => (
        <View style={[{backgroundColor:'#fff', margin: 2,width:"24%"}, setactivityloading(false)
      ]}>
          <TouchableOpacity onPress={() => {
          updateOnPress(index)
          }
           }>
         <View style={{ height: 100, width: "100%" }} >
         <View style = {styles.backgroundContainer}>
         <Image  source={{uri:item.image.uri , cache: "force-cache",}} style={{height: 100, width: "100%",resizeMode: 'contain',} } transition={false}
          />
        </View>
        <View>
        <Image
          style={{width: 30, height: 30,}}
          source={item.selected == 1 || selectedImages.includes(item.image.uri) || selectionImagesDB.includes(item.image.uri) ? require('../assets/radio_checkred.png') : require('../assets/radio_uncheck.png')}
          resizeMode='contain'
          transition={false}
         />   
        </View>
          </View>
         </TouchableOpacity>
        </View>
      )}
    />
          </View>

    );
  };
  return (
   <SafeAreaView style={{flex: 1,backgroundColor: '#F5FCFF',}} onLayout={getAlbums()}>
      <ScrollView>
          <View style={styles.imagecontainer} >
          {/*Code for Accordion/Expandable List starts here*/}
          <Accordion
            activeSections={activeSections}
            // For any default active section
            sections={CONTENT}
            // Title and content of accordion
            touchableComponent={TouchableOpacity}
            // Which type of touchable component you want
            // It can be the following Touchables
            // TouchableHighlight, TouchableNativeFeedback
            // TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={multipleSelect}
            // If you want to expand multiple at a time
            renderHeader={renderHeader}
            // Header Component(View) to render
            renderContent={renderContent}
            // Content Component(View) to render
            duration={400}
            // Duration for Collapse and expand
            onChange={setSections}
            // Setting the state of active sections
          />
          {/*Code for Accordion/Expandable List ends here*/}
          </View>
      </ScrollView>
   </SafeAreaView>
  );
};

export default ImagesViewController
const styles = StyleSheet.create({
  imagecontainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 0,
  },
  imagetitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  imageheader: {
    backgroundColor: '#F5FCFF',
    padding: 0,
    height:50,
    flexDirection: 'column',
  },
 imageheaderText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor:"#ae0000",
    color:"#fff",
    height:40,
    justifyContent:"center",
    alignItems:'center',
    padding: 10,
  },
  imagecontent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  imageactive: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  imageinactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  imageselectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageselector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  imageactiveSelector: {
    fontWeight: 'bold',
  },
  imageselectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  imagemultipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  imagemultipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  overlay: {
    opacity: 0.5,
    backgroundColor: '#000000'
  }, backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 20,
  },
});