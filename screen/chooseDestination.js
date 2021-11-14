import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput,FlatList } from 'react-native'
import styles from '../style/styles'
import CalendarStrip from 'react-native-calendar-strip'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faArrowUp, faExchangeAlt, faMapPin, faMapSigns, faSearch } from '@fortawesome/free-solid-svg-icons'
import strings from '../translation'
import { connect } from 'react-redux'
import { addCitys, addTravelOriginAndDestination } from '../action'
const ChooseDestination = (params) => {
    const [citys, setCitys] = useState([])
    const [searchKey,setSearchKey]=useState(null)
    const [origin,setOrigin]=useState(null)
    const [destination,setDestination]=useState(null)
    useEffect(()=>{
        if(searchKey){
            setCitys(params.cityData)
        }else{
            setCitys([])
        }
            
    },[searchKey])
    useEffect(()=>{
        params.addOandD(origin,destination)
            
    },[origin,destination])
    useEffect(()=>{
        params.fetchCityData()
        
    },[])
    const setLocations=(name)=>{
        if(!origin){
            setOrigin(name)
        }else{
            setDestination(name)
        }
        console.log(name)
        
    }
    const exchangeLocations=()=>{
        let originCopy=origin;
        setOrigin(destination);
        setDestination(originCopy)
    }
    return (
        <View style={styles.container}>
            <Text></Text>
            <Image />
            <View style={{width:'100%',flexDirection:'row',marginBottom:'15%'}}>
                <TouchableOpacity onPress={()=>{setOrigin(null)}} style={{padding:10,alignItems:'center',backgroundColor:origin?'black':'gray',width:'40%',borderRadius:10}}>
                    <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>{strings.origin}</Text>
                    <Text style={{fontSize:10,color:'white'}}>{origin?origin:strings.selecto}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>exchangeLocations()}>
                <FontAwesomeIcon icon={faExchangeAlt} color={'gray'} style={{marginTop:20,marginHorizontal:20}}/>
               </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setDestination(null)}} style={{padding:10,alignItems:'center',backgroundColor:destination?'black':'gray',width:'40%',borderRadius:10}}>
                    <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>{strings.dest}</Text>
                    <Text style={{fontSize:10,color:'white'}}>{destination?destination:strings.selectd}</Text>
                </TouchableOpacity>
            </View>
            <FontAwesomeIcon icon={faMapSigns} size={50} color={'blue'} />
            <View style={{ paddingHorizontal: 15,width:'100%' }}>
                {

                }
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{origin && destination ?strings.continue:origin?strings.selectd:strings.selecto}</Text>
                <Text style={{ fontSize: 10 }}>{origin && destination?'click the origin and dest buttons to change location ':strings.poandpd}</Text>
                {
                    origin && destination ?null:<View style={{ flexDirection: 'row', marginTop: 20, borderStyle: 'solid', borderWidth: 2, borderRadius: 5 }}>
                    <TextInput focus value={searchKey} onChangeText={(e)=>setSearchKey(e)} placeholder={'Ex:Addis Abeba'} style={{ width: '90%', padding: 5 }} />
                    <FontAwesomeIcon icon={faSearch} style={{ marginVertical: 10 }} />
                </View>
                }
                
                <View style={{borderRadius:5,marginTop:5}}>
                <FlatList keyExtractor={(item,index)=>index.toString()} keyboardShouldPersistTaps={"never"} disableScrollViewPanResponder={true} style={{backgroundColor:'#0088ff10',flexGrow:0,maxHeight:210}} initialNumToRender={3}   data={citys} renderItem={(dat,i)=>{
                    return <TouchableOpacity onPress={()=>{setLocations(dat.item.name);setSearchKey(null)}} key={`CUTY${dat.index}hint`} style={{padding:10,borderRadius:5,marginVertical:2,flexDirection:'row',justifyContent:'space-between'}}>
                                    <View>
                                    <Text style={{fontWeight:'bold',color:'black'}}>{dat.item.name}</Text>
                                    <Text style={{color:'gray',fontSize:8}}>city name</Text>
                                    </View>
                                    <FontAwesomeIcon icon={faArrowUp} style={{marginTop:5}} color={'blue'}/>
                                    
                                </TouchableOpacity>
                }}/>
                       
                </View>
                {
                    origin && destination ? <View style={{alignItems:'flex-end',marginTop:20}}>

<TouchableOpacity style={{width:'100%',alignItems:'flex-end'}} onPress={()=>{params.navigation.navigate('PickBus')}}>

<View style={{flexDirection:'row',padding:15,backgroundColor:'blue',borderRadius:10}}>
<Text style={{color:'white',fontWeight:'bold',marginRight:20}}> {strings.continue}</Text>
<FontAwesomeIcon icon={faArrowRight} color={'white'} />
</View>
</TouchableOpacity>
</View>:null
                }
                
                
            </View>
        </View>

    )
}
const mapStateToProps=(state)=>{
    return {
        cityData:state.cityListReducer.data,
        isLoading:state.cityListReducer.isLoading
    }
}
const mapDispatchToProps=(dispatch)=>{
        return {
            fetchCityData:()=>dispatch(addCitys()),
            addOandD:(origin,dest)=>dispatch(addTravelOriginAndDestination(origin,dest))
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChooseDestination)