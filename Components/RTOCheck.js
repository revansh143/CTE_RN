import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet,Text,TouchableOpacity,Image,Dimensions,Alert, Keyboard,Linking,Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import SendSMS from 'react-native-sms'

function RTOCheck({navigation}){
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleOtpChange = (value, index) => {
      const newOtp = [...otp];
      newOtp[index] = value.toUpperCase();
      console.log(newOtp)
      console.log(value)
      console.log(index)

      setOtp(newOtp);
      if(index == 2){
        if (newOtp[index].length == 3) {
            inputs[index + 1].focus();
        }
      }
      else if(index == 3){
        if (newOtp[index].length == 4) {
            Keyboard.dismiss()
        }
      }
      else{
        if (newOtp[index].length == 2) {
          inputs[index + 1].focus();
        }
      }
      // Move focus to the next box if the current one has a value
    };
    const inputs = [];
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
      </View>
      ),
      headerTitle : () => (
        <Text style={{color:"#ae0000",fontFamily: 'Roboto Bold',fontSize:RFValue(10,Dimensions.get('window').width)}}>RTO Check</Text>
      ),
    });
    }
    useEffect(() => {
      navigationData()
    }, []);
    const keyExtractor = (item, idx) => {
      return item?.recordID?.toString() || idx.toString();
    };
    const stylechange = (index) => {
      if(index == 0 || index == 1){
        return styles.box
      }
      else{
        return styles.secondbox
      }
    }
    const keyboardType = (index) => {
      if(index == 0 ){
        return 'default'
      }
      else if(index == 1){
        return 'number-pad'
      }
      else if(index == 2){
        return 'default'
      }
      else{
        return 'number-pad'
      }
    }
   const sendSMSFunction = () => {
    const separator = Platform.OS === 'ios' ? '&' : '?'
    let messgage = otp.toString().replace(/,/g, '-')
    console.log(messgage)
    const url = `sms:${9014872303}${separator}body=${"VAHAN" + messgage}`
     Linking.openURL(url)
    }
  return (
    <View>
      <Text style={{margin:10,fontSize:18}}>Enter registration number to get Vehicle and Ownership details</Text>
      <Text style={{textAlign: 'center',marginBottom: 5,}}>Eg: MH-12-EF-309</Text>
      <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style= {stylechange(index)}
          maxLength={index == 0  ? 2 : 4}
          keyboardType= {keyboardType(index)}
          onChangeText={(value) => handleOtpChange(value, index)}
          value={digit}
          ref={(input) => {
            inputs[index] = input;
          }}
        />
      ))}
      </View>
      <View  style={{marginBottom: 25,height:200}}>
      <TouchableOpacity style={styles.button} onPress={() => sendSMSFunction()}>
      <Text style={{textAlign: 'center',color:"#ae0000",fontSize:18,fontFamily: "Roboto Bold",marginTop:20}}>SUBMIT</Text>
      </TouchableOpacity>
      <View style={{width:"100%",height:1,backgroundColor:"#D3D3D3",marginTop: 10,marginBottom:10}}></View>
      <Text style={{fontSize:16,marginStart:10}}>Note : Received vehicle details will show below</Text>
      <View style={{  flexDirection: 'row',margin:10}}>
      <Text style={{color:"#ae0000"}}>Disclaimer :</Text>
      <Text style={{color:"#000"}}>This tool uses publicaly available information. CarTradeExchange.com is not responsible fot the validity of the information. SMS costs apply</Text>
      </View>
      </View>
    </View>
  );
  };
  export default RTOCheck;
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
      margin: 5,
      textAlign: 'center',
      fontSize: 20,
    },
    secondbox: {
      borderWidth: 1,
      borderColor: 'black',
      width: 60,
      height: 40,
      margin: 5,
      textAlign: 'center',
      fontSize: 20,
    },
  });