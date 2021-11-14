import * as React from 'react'
import {Text,View,TouchableOpacity,FlatList,TextInput} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faArrowUp, faExchangeAlt, faMapPin, faMapSigns, faSearch } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'

import {addCitys,addTravelOriginAndDestination} from '../action/index'

const CountryList=(params)=>{
    const [citys,setCitys]=React.useState([]);
     const [origin,setOrigin]=React.useState(null)
    const [destination,setDestination]=React.useState(null)
    const [searchKey,setSearchKey]=React.useState(null);
    React.useEffect(()=>{
        params.fetchCityData();
    },[])
    React.useEffect(()=>{
        if(params.cityData){
            setCitys(params.cityData)
        }
    },[params.cityData])
    React.useEffect(()=>{
        params.addOandD(origin,destination)
            
    },[origin,destination])
    React.useEffect(()=>{
        setOrigin(params.origin)
            
    },[params.origin])
 const setLocations=(name)=>{
        if(!params.origin){
            setOrigin(name)
        }else{
            setDestination(name)
        }
        console.log(name)
        
    }

    return (
        <View style={{margin:10,borderRadius:10}}>
         <View style={{borderRadius:5,marginTop:5}}>
                <View style={{backgroundColor:'white',borderRadius:5,flexDirection:'row'}}>
                <TextInput style={{width:'90%',padding:10}} placeholder={'search city'}/><FontAwesomeIcon icon={faSearch} color={'blue'} style={{alignSelf:'center'}}/>
                </View>
                {citys.map((dat,i)=>{
                    return <TouchableOpacity onPress={()=>{setLocations(dat.name);setSearchKey(null);params.closer}} key={`CUTY${i}hint`} style={{padding:10,borderRadius:5,backgroundColor:'#0000ff10',marginVertical:2,flexDirection:'row',justifyContent:'space-between'}}>
                                    <View>
                                    <Text style={{fontWeight:'bold',color:'black'}}>{dat.name}</Text>
                                    <Text style={{color:'gray',fontSize:8}}>city name</Text>
                                    </View>
                                    <FontAwesomeIcon icon={faArrowUp} style={{marginTop:5}} color={'blue'}/>
                                    
                                </TouchableOpacity>
                })}
                {/* <FlatList keyExtractor={(item,index)=>index.toString()} keyboardShouldPersistTaps={"never"} disableScrollViewPanResponder={true} style={{flexGrow:0,borderRadius:5}} initialNumToRender={3}   data={citys} renderItem={(dat,i)=>{
                    return <TouchableOpacity onPress={()=>{setLocations(dat.item.name);setSearchKey(null)}} key={`CUTY${dat.index}hint`} style={{padding:10,borderRadius:5,backgroundColor:'#0000ff10',marginVertical:2,flexDirection:'row',justifyContent:'space-between'}}>
                                    <View>
                                    <Text style={{fontWeight:'bold',color:'black'}}>{dat.item.name}</Text>
                                    <Text style={{color:'gray',fontSize:8}}>city name</Text>
                                    </View>
                                    <FontAwesomeIcon icon={faArrowUp} style={{marginTop:5}} color={'blue'}/>
                                    
                                </TouchableOpacity>
                }}/> */}
                       
                </View></View>
    )
}
const mapStateToProps=(state)=>{
    return {
        cityData:state.cityListReducer.data,
        isLoading:state.cityListReducer.isLoading,
        origin:state.travelOrderReducer.origin,
        dest:state.travelOrderReducer.dest
        
    }
}
const mapDispatchToProps=(dispatch)=>{
        return {
            fetchCityData:()=>dispatch(addCitys()),
            addOandD:(origin,dest)=>dispatch(addTravelOriginAndDestination(origin,dest))
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(CountryList);