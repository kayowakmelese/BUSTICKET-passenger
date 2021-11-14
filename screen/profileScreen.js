import { faCog, faEdit, faInfo,faArrowRight, faLanguage, faMoon, faPen, faPeopleCarry, faPhotoVideo, faUser, faWaveSquare, faAt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import styles from '../style/styles'
import strings from '../translation'

const ProfileScreen=(props)=>{
    React.useEffect(()=>console.log(props),[])
    return (
        <View style={[styles.container,{paddingHorizontal:10,backgroundColor:'#eee'}]}>
        
            <TouchableOpacity style={{backgroundColor:'white',padding:15,width:'100%',borderRadius:5,flexDirection:'column',alignItems:'center',alignContent:'center'}}>
                    <View style={{backgroundColor:'#eee',borderRadius:50,padding:30,alignContent:'center'}}>
<FontAwesomeIcon icon={faUser} color={'blue'} size={40} style={{justifyContent:'center',alignItems:'center'}}/>
                    </View>
                    <View style={{paddingHorizontal:10,marginVertical:5}}>
                        <Text style={{fontSize:18,fontWeight:'bold',}}>Add Name</Text>
                        <Text style={{fontWeight:'bold',color:'gray',fontSize:10}}>{props.phoneNo}+251 910232323</Text>
                    </View>
            </TouchableOpacity>
           <View style={{marginTop:20,width:'100%'}}>
            <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Edit Profile</Text>
            <Text style={{fontSize:8,color:'gray'}}>configure your preferences</Text>
            <View style={{padding:10,width:'100%'}}>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('SelectLanguage')}} style={{backgroundColor:'white',width:'100%',borderRadius:5,flexDirection:'row',marginVertical:'1%'}}>
                   
                    <View style={{paddingHorizontal:10,marginVertical:5,padding:10}}>
                        <TextInput placeholder={'Your full name'}/>
                    </View>
                    <FontAwesomeIcon icon={faUser} color={'gray'} size={20} style={{alignSelf:'center',justifyContent:'center',position:'absolute',right:10}}/>

            </TouchableOpacity>
            <TouchableOpacity  style={{backgroundColor:'white',padding:5,width:'100%',borderRadius:5,flexDirection:'row',marginVertical:'1%'}}>
                   
                    <View style={{paddingHorizontal:10,marginVertical:5}}>
                        <TextInput placeholder={'your email'} />
                    </View>
                    <FontAwesomeIcon icon={faAt} color={'gray'} size={20} style={{alignSelf:'center',justifyContent:'center',position:'absolute',right:10}}/>

            </TouchableOpacity>
            <View style={{alignItems:'flex-end',marginTop:20}}>

<TouchableOpacity style={{width:'100%',alignItems:'flex-end'}} onPress={()=>{params.navigation.navigate('PickBus')}}>

<View style={{flexDirection:'row',padding:15,backgroundColor:'blue',borderRadius:10}}>
<Text style={{color:'white',fontWeight:'bold',marginRight:20}}> Save</Text>
<FontAwesomeIcon icon={faArrowRight} color={'white'} />
</View>
</TouchableOpacity>
</View>
            </View>
            </View>
        </View>
    )
}
const mapStateToProps=(state)=>{
    return {
            phoneNo:state.signedInfoReducer.phoneNumber
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);