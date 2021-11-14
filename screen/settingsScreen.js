import { faCog, faEdit, faInfo, faLanguage, faMoon, faPen, faPeopleCarry, faPhotoVideo, faUser, faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as React from 'react'
import {Text,View,TouchableOpacity,Image} from 'react-native'
import { connect } from 'react-redux'
import styles from '../style/styles'

const SettingsScreen=(props)=>{
    React.useEffect(()=>console.log(props),[])
    return (
        <View style={[styles.container,{paddingHorizontal:10,backgroundColor:'#eee'}]}>
        
            <TouchableOpacity onPress={()=>props.navigation.navigate('ProfileScreen')} style={{backgroundColor:'white',padding:15,width:'100%',borderRadius:5,flexDirection:'row'}}>
                    <View style={{backgroundColor:'#eee',borderRadius:10,height:50,width:50,alignContent:'center'}}>
{/* <FontAwesomeIcon icon={faUser} color={'blue'} size={25} style={{alignSelf:'center',flexDirection:'row',margin:'20%'}}/> */}
                   <Image source={require('../assets/profile.png')} style={{height:'100%',width:'100%',borderRadius:10}}/>
                    </View>
                    <View style={{paddingHorizontal:10,marginVertical:5}}>
                        <Text style={{fontSize:18,fontWeight:'bold',}}>Kayo melese</Text>
                        <Text style={{fontWeight:'bold',color:'gray',fontSize:10}}>{props.phoneNo}</Text>
                    </View>
                <FontAwesomeIcon icon={faPen} color={'gray'} size={15} style={{position:'absolute',right:20,alignSelf:'center'}}/>
            </TouchableOpacity>
           <View style={{marginTop:20,width:'100%'}}>
            <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Settings</Text>
            <Text style={{fontSize:8,color:'gray'}}>configure your preferences</Text>
            <View style={{padding:10,width:'100%'}}>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('SelectLanguage')}} style={{backgroundColor:'white',padding:5,width:'100%',borderRadius:5,flexDirection:'row',marginVertical:'1%'}}>
                    <View style={{backgroundColor:'blue',borderRadius:5,height:40,width:40,alignContent:'center',margin:'1%'}}>
                            <FontAwesomeIcon icon={faLanguage} color={'white'} size={30} style={{alignSelf:'center',flexDirection:'row',margin:'15%'}}/>
                    </View>
                    <View style={{paddingHorizontal:10,marginVertical:5}}>
                        <Text style={{fontSize:18,fontWeight:'bold',}}>Language</Text>
                        <Text style={{color:'gray',fontSize:10}}>change the app language</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity  style={{backgroundColor:'white',padding:5,width:'100%',borderRadius:5,flexDirection:'row',marginVertical:'1%'}}>
                    <View style={{backgroundColor:'#ffda44',borderRadius:5,height:40,width:40,alignContent:'center',margin:'1%'}}>
                            <FontAwesomeIcon icon={faMoon} color={'black'} size={20} style={{alignSelf:'center',flexDirection:'row',margin:'25%'}}/>
                    </View>
                    <View style={{paddingHorizontal:10,marginVertical:5}}>
                        <Text style={{fontSize:18,fontWeight:'bold',}}>Theme</Text>
                        <Text style={{color:'gray',fontSize:10}}>change apps Theme</Text>
                    </View>
            </TouchableOpacity>
            <View style={{backgroundColor:'white',padding:5,width:'100%',borderRadius:5,flexDirection:'row',marginVertical:'1%'}}>
                    <View style={{backgroundColor:'#ff0040',borderRadius:5,height:40,width:40,alignContent:'center',margin:'1%'}}>
                            <FontAwesomeIcon icon={faInfo} color={'white'} size={20} style={{alignSelf:'center',flexDirection:'row',margin:'25%'}}/>
                    </View>
                    <View style={{paddingHorizontal:10,marginVertical:5}}>
                        <Text style={{fontSize:18,fontWeight:'bold',}}>About us</Text>
                        <Text style={{color:'gray',fontSize:10}}>about the app info</Text>
                    </View>
            </View>
            </View>
            </View>
        </View>
    )
}
const mapStateToProps=(state)=>{
    return {
            phoneNo:state.signedInfoReducer.phoneNumber,
            
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(SettingsScreen);