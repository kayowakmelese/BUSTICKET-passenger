import * as React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import styles from '../style/styles'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import BottomSheet,{BottomSheetView,BottomSheetScrollView,BottomSheetModalProvider,BottomSheetModal} from '@gorhom/bottom-sheet';
import PaymentMethod from '../screen/paymentMethod'
import {sendPassengerData} from '../action/index'

const PassengerInfo=(params)=>{
    const [passenger,setPassengerData]=React.useState(null)
    const [passengerInfo,setPassengerInfo]=React.useState([]);
    const [destIndicator,setDestinationIndicator]=React.useState(false)
      const bottomSheetRef = React.useRef(null);
      const [slotId,setSlotId]=React.useState(null)
      const snapPoints = React.useMemo(() => ["25%", "50%"], []);

  const handleClosePress = () => bottomSheetRef.current.close()
   
    React.useEffect(() => {
      setPassengerData(params.route.params.choosenSeat)
      setSlotId(params.route.params.slotId)
      
    //  bottomSheetRef.current.close()
    }, [])
    React.useState(()=>{
      if(params.route.params.choosenSeat){
        let xx=[];
        console.log("yes passenger",params.route.params.choosenSeat)
        params.route.params.choosenSeat.map((dat,o)=>{
          console.log(dat)
          xx[o]={id:dat.seatId,name:null,phoneNo:null}
        })
        console.log("this is xx",xx)
        setPassengerInfo(xx);
      }else{
        console.log("no passenger",params.route.params.choosenSeat)
      }
    },[])
    return (
        <ScrollView style={[{backgroundColor:'#eee',padding:10,height:'100%'}]}>
        <TouchableOpacity disabled={true} style={{backgroundColor:'blue',width:40,padding:10,borderRadius:5,marginTop:100}}>
        <FontAwesomeIcon icon={faUser} color={'white'} size={20}/>
        </TouchableOpacity>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Add Passenger Info</Text>
            <Text style={{fontSize:8}}>something to add passenger info</Text>
            {passenger?<FlatList scrollEnabled={false}  data={passenger} renderItem={(dat,i)=>{
              console.log("dat index",passengerInfo)
              let myData={};
              let pass=passengerInfo;
                return <View style={{flexDirection:'row',width:'100%',borderRadius:5,padding:10,marginTop:10,justifyContent:'center'}}>
            <TouchableOpacity disabled={true} style={{backgroundColor:'gray',height:50,padding:5,borderRadius:5,alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:'bold',color:'white'}}>{dat.item.seatNo}</Text>
                <Text style={{fontSize:10,color:'white',fontWeight:'bold',opacity:0.8}}>SEAT NO</Text>
        </TouchableOpacity>
        <View style={{paddingHorizontal:5,width:'80%',marginBottom:5}}>
            <TextInput onChangeText={(e)=>{myData.name=e;pass[dat.index].name=e;setPassengerInfo(pass);console.log(passengerInfo)}} placeholder={`passenger ${dat.index+1} name`} style={{backgroundColor:'white',padding:10,borderWidth:0,borderRadius:3,borderColor:'blue',width:'100%',fontSize:10}}/>
            <TextInput onChangeText={(e)=>{myData.number=e;pass[dat.index].phoneNo=e;setPassengerInfo(pass);console.log(passengerInfo)}} placeholder={'phone number'} keyboardType={'decimal-pad'} style={{backgroundColor:'white',padding:10,borderWidth:0,borderRadius:3,borderColor:'blue',width:'100%',marginTop:4,fontSize:10}}/>
        </View>
        
            </View>
            }}/>:null}
            
           
           <View style={{borderRadius:5,margin:10,width:'95%'}}>
   
   <TouchableOpacity onPress={()=>{
     params.sendData(slotId,passengerInfo)
    params.navigation.navigate('PaymentOption')
               //
   }} style={{ width: '100%', alignItems: 'flex-end',marginBottom:20 }}>
     
       <View style={{ flexDirection: 'row', backgroundColor: '#0088ff10', borderRadius: 10 }}>
         <View style={{ paddingVertical: 5, alignItems: 'flex-end', paddingHorizontal: 5 }}>
           <Text style={{ fontSize: 18, color: 'blue', fontWeight: 'bold' }}>{50} ETB</Text>
           <Text style={{ fontSize: 8 }}>Total money to be paid</Text>
         </View>
         <View style={{ flexDirection: 'row', padding: 15, backgroundColor: 'blue', borderRadius: 10 }}>
           <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 20 }}> Finish</Text>
           <FontAwesomeIcon icon={faArrowRight} color={'white'} />
         </View>
       </View>
     </TouchableOpacity>
   </View>
   
        </ScrollView>
    )
}
const mapDispatchToProps=(dispatch)=>{
    return {
      sendData:(id,passengerdata)=>dispatch(sendPassengerData(id,passengerdata))
    }
}
const mapStateToProps=(state)=>{
return {

}
}
export default connect(mapStateToProps,mapDispatchToProps)(PassengerInfo)