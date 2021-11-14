import { faArrowRight, faCalendarCheck, faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as React from 'react'
import {View,Text,TouchableOpacity,ScrollView,Image} from 'react-native'
import styles from '../style/styles'
import { loadHistoryData } from '../action/index'
import { connect } from 'react-redux'


const TravelHistory=(params)=>{
    const [data,setData]=React.useState(null)
    React.useEffect(()=>{
            params.loadHistory();
    },[])
        React.useEffect(()=>{
            if(params.historyData){
                setData(params.historyData)
            }
    },[params.historyData])
    return (
        <ScrollView style={[{backgroundColor:'#f5f5f5',padding:5,paddingHorizontal:10,flex:1,flexDirection:'column',alginContent:'flex-start'}]}>
        <TouchableOpacity style={{backgroundColor:'blue',padding:10,borderRadius:5,width:40,marginTop:20}}>
        <FontAwesomeIcon icon={faCalendarCheck} color={'white'} size={20}/>

        </TouchableOpacity>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Travel History</Text>
            <Text style={{fontSize:10,color:'gray'}}>list of all the booking history you have made until now using our app</Text>
        <View style={{marginVertical:10,width:'100%'}}>
                {data?
                    data.map((dat,i)=> {
                        return <TouchableOpacity onPress={()=>params.navigation.navigate('TravelDetail',{
                            data:dat
                        })} key={"key"+dat} style={{padding:15,backgroundColor:'white',marginVertical:5,borderRadius:5,width:'100%',flexDirection:'row'}}>
                            <View style={{height:50,width:50,marginVertical:5,borderRadius:5,backgroundColor:'#eee',marginRight:10}}>
                            {/* <FontAwesomeIcon icon={faCar} color={'white'}/> */}
                            <Image source={require("../assets/bus1.png")} style={{height:'100%',width:'100%'}} scaleType="contain" resizeMode="contain"/>
                            </View>
                            
                            <View>
                                <Text style={{fontWeight:'bold',fontSize:20}}>{dat.Company.name}</Text>
                                <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:10,color:'gray'}}>{dat.Route.startBranchName}</Text>
        <FontAwesomeIcon icon={faArrowRight} size={10} color={'blue'} style={{paddingHorizontal:10,alignSelf:'center',justifyContent:'center'}}/>
        <Text style={{fontSize:10,color:'gray'}}>{dat.Route.destnationBranchName}</Text>
        </View>  

                                <View style={{flexDirection:'row'}}>
                                    <Text style={{borderRadius:3,backgroundColor:'green',fontSize:10,color:'white',padding:3}}>Travel {dat.bookStatus}</Text>
                                    <Text style={{marginHorizontal:5,borderRadius:3,backgroundColor:'#222',fontSize:10,color:'white',padding:3}}>Payment completed</Text>

                                </View>
                                
                             </View>
                             <FontAwesomeIcon icon={faArrowRight} color={'blue'} style={{width:'100%',alignSelf:'center',position:'absolute',right:20}}/>
                        </TouchableOpacity>
                    })
                :null}
        </View>
        </ScrollView>
    )
}
const mapDispatchToProps=(dispatch)=>{
    return {
            loadHistory:()=>dispatch(loadHistoryData())
    }
}
const mapStateToProps=(state)=>{
    return {
            historyData:state.historyDataReducer.data,
            isLoading:state.historyDataReducer.isLoading
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TravelHistory) ;