import * as React from 'react'
import {View,Text,TouchableOpacity,ScrollView,Image} from 'react-native'
import BottomSheet,{BottomSheetView,BottomSheetScrollView,BottomSheetModalProvider,BottomSheetModal} from '@gorhom/bottom-sheet';
import styles from '../style/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const PaymentMethod=(params)=>{
    const [methods,setMethods]=React.useState([{name:"Awash Bank",code:"76882618"},{name:"Cbe Birr",code:"765tr6778"},{name:"Tele birr",code:"45362"},{name:"Direct method",code:"45362"}])
       
    return (
            <View style={[styles.container,{backgroundColor:'#eee'}]}>
            <View style={{backgroundColor:'blue',padding:5,borderRadius:5,width:40}}>
                <FontAwesomeIcon icon={faDollarSign} color={'white'} size={30}/>
            </View>
            <Text style={{fontWeight:'bold',fontSize:20}}>Payment Method</Text>
            <Text style={{fontSize:10,color:'gray',marginBottom:20}}>choose your payment method</Text>
                {
                    methods.map((dat,i)=>{
                        let srcc=require("../assets/awash.jpg")
                        i%2!=0?srcc=require("../assets/cbe.jpg"):null;
                        i===3?srcc=require('../assets/cash.jpg'):null
                        i===2?srcc=require('../assets/tele.png'):null
                        return <TouchableOpacity onPress={()=>{
                            params.navigation.navigate("HomeScreen")
                        }} style={{padding:10,backgroundColor:'white',borderRadius:5,flexDirection:'row',margin:2,width:'100%'}}>
                            <Image style={{width:50,padding:10,height:50,backgroundColor:'gray',borderRadius:5}} source={srcc}/>
                            <View style={{paddingHorizontal:10,alignContent:'center',justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold'}}>{dat.name}</Text>
                                <Text style={{fontSize:8,color:'gray'}}>{dat.code}</Text>
                            </View>
                            <FontAwesomeIcon icon={faArrowRight} color={'blue'} style={{justifyContent:'center',position:'absolute',right:10,
                            alignItems:'center',alignContent:'center',marginVertical:'4%'
                            }}/>
                        </TouchableOpacity>
                    })
                }
            </View>
        )
}
export default PaymentMethod;