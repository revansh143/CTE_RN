import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet,FlatList,Text, Platform, PermissionsAndroid,TouchableOpacity,Image,Dimensions,Alert } from 'react-native';

import Contacts, { requestPermission } from 'react-native-contacts';
import { openDatabase } from 'react-native-sqlite-storage';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding'
import { RFValue } from 'react-native-responsive-fontsize';
import Swipeout from 'react-native-swipeout';

import Loader from './Loader';
function OTPViewController({navigation}){
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading,setloading] = useState(true)
    var db = openDatabase({ name: 'UserDatabase.db' });
    const [location, setLocation] = useState(false);

    const handleOtpChange = (value, index) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
 
      if(index == 2){
        console.log(value.count)
        console.log(index)
        if (value.length == index+1) {
          inputs[index + 1].focus();
        }
      }else{
        if (value && index < newOtp.length - 1) {
          inputs[index + 1].focus();
        }
      }
      // Move focus to the next box if the current one has a value
    };
    const inputs = [];
    const [contacts, setContacts] = useState([]);
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]).then((result) => {
          console.log(result);
          if (
            result['android.permission.ACCESS_COARSE_LOCATION'] &&
            result['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
          ) {
            getLocation();
          }
        });
      } catch (err) {
        console.warn(err);
        }
    };

    const addcontact = () => {
      var newPerson = {
        emailAddresses: [{
          label: "",
          email: "",
        }],
        displayName: "",
        phoneNumber :""
      } 
      Contacts.openContactForm(newPerson).then(contact => {
        // contact has been saved
        Contacts.getAll().then(contacts => {
          contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
          setContacts(contacts)
          insertData()
        })
      })
    }
    const createUserTable = () => {

      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM contact_info', [], (tx, results) => {
          console.log("device contacts "+results.rows.length);    
         });
       });
      db.transaction(function (txn) {
         txn.executeSql(
           'CREATE TABLE IF NOT EXISTS contact_info(contact_id INTEGER PRIMARY KEY AUTOINCREMENT,phone_num VARCHAT(20) UNIQUE, user_name VARCHAR(20), user_email VARCHAR(255))',
             []
         );
      });
  }
    const getLocation = () => {
      Geolocation.getCurrentPosition(info => {
        console.log(info)
        setLocation(info)
        console.log(info.coords.latitude)
        console.log(info.coords.longitude)
        Geocoder.init("GOOGLE_MAP_APIKEY"); 
        Geocoder.from(info.coords.latitude, info.coords.longitude)
            .then(json => {
                var addressComponent = json.results[0].address_components[0];
                console.log(addressComponent);
            })
            .catch(error =>
                console.log(error)
            );
      } );
    }
    const navigationData = () => {
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
      headerRight : () => (
        <View style = {{  flexDirection: 'row',
      }} >
        <TouchableOpacity 
      onPress={() => addcontact()}>
      <Text>add contact</Text>
      </TouchableOpacity>
      </View>
      ),
      headerTitle : () => (
        <Text style={{color:"#ae0000",fontFamily: 'Roboto Bold',fontSize:RFValue(10,Dimensions.get('window').width)}}>OTP View</Text>
      ),
    });
    }
    const insertData = () => {
      {contacts.map((item, index) => (
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM contact_info WHERE user_name=?', [item?.givenName], (tx, results) => {
            if(results.rows.length == 0){
                tx.executeSql(
                  'INSERT INTO contact_info (phone_num, user_name, user_email) VALUES (?,?,?)',
                  [item?.phoneNumbers[0]?.number, item?.givenName, ""],
                  (tx, results) => {
                    console.log('Results', results);
                     console.log("inserted user "+item?.givenName)
                  })
            }  
           });
         })
      ))}
    }

    const deleteContact = (item) =>{
      Contacts.deleteContact(item).then((recordId) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM contact_info WHERE user_name=?', [item.givenName], (tx, results) => {
              Contacts.getAll().then(contacts => {
              contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
              setContacts(contacts)
               insertData()  
           });
         })
      })
    })
    }
    useEffect(() => {
      navigationData()
      createUserTable();
     
      if (Platform.OS === 'android') {
        requestLocationPermission();
      } else {
        getLocation();
       }

      if(Platform.OS == 'android'){
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    })
        .then((res) => {
            console.log('Permission: ', res);
            Contacts.getAll()
                .then((contacts) => {
                    // work with contacts
                   // console.log(contacts);
                    contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
                    setContacts(contacts)
                    insertData()

                })
                .catch((e) => {
                    console.log("error"+e);
                });
        })
        .catch((error) => {
            console.error('Permission error: ', error);
        });
      }
      else{
      
        Contacts.getAll().then(contacts => {
          contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
          setContacts(contacts)
           insertData()
        
        })
      }
    }, []);
    const keyExtractor = (item, idx) => {
      return item?.recordID?.toString() || idx.toString();
    };
   
  return (
    <View>
      <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.box}
          maxLength={index == 2 ? 3 : 1}
          keyboardType="numeric"
          onChangeText={(value) => handleOtpChange(value, index)}
          value={digit}
          ref={(input) => {
            inputs[index] = input;
          }}
        />
      ))}
      </View>
    
       <FlatList
        data={contacts}
        renderItem={({item,index}) => (
          <Swipeout right={
             [
              {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { {

                  if(Platform.OS == 'android'){
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
                  })
                      .then((res) => {
                          console.log('Permission: ', res);
                          Alert.alert(
                            'Delete',
                            'Are you sure do you want to delete contact from your device contacts and local DB?', // <- this part is optional, you can pass an empty string
                            [
                              {text: 'YES', onPress: () =>  deleteContact(item)},
                              {text: 'NO', onPress: () => console.log("")},
                            ],
                            {cancelable: false},
                          );  
                      })
                      .catch((error) => {
                          console.error('Permission error: ', error);
                      });
                    }
                    else{
                      Alert.alert(
                        'Delete',
                        'Are you sure do you want to delete contact from your device contacts and local DB?', // <- this part is optional, you can pass an empty string
                        [
                          {text: 'YES', onPress: () =>  deleteContact(item)},
                          {text: 'NO', onPress: () => console.log("")},
                        ],
                        {cancelable: false},
                      );
                    }
                } }
             },
              {
                text: 'Edit',
                backgroundColor: 'blue',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { {
                  Alert.alert(
                    'Delete',
                    'Are you sure do you want to Edit contact from your device contacts and local DB?', // <- this part is optional, you can pass an empty string
                    [
                      {text: 'YES', onPress: () =>   Contacts.openExistingContact({recordID:item.recordID}).then( recordID => {
                      })},
                      {text: 'NO', onPress: () => console.log("")},
                    ],
                    {cancelable: false},
                  );
                 
                } }
             }
            ]
          }
          autoClose='true'
          backgroundColor= 'transparent'>
     <View style={styles.contactCon}>
    
      <View style={styles.imgCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>{item?.givenName[0]}</Text>
        </View>
   </View>
      <View style={styles.contactDat}>
        <Text style={styles.name}>
          {item?.givenName} {item?.middleName && item.middleName + ' '}
          {item?.familyName}
        </Text>
        <Text style={styles.phoneNumber}>
          {item?.phoneNumbers[0]?.number}
        </Text>
      </View>
    </View>
    </Swipeout>
    )}
        keyExtractor={keyExtractor}
        style={styles.list}
      />
    </View>
  );
  };
  export default OTPViewController;
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      borderWidth: 1,
      borderColor: 'black',
      width: 40,
      height: 40,
      margin: 10,
      textAlign: 'center',
      fontSize: 20,
    },
    contactCon: {
      flex: 1,
      flexDirection: 'row',
      padding: 5,
      borderBottomWidth: 0.5,
      borderBottomColor: '#d9d9d9',
    },
    imgCon: {},
    placeholder: {
      width: 55,
      height: 55,
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: '#d9d9d9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactDat: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 5,
    },
    txt: {
      fontSize: 18,
    },
    name: {
      fontSize: 16,
    },
    phoneNumber: {
      color: '#888',
    },
  });