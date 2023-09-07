
import React from 'react';
import stylesheet from '../config/stylesheet';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { openDatabase } from 'react-native-sqlite-storage';
// import InventoryMarketPlaces,{styles} from './InventoryMarketPlaces';
// import { StyleSheet, View, Text,Button,TouchableOpacity,Image,FlatList } from 'react-native';
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
    TextInput,
    Alert,
    Linking
  } from 'react-native';
import { emailValidation, getApi, validPasswod, validphonenumber } from '../config/APIResponse';
import Loader from './Loader';
import validation from '../config/validate';
// import AsyncStorage from '@react-native-community/async-storage';

  let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = 'tel:9014872303';
    } else {
        phoneNumber = 'telprompt:9014872303';
    }
    var db = openDatabase({ name: 'UserDatabase.db' });

function LoginView({navigation}){

  const isEmailValid = (email) => {
    let result = validation('email', email);
    if (result) {
      setError('email', result);
    }
  };
  const isPasswordValid = (password) => {
    // let result = validation('password', password);
    // if (result) {
    //   setError('Password', result);
    // }
  };
    React.useEffect(() => {
      createUserTable();
      GoogleSignin.configure({
       // webClientId: '148020655014-242efiusubn28l2ia2c9ei4r4jok6kmu.apps.googleusercontent.com',
        iosClientId: '148020655014-hhf7gatuj2amm3pqoav1l077e512p8qk.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      //  androidClientId: '148020655014-l0vemdea9ekk3p6up1ln1mr1873vrf7a.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      });
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        navigation.setOptions({
          headerTitle : () => (
            <Image
              style={{ width: 200, height: 50, marginStart : "25%",
            }}
              source={require('../assets/cte_logo.png')}
              resizeMode='contain'
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() =>  
            navigation.navigate('OTPViewController')
            // Linking.openURL(phoneNumber)}
            }>
            <Image
            source={
              require("../assets/dealer-helpline.png")
            }
            style={stylesheet.imageStyle}
          />
          </TouchableOpacity>
          ),
        });
      }, [navigation]);

      const createUserTable = () => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
            console.log("login Users "+results.rows.length);    
           });
         });
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            function (tx, res) {
              console.log('item:', res.rows);
              if (res.rows.length == 0) {
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                  []
                );
              }
            }
          );
        });
    }
      signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log({userInfo})
          setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log(statusCodes.SIGN_IN_CANCELLED)
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log(statusCodes.IN_PROGRESS)
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
            // play services not available or outdated
          } else {
            // some other error happened
            console.log(error)
          }
        }
      };

      const [loading, setLoading] = React.useState('');
      const [userEmail, setText] = React.useState('');
      const [userpwd, setPassword] = React.useState('');
      return(
        <View style={{flex:1,alignItems: 'center'}}>
         <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
         />
           <Loader loading={loading} />
            <View style={stylesheet.sectionStyle}>
              <Image
                source={
                  require("../assets/username.png")
                }
                style={stylesheet.logoimageStyle}
              />
              <TextInput
                 style={stylesheet.input}
                 onChangeText={newText => setText(newText)}
                 defaultValue={userEmail}
                 placeholder="Email"
              />
            </View>
            <View style={stylesheet.sectionStyle}>
              <Image
                source={
                  require("../assets/password.png")
                }
                style={stylesheet.logoimageStyle}
              />
              <TextInput
                 style={stylesheet.input}
                 onChangeText={newText => setPassword(newText)}
                 defaultValue={userpwd}
                 placeholder="Password"
              //   keyboardType="numeric"
              />
            </View>
            <View style ={{ top : 30,  
        width : "100%",
        position : "relative",
        alignItems: "flex-end",
        }}>
              <Pressable style={stylesheet.button} onPress={() => {
              navigation.navigate('ForgotVC')
              }}>
          <Text style = {stylesheet.text}>Forgot Password?</Text>
            </Pressable >
            </View>
            <View style ={stylesheet.textViewAlign}>
            <Pressable style={stylesheet.button} onPress={() => {
               if(userEmail == ""){
                // Alert.alert("email empty")
                 setLoading(false)
                 navigation.navigate('RootVC')
               }else{
                db.transaction((tx) => {
                  tx.executeSql('SELECT * FROM table_user where user_name = ? ', [userEmail], (tx, results) => {
                    console.log("Query completed");
                    var len = results.rows.length;
                    // Get rows with Web SQL Database spec compliance.
                   if(len == 0){
                    db.transaction(function (tx) {
                      tx.executeSql(
                        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
                        [userEmail, userpwd, userEmail],
                        (tx, results) => {
                          if (results.rowsAffected > 0) {
                            Alert.alert(
                              'Success',
                              'You are Registered Successfully',
                              [
                                {
                                  text: 'Ok',
                                  onPress: () => {
                                    setLoading(false)
                                   // navigation.navigate('RootVC')
                                },
                                },
                              ],
                              { cancelable: false }
                            );
                          } else Alert.alert('Registration Failed');
                        }
                      );
                    });
                   }
                   });
                 });
                setLoading(true)
                const valid = emailValidation(userEmail)
                if(!valid){
                //  AsyncStorage.setItem('mobileNumber', userEmail);

                  getApi("https://uat.cartradeexchange.com/mobile_api_json/",{
                    action: "authenticate",
             api_id:  "cteios2020v3.0",
             app_code: "A3DC9491-02E3-4477-AF24-CF9BA3373789",
             password: userpwd,
             user : userEmail
            }).then(data => { console.log("data", data)
            setLoading(false)
           let response = JSON.parse(JSON.stringify(data))
         
            if(response.status == 1){

              navigation.navigate('RootVC')
              }
              else{
                Alert.alert(response.details)
              }
           });
               }
               else{
                setLoading(false)
                Alert.alert("invalid Email")
               }
                }
               }}>
               <Text style = {stylesheet.LoginText}>Login</Text>
               </Pressable >
               </View>
         </View>
         );
}
export default LoginView