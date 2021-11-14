import React,{useEffect,useState} from 'react'
import {Text,View,Image,TouchableOpacity,TextInput} from 'react-native'
import styles from '../style/styles'
import CalendarStrip from 'react-native-calendar-strip'

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faArrowRight, faCar, faCheck, faSadCry, faSadTear, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import BusCard from '../component/busesCard'
import { connect } from 'react-redux'
import { addAvailableCompany } from '../action'
const ChooseBus=(params)=>{
    const [busData,setBusData]=useState([])
    useEffect(()=>{
        if(params.busesData){
            setBusData(params.busesData)
            console.log("company data",JSON.stringify(busData))
        }
            
    },[params.busesData])
    useEffect(()=>{
        console.log("params are",params.dat)
},[params.origin])
    return (
        <View style={[{backgroundColor:'#eee',padding:10}]}>
       <View style={{backgroundColor:'green',padding:10,borderRadius:5,width:50,marginTop:50}}>
            <FontAwesomeIcon icon={faCar} color={'white'} size={30} />
       </View>
        <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Available Buses</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:10,color:'gray'}}>{params.origin}</Text>
        <FontAwesomeIcon icon={faArrowRight} color={'blue'} style={{paddingHorizontal:20}}/>
        <Text style={{fontSize:10,color:'gray'}}>{params.destination}</Text>
        </View>
        <View style={{ paddingHorizontal: 0,width:'100%' }}>
              
               <View style={{width:'95%',alignSelf:'center', flexDirection: 'row',backgroundColor:'white', marginTop: 20, borderStyle: 'solid', borderWidth: 0, borderRadius: 5 }}>
                    <TextInput placeholder={'Ex:Geda Bus'} style={{ width: '92%', padding: 10 }} />
                    <FontAwesomeIcon icon={faSearch} style={{ marginVertical: 20 }} />
                </View>
                {busData?
                    busData.length>0?
                    <FlatList  scrollEnabled={true} keyExtractor={(item,index)=>index.toString()} data={busData} 
                        renderItem={(dat,i)=>{
                            return (
                                <View key={dat.index+"io"}>
                                <BusCard itemData={dat.item} navigation={params.navigation}  name={dat.item.Company.name} price={dat.item.TravelDateSlots[0].slotPrice+dat.item.TravelDateSlots[0].slotPrice*dat.item.Company.CompanyCommission.commisssion/100} time={dat.item.fullDate}/>
                           </View>
                           )
                        }}

                    />:
                    <View style={{padding:20,alignItems:'center'}}>
                        <FontAwesomeIcon icon={faSadTear} color={'blue'} size={50}/>
                        <Text style={{fontWeight:'bold',fontSize:24}}>No Bus Found</Text>
                        <Text style={{fontSize:8,color:'gray'}}>we tried our best but we failed said elon musk</Text>
                    </View>
                :null}
                </View>
        </View>
        
    )
}
const mapStateToProps=(state)=>{
    return {
        busesData:state.availableCompanyReducer.data,
        isLoading:state.availableCompanyReducer.isLoading,
        origin:state.travelOrderReducer.origin,
        destination:state.travelOrderReducer.dest,
        date:state.travelOrderReducer.date,
        dat:state.travelOrderReducer
    }
}
const mapDispatchToProps=(dispatch)=>{
        return {
        }
}
export default connect(mapStateToProps,mapDispatchToProps)( ChooseBus)