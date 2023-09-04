import { Alert } from "react-native";
import React from 'react';


export const getApi = async (url,params) => {

  //  <Loader loading={loading} />
    const response = await fetch(url,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(params)
    });
    const json = await response.json();
   // setLoading(false)
    return json;
 }

 export const emailValidation = (email) => {
    const validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String(email).toLowerCase())
    return validate
 }
 export const validphonenumber = (phNumber) => {
  if(String(phNumber).length > 6){
    Alert.alert("Wrong Password!");
    return true
  }
  return false
}
export const validPasswod = (password) => {
    let new_pass = String(password);
    // regular expressions to validate password
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (!new_pass.match(lowerCase)) {
       Alert.alert("Password should contains lowercase letters!");
       return false
    } else if (!new_pass.match(upperCase)) {
      Alert.alert("Password should contain uppercase letters!");
      return false
    } else if (!new_pass.match(numbers)) {
      Alert.alert("Password should contains numbers also!");
      return false
    } else if (new_pass.length < 10) {
      Alert.alert("Password length should be more than 10.");
      return false
    } else {
      Alert.alert("Password is strong!"); 
      return true
    }
}



 
