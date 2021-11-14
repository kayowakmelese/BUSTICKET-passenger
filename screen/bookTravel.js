import React, { useEffect, useState,useRef,useContext } from 'react'
import { Text, View, Image, TouchableOpacity,TextInput, ActivityIndicator } from 'react-native'
import styles from '../style/styles'
import CalendarStrip from 'react-native-calendar-strip'
import BottomSheet,{BottomSheetView,BottomSheetScrollView,BottomSheetModalProvider,BottomSheetModal} from '@gorhom/bottom-sheet';
import CountryList from '../screen/countryList'
import { SocketContext } from '../context/socket';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight,faArrowDown,faExchangeAlt, faMapPin, faCar, faSearch } from '@fortawesome/free-solid-svg-icons'
import strings from '../translation'
import {addTravelOriginAndDestination,fetchDate,addAvailableCompany} from '../action/index'
import { connect } from 'react-redux'
import moment from 'moment'
 BookTravel = (params) => {
      const [beginDate, setBeginDate] = useState(null)
      const [dayOfToday, setDayOfToday] = useState(null);
      const [date, setDate] = useState(null);
      const [lastDate,setLastDate]=useState(null);
      const [originAnimator,setOriginAnimator]=useState(false)
      const [destIndicator,setDestinationIndicator]=useState(false)
      const bottomSheetRef = useRef(null);
      const snapPoints = React.useMemo(() => ["25%", "90%"], []);

      const handleClosePress = () => bottomSheetRef.current.close()

      useEffect(() => {
          console.log(new Date(beginDate).toISOString())
          var today = new Date(beginDate);
          var dd = String(today.getDate()).padStart(2, '0');
          setDate(dd);
          var mm = String(today.getMonth() + 1).padStart(2, '0');
          var yyyy = today.getFullYear();
          today = mm + ' ' + dd + ' ' + yyyy;
          console.log("thisdateis", today);
          setDayOfToday(today)
      }, [beginDate])
        const exchangeLocations=()=>{
        let originCopy=params.origin;
        params.addOandD(params.destination,params.origin)
}
        let markedDate=[
          {
            date:moment(),
            dots:[
              {
                color:'orange',
                selectedColor:'white'
              }
            ]
          }
        ]
        useEffect(()=>{
        params.fetchDate()
        setBeginDate(moment())
        },[])
        useEffect(()=>{
          if(params.lastDate){
            console.log("lastdate",params.lastDate)
            let moments=moment(params.lastDate)
            console.log("moment",moments)
            setLastDate(moments)
          }
        },[params.lastDate])
        let datesWhitelist = [{
          start: moment(),
          end: moment().add(7, 'days')  
        }];
        useEffect(()=>{
         // const socket=useContext(SocketContext)
          console.log("begin date is changing",beginDate)

        },[beginDate])
  return (
    <View style={[styles.container]}>
        <View style={{ color: 'white', alignItems: 'center', borderRadius: 10, backgroundColor: 'orange', transform: [{ rotate: "-5deg" }] }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, padding: 10, backgroundColor: 'black', borderRadius: 5 }}>{new Date(beginDate).toGMTString().substring(8,11)}</Text>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', padding: 10, backgroundColor: 'orange', borderRadius: 5 }}>{date}</Text>
      </View>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{strings.booktravel}</Text>
            <Text style={{fontSize:10,color:'gray'}}>{strings.sforavailable}</Text>
        <Text style={{textAlign:'center',borderRadius:5,fontSize:10,padding:5,marginTop:10,fontWeight:'bold',backgroundColor:'#eee',color:'black'}}>{strings.todaysdate} {new Date().toDateString()}</Text>
      {
        params.isDateLoading?<ActivityIndicator size={'small'} color={'blue'} style={{width:'100%',justifyContent:'center'}}/>:<CalendarStrip maxDate={lastDate} datesWhitelist={datesWhitelist}  startingDate={new Date().toISOString()}  markedDates={markedDate 
      }  onDateSelected={(D) => { console.log(D);setBeginDate(D.toString()) }}
      minDate={moment()}
        daySelectionAnimation={{ type: 'background', highlightColor: 'blue', color: 'white' }}
        Type={'sequenced'} borderWidth={10} borderHighlightColor={'blue'} scrollable={true}
        selectedDate={beginDate}
        highlightDateNumberStyle={{ color: 'white' }}  highlightDateNameStyle={{ color: 'white' }}
        dateNumberStyle={{ color: 'black' }}
        dateNameStyle={{ color: 'black', fontSize: 10 }}

         style={{ width: '100%', height: 100, marginTop: 20,borderRadius:5 }} />
      }
      
    <View style={{borderRadius:5,marginTop:5,width:'100%'}}>
    <View style={{width:'100%',flexDirection:'row',marginBottom:'10%',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>{setOriginAnimator(true);params.addOandD(null,params.destination);bottomSheetRef.current?.present()}} style={{padding:10,alignItems:'center',backgroundColor:params.origin?'green':'gray',width:'40%',borderRadius:10}}>
                    
                    {originAnimator &&!params.origin?<ActivityIndicator size={'small'} color={'white'} animating={originAnimator} style={{alignSelf:'center'}}/>:<Text style={{fontWeight:'bold',color:'white',fontSize:20}}>{strings.origin}</Text>}
                    
                    <Text style={{fontSize:10,color:'white'}}>{params.origin?params.origin:strings.selecto}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>exchangeLocations()}>
                <FontAwesomeIcon icon={faExchangeAlt} color={'gray'} style={{marginTop:20,marginHorizontal:20}}/>
               </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setDestinationIndicator(true);params.addOandD(params.origin,null);bottomSheetRef.current?.present()}}  style={{padding:10,alignItems:'center',backgroundColor:params.destination?'black':'gray',width:'40%',borderRadius:10}}>
                {destIndicator &&!params.destination?<ActivityIndicator size={'small'} color={'white'} animating={originAnimator} style={{alignSelf:'center'}}/>:<Text style={{fontWeight:'bold',color:'white',fontSize:20}}>{strings.dest}</Text>}
                    <Text style={{fontSize:10,color:'white'}}>{params.destination?params.destination:strings.selectd}</Text>
                </TouchableOpacity>
            </View>
    <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end'}} onPress={()=>{params.searchBuses(params.origin,params.destination,beginDate);params.navigation.navigate('PickBus')}}>
        <View style={{ flexDirection: 'row', backgroundColor: '#0088ff10', borderRadius: 10,borderTopEndRadius:30,borderBottomEndRadius:30 }}>
          <View style={{ paddingVertical: 5, alignItems: 'flex-end', paddingHorizontal: 5 }}>
            <Text style={{ fontSize: 18, color: 'blue', fontWeight: 'bold' }}>{dayOfToday}</Text>
            <Text style={{ fontSize: 8 }}>{strings.tdatechoosen}</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 15, backgroundColor: 'blue', borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 20 }}> {strings.continue}</Text>
            <FontAwesomeIcon icon={faArrowRight} color={'white'} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
   
    <BottomSheetModalProvider>
    <BottomSheetModal ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
    <BottomSheetScrollView>
    <CountryList closer={bottomSheetRef.current?.close()}/>
    </BottomSheetScrollView>
  
    </BottomSheetModal>
    </BottomSheetModalProvider>
    </View>
    

  )
}
const mapStateToProps=(state)=>{
  return {
      origin:state.travelOrderReducer.origin,
        destination:state.travelOrderReducer.dest,
        isDateLoading:state.lastTravelDateReducer.isLoading,
        lastDate:state.lastTravelDateReducer.date
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    addOandD:(origin,dest)=>dispatch(addTravelOriginAndDestination(origin,dest)),
    fetchDate:()=>dispatch(fetchDate()),
    searchBuses:(origin,dest,d)=>dispatch(addAvailableCompany(origin,dest,d))

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BookTravel)