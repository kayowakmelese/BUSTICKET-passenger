import { faArrowRight, faCalendarCheck,faCar,faChair,faClipboard,faCode,faCouch,faDollarSign,faIcons,faNotesMedical,faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import * as React from 'react'
import {Text,View,TouchableOpacity, Image,ScrollView, Touchable} from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import QRCode from 'react-native-qrcode-svg';
import styles from '../style/styles';

const TravelDetail=(params)=>{
    const [data,setData]=React.useState(null)
    const [diffs,setDiff]=React.useState(null)
    React.useEffect(()=>{
        setData(params.route.params.data)
        console.log(params.route.params.data)
        var dates=moment();
        params.route.params.data?
        setDiff(dates.diff(moment(params.route.params.data.TravelDateSlot.fullDate),'days')):null
    },[])
    
    return (
        
        
        data?
        <ScrollView style={{backgroundColor:'#eee',padding:10}}>
        <TouchableOpacity style={{backgroundColor:'blue',padding:10,borderRadius:5,marginTop:20,width:40}}>
            <FontAwesomeIcon icon={faCalendarCheck} color={'white'} size={20}/>
        </TouchableOpacity>
        <Text style={{fontWeight:'bold',fontSize:20}}>Booking Detail</Text>
        {/* <Text style={{fontSize:10,color:'gray'}}>this is your 25 booking detail and blablabla</Text> */}
        {/* <View style={{backgroundColor:'white',borderRadius:5,padding:10,width:'100%',flexDirection:'row',marginTop:20}}>
        <TouchableOpacity disabled={false} style={{backgroundColor:'gray',width:40,padding:10,borderRadius:5}}>
        <FontAwesomeIcon icon={faUser} color={'white'} size={20}/>
        </TouchableOpacity>
        <View style={{paddingHorizontal:5}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Kayo melese</Text>
            <Text style={{fontSize:10,color:'gray'}}>{data.customerPhone}</Text>
  
        </View>
        
        </View> */}
        <TouchableOpacity onPress={()=>params.navigation.navigate('TravelDetail')} key={"key"} style={{padding:10,backgroundColor:'white',marginVertical:5,borderRadius:5,width:'100%',flexDirection:'row'}}>
                            <View style={{height:50,width:50,borderRadius:5,backgroundColor:'#eee',marginRight:10}}>
                            <Image source={require("../assets/bus1.png")} style={{height:'100%',width:'100%'}} scaleType="contain" resizeMode="contain"/>
                            </View>
                            
                            <View>
                                <Text style={{fontWeight:'bold',fontSize:20}}>{data.Company.name}</Text>
                                <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:10,color:'gray'}}>{data.Route.startBranchName}</Text>
        <FontAwesomeIcon icon={faArrowRight} size={10} color={'blue'} style={{paddingHorizontal:10,alignSelf:'center',justifyContent:'center'}}/>
        <Text style={{fontSize:10,color:'gray'}}>{data.Route.destnationBranchName}</Text>
        </View>  
        <Text style={{fontSize:10,color:'gray',fontWeight:'bold'}}>your travel date is {data.TravelDateSlot.fullDate}</Text>
        <Text style={{fontSize:10,color:'gray'}}>{diffs} days left</Text>
                                
                             </View>
                        </TouchableOpacity>
        <View style={{backgroundColor:'white',width:'100%',borderRadius:5,marginTop:0,padding:15}}>
        <View style={{flexDirection:'row'}}>
                                    <View style={{padding:10,borderRadius:5,backgroundColor:'green',width:40,alignSelf:'center',alignItems:'center'}}>
                                        <FontAwesomeIcon icon={faDollarSign} color={'white'} size={20}/>
                                    </View>
                                    <View style={{paddingHorizontal:5,alignContent:'center',justifyContent:'center'}}>
                                        <Text>Payment Option</Text>
                                        <Text style={{borderRadius:3,backgroundColor:'#222',fontSize:10,color:'white',padding:3}}>{data.paymentMethod} nnothing here</Text>

                                    </View>
                                    <View style={{position:'absolute',right:0,alignSelf:'center'}}>
                                    <CountdownCircleTimer strokeWidth={5}
          onComplete={()=>{
              console.log("completed")
           // setChoosenSeat([])
            //setStartTimer(false)
           // return [startTimer,1000]

          }}
          infinite
          isPlaying={true}
          duration={7200}
          colors='#0000FF'
          size={60}
          isLinearGradient={true}
          
        //   renderAriaTime={(tim)=>{
        //       if(remainingTime===0){
        //           //setRemainingTime(tim.remainingTime)
        //       }else if(tim.remainingTime===remainingTime){
        //         //setRemainingTime(tim.remainingTime)
               

        //       }else{
        //        //setRemainingTime(tim.remainingTime)
        //       }
            
        //   }}
        >
        
        <View style={{alignItems:'center'}}>
        <Text style={{fontWeight:'bold',fontSize:15}}>
        60
        </Text>
        <Text style={{fontSize:5,paddingHorizontal:5}}>seconds left</Text>
        </View>
           
           
        </CountdownCircleTimer>
                                    </View>
                                    
                                    </View>
                                    <View style={{padding:10,borderRadius:5,backgroundColor:'white',alignSelf:'center',marginTop:10}}>
                                        <QRCode value={data.bookNumber} color={'blue'} />
                                    </View> 
                                    <TouchableOpacity style={{alignSelf:'center',color:'white',fontWeight:'bold',borderRadius:5,padding:5,width:'40%',textAlign:'flex-start',justifyContent:'flex-start',alignContent:'flex-start'}}>
                                    <Text style={{alignSelf:'center',color:'black',fontWeight:'bold',fontSize:20}}>{data.bookPrice}birr</Text>

                                        <Text style={{alignSelf:'center',color:'gray',fontSize:10,textAlign:'center'}}>Pay the money using direct method before the countdown ends</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{alignSelf:'center',backgroundColor:'gray',color:'white',fontWeight:'bold',borderRadius:5,padding:5,width:'40%',justifyContent:'center',alignContent:'center'}}>
                                        
                                        <Text style={{alignSelf:'center',color:'white',fontWeight:'bold'}}>{data.bookNumber}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection:'column',width:'100%'}}>
                               
                               {
                                   data?data.Passengers.map((dat,i)=>{
                                      
                                       return <View style={{padding:5,backgroundColor:'white',borderRadius:5,width:'100%',marginTop:5}}>
                                           <View style={{flexDirection:'row'}}>
                                               <TouchableOpacity style={{backgroundColor:'#215af320',padding:15,borderRadius:30}}>
                                                   <FontAwesomeIcon icon={faUser} size={25} color={'blue'}/>
                                               </TouchableOpacity>
                                               <View style={{paddingHorizontal:10,justifyContent:'center'}}>
                                                   <Text style={{fontWeight:'bold',fontSize:15}}>{dat.name}</Text>
                                                   <Text style={{fontSize:10,color:'gray'}}>{dat.phoneNo}</Text>
                                               </View>
                                           </View>
                                           <View style={{flexDirection:'row'}}>
                                           <View style={{marginTop:10,backgroundColor:'white',margin:1,width:'50%',borderRadius:5,padding:10,flexDirection:'row'}}>
                                <TouchableOpacity disabled={false} style={{backgroundColor:'black',width:40,padding:10,borderRadius:5}}>
        <FontAwesomeIcon icon={faCouch} color={'white'} size={20}/>
        </TouchableOpacity>
        <View style={{paddingHorizontal:10}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>{data.Seats[i].number}</Text>
            <Text style={{fontSize:8,color:'gray'}}>Seat Number</Text>
            
        </View>
                                </View>
                                <View style={{marginTop:10,backgroundColor:'white',margin:1,width:'50%',borderRadius:5,padding:10,flexDirection:'row'}}>
                                <TouchableOpacity disabled={false} style={{backgroundColor:'black',width:40,padding:10,borderRadius:5}}>
        <FontAwesomeIcon icon={faClipboard} color={'white'} size={20}/>
        </TouchableOpacity>
        <View style={{paddingHorizontal:10,justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:10}}>{dat.ticketNumber}</Text>
            <Text style={{fontSize:8,color:'gray'}}>Ticket Number</Text>
            
        </View>
                                </View>
                                          
                                           </View>
                                           <View style={{elevation:0,padding:10,width:'100%',borderRadius:5,flexDirection:'row',backgroundColor:'white',alignSelf:'flex-start',marginTop:10}}>
                                        <QRCode value={data.bookNumber} color={'blue'} />
                                        <View style={{padding:10,justifyContent:'center',width:'90%',borderBottomRightRadius:5,borderTopRightRadius:5}}>
                                            <Text style={{fontWeight:'bold',fontSize:20,color:'black',opacity:1}}>Scan This</Text>
                                            <Text style={{fontSize:8,color:'gray',flexWrap:'wrap'}}>scan this qr code by the bus driver on arrival </Text>
                                        </View>
                                    </View> 
                                    <TouchableOpacity style={{padding:15,backgroundColor:'orangered',borderRadius:5}}>
                                        <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Cancel Travel</Text>
                                    </TouchableOpacity>
                                         
                                          
                                       </View>
                                   }):null
                               }
                                
                                </View></ScrollView>:<View></View>
        
                               
                                
        
    )
}
export default TravelDetail;