import React,{useState,useEffect,useContext} from 'react'
import {View,Text,Image, Button, TouchableOpacity,ScrollView,SafeAreaView, Dimensions,FlatList, Touchable,Platform} from 'react-native'
import styles from '../style/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle, faDollarSign,faArrowRight,faSearch, faDotCircle,faChair,faWheelchair, faAddressBook, faPersonBooth, faPrescriptionBottleAlt, faPrescriptionBottle, faTable, faCouch, faBox, faBoxOpen, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { getLeaftSeat, NewArray } from '../helpers/seatAlgorithm'
import { connect } from 'react-redux'
import { SocketContext } from '../context/socket';

import { addSeatInformation } from '../action'
 const selectSeat =(params)=>{ const [chairInfos,setChairInfos]=useState([])
    const [reservedSeats,setReservedSeats]=useState([4,7,9,18])
    const [change,setChange]=useState(false)
    const [remainingTime,setRemainingTime]=useState(0)
    const [choosenSeat,setChoosenSeat]=useState([])
    const [startTimer,setStartTimer]=useState(false)
    const [right,setRight]=useState(0)
    const [left,setLeft]=useState(0)
    const [center,setCenter]=useState(0)
    const [column,setColumn]=useState(0)
    const [doorBack,setDoorBack]=useState(0)
   var height=Dimensions.get('window').height
    var counter=0;
    const socket=useContext(SocketContext)

    var timer=6400;
    useEffect(()=>{
            setRemainingTime(timer)
    },[timer])
    useEffect(()=>{
        if(params.seatData){
            setLeft(params.seatData[0].leftCol)
            setRight(params.seatData[0].rightCol)
            setCenter(params.seatData[0].centerSeat)
            setColumn(params.seatData[0].column)
            setDoorBack(params.seatData[0].doorBackBreak)


        }
    },[params.seatData])
    function compareNumbers(a, b) {
        return  parseInt(a.number) - parseInt(b.number);
      }
    const seatCount = (left,right,col,center)=>{

        let forLeft=parseInt(left*col)
        let forRight=parseInt(right*col)
        let sum=(forLeft+forRight+center)-2
        if(sum<0){
            return 0
        }else{
        
        }
        return sum
        
        }
        let count=0;
        let rightRow=0;
        const seatDefinition=(k)=>{
            let id=k;
            let isReserved=false;
            if(k!==0){
                id=id+15
            }
            counter++;
                let col="black";
                let me=-1;
                let findv=choosenSeat.find((seat,i)=>{
                   // console.log("this are the seats",seat.seatNo+"and"+chairInfos[k-1].number)
                    if(seat.seatNo===parseInt(chairInfos[k-1].number)){
                        me=i;
                        return true;
                    }else{
                        me=-1;
                        return false;
                    }
                })
               if(me>-1){
                    col='green';
                }
             //   console.log("i want this",JSON.stringify(choosenSeat)+" fuck you "+k)
                let indexOfchosen=reservedSeats.indexOf(k);
                for(var chosen in choosenSeat){
                    if(chosen===id){
                        col="green"
                    }
                }
                if(chairInfos){
                  //  console.log("hfhfhfhfhf",chairInfos)
                    if(chairInfos[k-1].reserved || chairInfos[k-1].isBookTempR || chairInfos[k-1].isTemp ){
                        let me=-1;
                        let counter=0;
                        let findv=choosenSeat.find((seat,i)=>{
                            console.log("angel",JSON.stringify(chairInfos[k-1].number)+JSON.stringify(seat))
                            if(seat.seatNo===parseInt(chairInfos[k-1].number)){
                                me=counter;
                                console.log("salad",me)
                                return true;
                            }else{
                                console.log("not equal")
                                me=-1;
                                return false;
                            }
                            counter++;
                        })
                       
                        if(me>-1){
                            col="green"
                        }else{
                            col="orangered"
                            isReserved=true
                        }
                       
                    
                }
                }
                
               return {
                   color:col,
                   isReserved:isReserved
               }
        }
        const seatPressed=(kayo,seatId,id)=>{
            
           // console.log("seatId",kayo)
            let arr=choosenSeat;
            let checked=false;
            let me=-1;
            let key=kayo;
            let count=0;
            let findv=choosenSeat.find((seat,i)=>{
               console.log("this are the seats",seat.seatNo+"and"+chairInfos[kayo-1].number)
              
               if(seat.seatNo===parseInt(chairInfos[kayo-1].number)){
                    me=count;
                    console.log("i am enevitable",me)
                    return true;
                }else{
                    me=-1;
                    console.log("nope")
                    return false;
                }
                count++;
            })
          //  console.log("this is the log ",me) 
            let isReserved=reservedSeats.indexOf(kayo);
            if(me>-1){
                arr.splice(me,1)
                checked=false;
            }else{
                if(arr.length<3){
                    
                    let kf={seatNo:kayo,seatId:chairInfos[kayo-1].id}
                    arr.push(kf)
                    checked=true;
                }
                
            }
            setChoosenSeat(arr)
            if(change){
                setChange(false)
            }else{
                setChange(true)
            }
            if(checked){
                socket.emit("clickedSeat", { data: params.route.params.travelSlotId,
                     seatNo: {
                         SeatId:chairInfos[kayo-1].id,
                         tempReservedAt:new Date()
                     }, 
                    
                     socketId: socket.id, 
                     token: params.token })
            }else{
                socket.emit("seatUnselect",{id:chairInfos[kayo-1].id,TravelDateSlotId:params.route.params.travelSlotId,token:params.token
                
                })
            }

           // setStartTimer(true)
        }
        useEffect(()=>{
          //  socket.io.connected()?console.log("has connected"):console.log("not connected")
          console.log("kayiti",params.route.params)
            socket.emit("setRoomName",{data:params.route.params.travelSlotId})
            socket.on("sendSeat",(data)=>{
                console.log("manager")
                params.fetchSeatInfo(false,data.remotData.sort(compareNumbers))
            //    console.log("the socket emited",data.remotData.sort(compareNumbers))
            })
            socket.on("onClickUpdate",(data)=>{
                console.log("manager")
                params.fetchSeatInfo(false,data.remotData.sort(compareNumbers))
            //   console.log("the socket emited",data.remotData.sort(compareNumbers))
            })
            // return () => {
            //     socket.disconnect();
            // }
            

        },[])
        useEffect(()=>{
            if(params.seatInfo){
                setChairInfos(params.seatInfo)
               // console.log("the information",params.seatInfo)
            }

        },[params.seatInfo])
    return <ScrollView style={{flex:1,backgroundColor:'#fff'}} >
        <View style={{marginHorizontal:10,marginTop:50}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
        <View style={{width:'50%'}}>
        <TouchableOpacity style={{width:'100%',alignItems:'flex-start',justifyContent:'space-between'}}>
            
            <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#aaa', borderRadius: 10 }}>
            <FontAwesomeIcon icon={faArrowLeft} color={'white'} />
                <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 20 }}>{params.route.params.busName}</Text>
                
              </View>
              
              <View>
               
              </View>
              </TouchableOpacity>
              <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Choose Seat</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:10,color:'gray'}}>Addis Abeba</Text>
        <FontAwesomeIcon icon={faArrowRight} color={'blue'} style={{paddingHorizontal:20}}/>
        <Text style={{fontSize:10,color:'gray'}}>Adama</Text>
        </View>
        </View>
       
          <CountdownCircleTimer 
          onComplete={()=>{
              console.log("completed")
            setChoosenSeat([])
            setStartTimer(false)
            return [startTimer,1000000]

          }}
          infinite
          isPlaying={startTimer}
          duration={60}
          colors='#0000FF'
          size={80}
          strokeWidth={4}
          isLinearGradient={true}
          renderAriaTime={(tim)=>{
              if(remainingTime===0){
                  
                  setRemainingTime(tim.remainingTime)
              }else if(tim.remainingTime===remainingTime){
                setRemainingTime(tim.remainingTime)
               

              }else{
                  if(tim.remainingTime===50){
                      setReservedSeats([1,2,17,20])
                  }
               setRemainingTime(tim.remainingTime)
              }
            
          }}
        >
        
        <View style={{alignItems:'center'}}>
        <Text style={{fontWeight:'bold',fontSize:20}}>
        {remainingTime}
        </Text>
        <Text style={{fontSize:8,paddingHorizontal:5}}>seconds left</Text>
        </View>
           
           
        </CountdownCircleTimer>
          </View>
        <View style={{flexDirection:'row',marginHorizontal:10,borderRadius:10,padding:5,backgroundColor:'#fff'}}>
        <View style={{width:'100%',borderRadius:10,alignItems:'center',paddingVertical:10}}>
       
        <View style={{flexDirection:'row',justifyContent:'center'}}>
    <View >
        {NewArray(parseInt(column)).map(i=>{
                return <View style={{flexDirection:'row'}}>
                {getLeaftSeat(left,right,center,column,doorBack,seatCount(left,right,column,center)).rowLeft[i].map(k=>{
                    let definition=seatDefinition(k);
                    return <TouchableOpacity disabled={chairInfos[k-1].reserved}  onPress={()=>{seatPressed(k,chairInfos[k-1].id)}} style={[styles.carseats,{backgroundColor:definition.color}]}>
                        <Text style={styles.carSeatText}>{chairInfos[k-1].number}</Text>
                    </TouchableOpacity>
                })}
                </View>
                
            
        })}
        </View>
        <View>
        {
            
            NewArray(parseInt(column)).map(i=>{
                    count++;
                    if(count!=column){
                        return  <TouchableOpacity style={styles.carseatsNo}>
                            <Text></Text>
                        </TouchableOpacity>
                    }else{
                        
                        if(getLeaftSeat(left,right,center,column,doorBack,seatCount(left,right,column,center)).center[0]!=undefined && getLeaftSeat(left,right,center,column,doorBack,seatCount(left,right,column,center)).center!=null){
                            

                            return  <View style={{flexDirection:'row'}}>
                                        {
                                            getLeaftSeat(left,right,center,column,doorBack,seatCount(left,right,column,center)).center.map(k=>{
                                                let definition=seatDefinition(k);
                                                return <TouchableOpacity disabled={chairInfos[k-1].reserved || chairInfos[k-1].isBookTempR || chairInfos[k-1].isTemp ?true:false} onPress={()=>seatPressed(k)} style={[styles.carseats,{backgroundColor:definition.color}]}><Text style={styles.carSeatText}>{chairInfos[k-1].number}</Text></TouchableOpacity>

                                            })
                                        }
                            </View>

                        }
                      
                    }
            })
        }
        </View>
        <View >
        {NewArray(parseInt(column)).map(i=>{
            rightRow++;
            
            if(rightRow!=doorBack){

                return <View style={{flexDirection:'row'}}>
                {getLeaftSeat(left,right,center,column,doorBack,seatCount(left,right,column,center)).rowRight[i].map(k=>{
                    let definition=seatDefinition(k);

                    return <TouchableOpacity disabled={chairInfos[k-1].reserved} onPress={()=>seatPressed(k)} style={[styles.carseats,{backgroundColor:definition.color}]}><Text style={styles.carSeatText}>{chairInfos[k-1].number}</Text></TouchableOpacity>
                })}
                
            </View>
            }else{
                return  <TouchableOpacity style={styles.carseatsNo}><Text style={{color:'white'}}>R</Text></TouchableOpacity>

            }
           
        })}
        </View>
        </View>
        </View>
    </View>

               
                <View style={{flexDirection:'row',width:'100%',marginTop:10,alignSelf:'center',justifyContent:'center'}}>
                    <View style={{flexDirection:'row',padding:5,backgroundColor:'#eee',borderRadius:5}}>
                        <FontAwesomeIcon icon={faCircle} color={'red'}/>
                        <Text>Reserved seat</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:5,backgroundColor:'#eee',borderRadius:5,marginHorizontal:5}}>
                    <FontAwesomeIcon icon={faCircle} color={'green'}/>
                        <Text>Your seat</Text>

                    </View>
                    <View style={{flexDirection:'row',padding:5,backgroundColor:'#eee',borderRadius:5}}>
                    <FontAwesomeIcon icon={faCircle} color={'black'}/>
                        <Text>available seat</Text>
                    </View>
                </View>
        </View>
       
        
    
    <View style={{backgroundColor:'white',borderRadius:5,marginVertical:5}}>
    {
        choosenSeat?<FlatList keyExtractor={(item,index)=>index.toString()} horizontal={true} data={choosenSeat}  renderItem={(dat,i)=>{
            
                return <View key={"view"+dat.index} style={{marginHorizontal:5,marginVertical:0,paddingHorizontal:20,paddingVertical:5,alignSelf:'center',borderRadius:5,flexDirection:'row'}}>
                <FontAwesomeIcon icon={faCouch} size={30} color={'gray'} style={{marginRight:10}}/>
                <View >
                    <Text style={{fontSize:15,fontWeight:'bold'}}> {dat.item.seatNo} </Text>
                    <Text style={{opacity:0.5,fontSize:8}}>reserved seat</Text>
                </View>

    </View>
        }}/>:<View>
            <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Select Seat</Text>
            <Text style={{fontSize:8}}>click the seat you like above</Text>
        </View>
    }
    
    </View>
    <View>
    
    <View style={{backgroundColor:'white',borderRadius:5,margin:10}}>
   
    <TouchableOpacity onPress={()=>{
                params.navigation.navigate("AddPassenger",{
                    choosenSeat:choosenSeat,
                    slotId:params.route.params.travelSlotId
                })
    }} style={{ width: '100%', alignItems: 'flex-end' }}>
      
        <View style={{ flexDirection: 'row', backgroundColor: '#0088ff10', borderRadius: 10 }}>
          <View style={{ paddingVertical: 5, alignItems: 'flex-end', paddingHorizontal: 5 }}>
            <Text style={{ fontSize: 18, color: 'blue', fontWeight: 'bold' }}>{choosenSeat?choosenSeat.length*456:0} ETB</Text>
            <Text style={{ fontSize: 8 }}>Total money to be paid</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 15, backgroundColor: 'blue', borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 20 }}> Finish</Text>
            <FontAwesomeIcon icon={faArrowRight} color={'white'} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
    
        </View>
    </ScrollView>
    
   
}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.seatInformationReducer.isLoading,
        seatInfo:state.seatInformationReducer.data,
        seatData:state.seatStructureReducer.data,
        token:state.signedInfoReducer.token,

        
    }
}
const mapDispatchToProps=(dispatch)=>{
        return {
            fetchSeatInfo:(isoading,data)=>dispatch(addSeatInformation(isoading,data))
         //   fetchAvailableCompany:(origin,dest,date)=>dispatch(addAvailableCompany(origin,dest,date)),
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(selectSeat)