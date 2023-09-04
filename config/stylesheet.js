import {
    StyleSheet,
    Dimensions
  } from 'react-native';

  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

  import bgcolors from '../config/bgcolors';
  let {height, width} = Dimensions.get('window');
  console.log(RFValue(10,width))
  console.log(width > 375 ? 18 : 16)
 

export default StyleSheet.create({   
sidemenuTitle:
{
  fontFamily : "Roboto Bold",fontSize:RFValue(9,width),alignSelf:'center',
  justifyContent : 'center'
},
    sidemenuimage: {
      width: 25,
      height: 25,
      margin: 5,
      alignSelf:'center',
  justifyContent : 'center'
     // resizeMode: 'contain',
    },

 //login page styles

  input: {
       flex : 1,
      height: 40,
      margin: 5,
      padding: 10,
      marginLeft : 0,
      fontFamily : 'Roboto Regular',
      fontSize :RFValue(9,width),
    },
 
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 39,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  settingimageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  logoimageStyle: {
    padding: 10,
    margin: 5,
    height: 27,
    width: 26,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  sectionStyle: {
    width : "75%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'lightgray',
     height: 50,
     borderRadius: 5,
     marginTop:15,
     margin:15,
     top: 50,
  },
   textViewAlign:{
      top : 30,  
      height : 42,
      width : "75%",
      position : "relative",
      alignItems: "center",
      backgroundColor : "#ae0000"
   },
   button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
   // elevation: 3,
    color : "#ae0000",
  },
  loginbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
   // elevation: 3,
    color : "#fff",
  },
  inventorybutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    color : "#ae0000",
    backgroundColor : "#ae0000",
    width : "55%",
    marginTop:5,
  },
  inventorybuttonPlain: {
    alignItems: 'center',
    justifyContent: 'center',
   
    color : "#ae0000",
  },
  text: {
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color : "#ae0000",
    fontFamily : 'Roboto Bold',
      fontSize :RFValue(9,width),
  },
  LoginText: {
    lineHeight: 20,
    letterSpacing: 0.25,
    color : "#ffffff",
    fontFamily : 'Roboto Bold',
      fontSize : RFValue(8,width),
      height:30
      
  },
  //home page styles
  headline: {
    textAlign: 'center', // <-- the magic
    fontSize: RFValue(9,width),
    fontFamily : 'Roboto Bold',
    color:"#003E5D"
  },
  headlinebootom: {
    textAlign: 'center', // <-- the magic
    fontSize: RFValue(9,width),
    fontFamily : 'Roboto Bold',
    marginTop: 5,
    marginBottom: 10,
    color:"#003E5D"
  },
imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
container: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'white',
},
imageThumbnail: {
  justifyContent: 'center',
  alignItems: 'center',
  height: 40,
  width:40,
  backgroundColor: '#fff',
},

imageThumbnailbg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width:55,
    backgroundColor: '#fff',
    borderRadius: 27.5,
    borderWidth: 1,
    borderColor: '#000000',
    marginTop:"10%"
  },

  //inventory Market places 
  textstyle: {
    marginTop:10,
     color :  "#D70011",
     fontFamily:"Roboto Regular",
     fontSize :RFValue(8,width),
  },
   textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:"Roboto Medium",
    fontSize: RFValue(8,width),
  },
  textStyleplain: {
    color: '#ae0000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:"Roboto Medium",
    fontSize: RFValue(9,width),
    paddingHorizontal: 20,

  },
  image: {
     width: 150,
     height: 150,
    margin: 5,
    flex : 1,
    marginEnd : 10,
   // resizeMode: 'contain',
  },
  transparentView:{
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
  //  shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: '#fff',
    padding: 10,
   // borderRadius: 10,
    margin: 0.5,
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
  //  shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: '#fff',
    padding: 10,
   // borderRadius: 10,
    margin: 0.5,
  },
  buttoninventory: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 0,
    elevation: 3,
    color : "#000000",
    margin : "2%",
    marginTop : 100,
    width : "50%",
    height:30,
    backgroundColor : "#ae0000",
  },
  modalText: {
    marginTop:5,
    marginBottom: 10,
    textAlign: 'left', 
    alignItems: 'flex-start',
    color : "#000",
    fontFamily : "Roboto Regular",
    fontSize :RFValue(9,width)
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height:"100%",
   // opacity : 0.5,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    
  },
  modalViewfilter: {
    margin: 20,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:"90%",
    height:"90%"
    
  },
  gallerycard1: {
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode : 'contain',

  },
  //imagesView Controller Styles
//   bgimagecontainer: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//     paddingTop: 0,
//   },
//   imageheader: {
//     backgroundColor: '#F5FCFF',
//     padding: 0,
//     height:50,
//     width:"100%"
//   },
//  imageheaderText: {
//     textAlign: 'left',
//     fontSize: 16,
//     fontWeight: '500',
//     backgroundColor:"#ae0000",
//     color:"#fff",
//     height:40,
//     justifyContent:"center",
//     alignItems:'center',
//     padding: 10,
    
//   },
//   imageactive: {
//     backgroundColor: 'rgba(255,255,255,1)',
//   },
//   imageinactive: {
//     backgroundColor: 'rgba(245,252,255,1)',
//   },

  //settings page style sheets
  settingsbutton: {
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
  settingstext: {
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