import * as React from 'react'
import {View,Text,TouchableOpacity,Image} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faClock, faUserClock,faDollarSign } from '@fortawesome/free-solid-svg-icons'
import styles from '../style/styles'
import strings from '../translation'


const BusCard=(props)=>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate('BusDetail',{
            itemData:props.itemData,name:props.name,price:props.price
        })} style={{marginVertical:'1%',marginBottom:5,padding:10,borderRadius:5, marginHorizontal:10,backgroundColor:'#fff',justifyContent:'space-around'}}>
                   <View style={{flexDirection:'row'}}>
                    
                     <View style={{width:'100%'}}>
                     <View style={{width:'100%',height:80,borderRadius:5,alignSelf:'flex-start',alignItems:'flex-start',justifyContent:'flex-start'}}> 
                     <Image source={require('../assets/bus1.png')} scaleType={'scale'} style={{width:'50%',backgroundColor:'white',height:'100%',marginTop:'0%',alignSelf:'flex-start'}} resizeMethod={'resize'} resizeMode={'contain'}/>
                    </View>
                     <Text style={{width:'100%',color:'#222',fontSize:18,fontWeight:'bold'}}>{props.name}</Text>
                     <View style={{flexDirection:'row',width:'100%'}}>
                    {/* //  <View style={{flexDirection:'row'}}>
                    //      <FontAwesomeIcon icon={faClock} size={10} color={'gray'} style={{marginRight:5}}/>
                    //      <Text style={{fontSize:10,color:'gray'}}>
                    //          {props.time} local time 
                    //      </Text>
                    //  </View> */}
                     
                     </View>
                    
                    
                     {/* <Text style={{width:'30%',color:'#2196f3',fontSize:10,fontWeight:'100'}}>Lorem ipsum dolor sit amet connecticut Lorem ipsum dolor sit amet connecticutLorem ipsum dolor sit amet connecticutLorem ipsum dolor sit amet connecticutLorem ipsum dolor sit amet connecticutLorem ipsum dolor sit amet connecticut</Text> */}
                   <View style={{flexDirection:'row',width:'100%'}}>         
                              <View style={{flexDirection:'row',marginVertical:1,backgroundColor:'blue',padding:5,borderRadius:5}}>
                        <FontAwesomeIcon icon={faDollarSign} color={'white'} size={15}/>
                        <Text style={{fontSize:10,fontWeight:'bold',color:'white'}}>{props.price} ETB/Seat</Text>
                    </View>
                    </View>
                    <TouchableOpacity  style={{
       marginTop:15,
       marginLeft:10,
        borderRadius:5,
        fontSize:24,
        color:'blue',
        backgroundColor:"white",
        flexDirection:'row',
        alignItems:'flex-end',
        width:'100%',
        fontWeight:'bold'}}>
        <Text style={{marginRight:20,width:'80%'}}>{strings.seedetails}</Text>
            <FontAwesomeIcon icon={faArrowRight} color={'gray'}/>
        </TouchableOpacity>
                   </View>
                  
                 </View>

                   </TouchableOpacity>
    )
}
export default BusCard