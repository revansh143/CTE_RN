
import {
    StyleSheet,
  } from 'react-native';

export default{
    primary : "#fc5c65",
    secondar : "#4ecdc4",
    black : "#000",
    mainURL : "https://reactnative.dev/movies.json",
    baseURL : "https://uat.cartradeexchange.com/mobile_api_json/",
    uatURL: "https://uat.cartradeexchange.com/mobile_api_json/",
    testURL : "https://testlb.cartradeexchange.com/mobile_api_json/",
    
};


export const phonenumber = (phoneNumber)=>{
    var phoneNumber = '';

    if (Platform.OS === 'android') {
        phoneNumber = 'tel:9014872303';
    } else {
        phoneNumber = 'telprompt:9014872303';
    }
    return phoneNumber
}



 