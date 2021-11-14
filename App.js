import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import strings,{changeLanguage} from './translation'

import { StyleSheet, Text, View,Image,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faArrowRight,faLanguage} from '@fortawesome/free-solid-svg-icons'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseDate from './screen/chooseDate';
import styles from './style/styles'
import ChooseDestination from './screen/chooseDestination';
import ChooseBus from './screen/chooseBus';
import busDetail from './screen/busDetail';
import selectSeat from './screen/selectSeat';
import ChangeLanguage from './screen/changeLanguage'
import { connect } from 'react-redux';
import PhoneAuthentication from './screen/phoneAuthentication';
import HomeScreen from './screen/homeScreen';
import BookTravel from './screen/bookTravel'
import {checkSigned,ChangeLanguageValue} from './action/index'
import passengerInfo from './screen/passengerInfo';
import TravelDetail from './screen/travelDetail';
import Feed from './screen/Feed';
import PaymentMethod from './screen/paymentMethod';
import ProfileScreen from './screen/profileScreen';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  
  const Stack=createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={'splashScreen'}>

    <Stack.Screen name="splashScreen" options={{
      headerShown:false
    }} component={Splash}/>
    <Stack.Screen name="PickDate" component={ChooseDate} options={{headerShown:false}}/>
    <Stack.Screen name="PickDest" component={ChooseDestination} options={{headerShown:false}}/>
    <Stack.Screen name="PickBus" component={ChooseBus} options={{headerShown:false}}/>
    <Stack.Screen name="BusDetail" component={busDetail} options={{headerShown:false}}/>
    <Stack.Screen name="SelectSeat" component={selectSeat} options={{headerShown:false}}/>
    <Stack.Screen name="SelectLanguage" component={ChangeLanguage} options={{headerShown:false}}/>
    <Stack.Screen name="PhoneAuth" component={PhoneAuthentication} options={{headerShown:false}}/>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
    <Stack.Screen name="AddPassenger" component={passengerInfo} options={{headerShown:false}}/>
    <Stack.Screen name="BookTravel" component={BookTravel} options={{headerShown:false}}/>
    <Stack.Screen name="TravelDetail" component={TravelDetail} options={{headerShown:false}}/>
    <Stack.Screen name="PaymentOption" component={PaymentMethod} options={{headerShown:false}}/>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
  
}
const mapStateToProps=(state)=>{
  return {
      language:state.languageChangeReducer.language,
      checkIsLoading:state.signedInfoReducer.isLoading,
      isSigned:state.signedInfoReducer.isSigned,
      isChanged:state.signedInfoReducer,
      inited:state.signedInfoReducer.inited

  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
     checkUserSigned:()=>dispatch(checkSigned()),
     changeLang:(langcode)=>dispatch(ChangeLanguageValue(langcode))

  }
}

const SplashScreen=(props)=>{
  const [lang,setLang]= useState(true);
  const [loader,setLoader]=useState(false);
  const [isInit,setIsInit]=useState(false);
  
  useEffect(()=>{
    if(props.language){
      console.log("i am here nope",props.language)
      setLang(!lang)
      changeLanguage(props.language)
    }
    
   },[props.language])
   useEffect(()=>{
     console.log("i am called")
    if(props.inited){
      if(props.isSigned===true){
        props.navigation.reset({index:0,routes:[{name:'HomeScreen'}]})
     //   props.navigation.navigate('HomeScreen')
      }else{
          setLoader(false)
           props.navigation.navigate('PhoneAuth')
        }
    }else{
      console.log("not initialized","i think so")
    }
      
    
    
    console.log("isSigned",props.isSigned+props.inited)
   },[props.isChanged,props.inited])
   useEffect(()=>{
     AsyncStorage.getItem("language").then((key)=>{
       console.log("key",key)
       props.changeLang(key)
     }).catch((e)=>console.log("error here",e))
    props.checkUserSigned();
    
    console.log("checking user")
    setLoader(true)
   },[])
  
  return (
    <View style={{height:'100%',backgroundColor:'white'}}>
    <TouchableOpacity onPress={()=>{props.navigation.navigate('SelectLanguage')}} style={{flexDirection:'row',backgroundColor:'#eee',padding:3,borderRadius:5,marginTop:30,alignSelf:'flex-end',marginRight:10}}>
    <Text style={{paddingVertical:15,paddingHorizontal:5}}>Language</Text>
    <FontAwesomeIcon icon={faLanguage} size={50} color={'blue'}/>
    </TouchableOpacity>
    <View style={styles.container}>
    <Text style={{width:'100%',fontSize:50,fontWeight:'bold',color:'black'}}>{strings.name}</Text>
    <Text style={{width:'100%',fontSize:10,color:'gray'}}>{strings.description}</Text>
    <Image source={require('./assets/buspng.png')} style={{width:'50%',height:100,alignSelf:'flex-start'}} resizeMethod={'scale'}/>
      <TouchableOpacity onPress={()=>{props.navigation.navigate('PhoneAuth')}} style={{padding:15,backgroundColor:'white',borderRadius:10,alignSelf:'flex-start',flexDirection:'row',alignContent:'flex-start',marginHorizontal:10,width:'40%',marginTop:'5%'}}>
        {/* <Text style={{color:'white',fontWeight:'bold',width:'90%',alignSelf:'flex-start'}}>Loading</Text> */}
        {loader?<ActivityIndicator size={"small"} color={'blue'}/>:<FontAwesomeIcon icon={faArrowRight} color={'blue'} size={20} />}
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    </View>
  );
}
 let Splash=connect(mapStateToProps,mapDispatchToProps)(SplashScreen)


