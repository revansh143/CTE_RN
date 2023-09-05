
import React, {useState} from 'react';
import { View,  FlatList, Image,  Text,   TouchableOpacity,  Dimensions,ImageBackground} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { RFValue } from 'react-native-responsive-fontsize';
import { openDatabase } from 'react-native-sqlite-storage';

function GalleryList({route,navigation,props}){

  const [selectedImages, setselectedImages] = React.useState([]);
  var previousSelection = []
     console.log(route)
    const [data, setData] = useState([]);
    const [getimageURL, setimageURL] = useState('');
    const [getselectionData, setselectionData] = useState([]);

    const [getalbumname, setalbumname] = useState(route.params['albumname'])
    const [selectedLetter, setSelectedLetter] = useState('')
    const [selectionImagesDB, setselectionImagesDB] = useState([])

    var selectionData=selectedLetter;
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
        const photos =  CameraRoll.getPhotos({
            first: 100000000,
            assetType: "Photos",
            groupName : getalbumname,
            groupTypes: getalbumname == "All Photos" ? "All" : "SavedPhotos",
          }) .then(res => {
             setData(res.edges)
          })
          .catch(error => {
            console.log(error);
          });;
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        if(Platform.OS === "android"){
          navigation.setOptions({
            headerLeft: () => (
              <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style= {{fontSize:RFValue(10,Dimensions.get('window').width),textAlign: "left",color :"#ae0000",marginTop:10,marginStart:10,fontFamily:"Roboto Bold"}}>
             Dashboard
              </Text>
              </View>
            ), 
            headerTitle : () => (
              <Text  color= "#ae0000"  title="" />
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
           <Text style= {{fontSize:RFValue(10,Dimensions.get('window').width),textAlign: "left",color :"#ae0000",marginTop:10,marginStart:10,fontFamily:"Roboto Bold"}}>
            Dashboard
           </Text>
              </View>
            ), 
            headerTitle : () => (
              <Text  color= "#ae0000"  title="" />
            ),
          });
        }
      }, [navigation]);

        const [categroy, updateCategory] = React.useState([]);
        const updateOnPress = (index) => {
        const categories = data.map((item) => {
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
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM GalleryImages WHERE imageURl=?', [categories[index].node.image.uri], (tx, results) => {
            if(results.rows.length == 0){
                tx.executeSql(
                  'INSERT INTO GalleryImages (imageURl) VALUES (?)',
                  [categories[index].node.image.uri],
                  (tx, results) => {
                  })
            }
            else{
                db.transaction((tx) => {
                  tx.executeSql('DELETE FROM GalleryImages WHERE imageURl=?', [categories[index].node.image.uri], (tx, results) => {
                    createImagesTable()
                   });
                 })
            }  
           });
         })
        previousSelection = selectedImages
        if(previousSelection.includes(categories[index].node.image.uri)){
          previousSelection.pop(categories[index].node.image.uri)
         }else{
          previousSelection.push(categories[index].node.image.uri)
         }
      //  }
       setselectedImages(previousSelection)
      };

return(   
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({ item, index }) => (
        <View style={{backgroundColor:'#fff', margin: 4,width:"50%"}}>
          <TouchableOpacity onPress={() => {
          updateOnPress(index)
          }
           }>
         <ImageBackground  source={{uri:item.node.image.uri}} style={{height: 150, width: "100%",resizeMode: 'contain',}}>
         <View style={{ height: 150, width: "100%" }} >
         <Image
          style={{width: 30, height: 30,}}
          //require(item.selected == 1 ? '../assets/ch.png': '../assets/uncheckbox.png')
          source={item.selected == 1 || selectedImages.includes(item.node.image.uri) || selectionImagesDB.includes(item.node.image.uri) ? require('../assets/ch.png') : require('../assets/uncheckbox.png')}
          resizeMode='contain'
        />      
            </View>
         </ImageBackground>  
         </TouchableOpacity>
        </View>
      )}
    />
);
}
export default GalleryList 

