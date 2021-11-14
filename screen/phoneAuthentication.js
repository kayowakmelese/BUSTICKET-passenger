import { faArrowLeft, faMobile,faArrowRight, faPhone, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as React from 'react'
import {Text,View,TouchableOpacity,TextInput, ActivityIndicator} from 'react-native'
import styles from '../style/styles'
import auth from '@react-native-firebase/auth';
import strings from '../translation/index'
import {setSigned,sendPhone} from '../action/index'
import {connect} from 'react-redux'

const PhoneAuthentication =(params)=>{
    const [phone,setPhone]=React.useState(null);
    const [code,setCode]=React.useState(null);
    const [verificationSent,setVerificationSent]=React.useState(false);
    const [confirm, setConfirm] = React.useState(null);
    const [keyCode,setKeyCode]=React.useState(null);
    const [user, setUser] = React.useState();
    const [timer,setTimer]=React.useState(60);
    const [press,setPress]=React.useState(false)
    const [error,setError]=React.useState(null);
    const [makeItButton,setMakeItButton]=React.useState(false);
    const [loader,setLoader]=React.useState(false);

    React.useEffect(()=>{
        
    },[timer])
    
    React.useEffect(()=>{
      if(verificationSent){
        if(timer>0){

          setTimeout(()=>setTimer(timer-1),1000)
        }else{
         // setVerificationSent(false);
        setMakeItButton(true)
        }
      }
    },[timer,verificationSent])
  


  // Handle the button press
  const  signInWithPhoneNumber=async (phoneNumber)=>{
    try{
      console.log("251"+phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber("+251"+phoneNumber);
      console.log("i got here first")
      setConfirm(confirmation);
     setVerificationSent(true)
    }catch(err){
      setError(err.toString());
      setPress(false);
      console.log(err);
    }
    
  }

  async function confirmCode(codes) {
    setLoader(true)
    try {
      console.log("begined confirm code")
    let ress=  await confirm.confirm(codes);
    console.log("code confirmed")
    setError(null);
    setLoader(false)
    params.setSignedUser(ress.user.phoneNumber)
      params.navigation.navigate('HomeScreen')
      console.log("i am here",ress.user.phoneNumber)
    } catch (err) {
      console.log('Invalid code.',err);
      setLoader(false)
      setError("invalid code! please enter the 6-digit code sent to the phone number of "+phone);
    }
  }
    return (
        <View style={styles.container}>
        <FontAwesomeIcon icon={faMobile} size={60} color={'orangered'}/>
        <View style={{paddingHorizontal:5}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Verify Phonenumber</Text>
            <Text style={{fontSize:10,color:'gray'}}>enter your phonenumber below we will send you a verification code to your phone for authentication purpose</Text>
        {/* <View style={{width:'100%',alignItems:'center'}}>
        <TextInput accessibilityHint="something" autoFocus={true} placeholder={'_ _ _ _'} placeholderTextColor={'blue'} keyboardType={'number-pad'} style={{backgroundColor:'#0088ff10',color:'blue',width:'50%',padding:10,fontSize:30,fontWeight:'bold',letterSpacing:10,textAlign:'center',borderRadius:5,marginVertical:30}} />
        </View> */}
        {verificationSent?<View style={{alignItems:'center'}}>
        <TouchableOpacity disabled={!makeItButton} style={{alignItems:'flex-start',alignSelf:'flex-start'}}>
          <Text style={{color:'blue',padding:5,alignSelf:'flex-start',fontSize:10,textAlign:'left'}}>{timer>0?`didn't get the code?Resend code in ${timer} seconds`:"click here to resend code"}</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',marginHorizontal:'20%',backgroundColor:'#0088ff10',width:'80%',padding:10,textAlign:'center',borderRadius:5,marginVertical:30}}>
        <TextInput onChangeText={(keycode)=>{keycode.length===6?confirmCode(keycode):console.log("not six")}} disableFullscreenUI={true} accessibilityHint="something" autoFocus={true} placeholder={'verification code'} placeholderTextColor={'blue'} keyboardType={'number-pad'} style={{letterSpacing:0,textDecorationStyle:'dashed',color:'blue',textAlign:'center',fontSize:10,fontWeight:'bold',width:'70%'}} />
        <ActivityIndicator animating={loader} size={'small'} color={'blue'}/> 
        </View>
        <Text style={{color:'red',fontSize:10}}>{error}</Text>
        </View>:<View>
        <View style={{width:'100%',flexDirection:'row',borderRadius:5,backgroundColor:'#0088ff10',marginVertical:15}}>
        <Text style={{alignSelf:'center',alignItems:'center',fontWeight:'bold',padding:5}}>+251</Text>
        <TextInput accessibilityHint="something" onChangeText={(e)=>setPhone(e)} autoFocus={true} placeholder={'Phone '} placeholderTextColor={'gray'} keyboardType={'number-pad'} style={{color:'blue',width:'90%',padding:10,fontSize:15,letterSpacing:0,textAlign:'left'}} />
        </View>
        <Text style={{color:'red',fontSize:10}}>{error}</Text>
        <View style={{alignItems:'flex-end',marginTop:20,width:'100%'}}>

<TouchableOpacity style={{width:'100%',alignItems:'flex-end'}} disabled={press} onPress={()=>{setPress(true);phone.length===9?signInWithPhoneNumber(phone):null}}>

<View style={{flexDirection:'row',padding:15,backgroundColor:'blue',borderRadius:10}}>
<Text style={{color:'white',fontWeight:'bold',marginRight:20}}> {strings.continue}</Text>
{press?<ActivityIndicator size={'small'} color={'white'}/>:<FontAwesomeIcon icon={faArrowRight} color={'white'} />}

</View>
</TouchableOpacity>
</View></View>}
        </View>
        </View>
    )
}
const mapDispatchToProps=(dispatch)=>{
  return {
    setSignedUser:(phonenumber)=>dispatch(setSigned(phonenumber)),
    sendPhone:(phonenumber)=>dispatch(sendPhone(phonenumber))
  }
}
const mapStateToProps=(state)=>{
  return {
   
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PhoneAuthentication);