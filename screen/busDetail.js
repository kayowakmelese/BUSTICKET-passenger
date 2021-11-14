import * as React from 'react'
import {View,Text,Image, Button, TouchableOpacity,ScrollView,SafeAreaView, Dimensions} from 'react-native'
import styles from '../style/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle, faDollarSign, faDotCircle,faArrowRight, faChair } from '@fortawesome/free-solid-svg-icons'
import strings from '../translation'
import { connect } from 'react-redux'
import { addSeatStructure } from '../action'
const busDetail=(props)=>{
    const [detailData,setDetailData]=React.useState(null);
    React.useEffect(()=>{
            if(!detailData){
                console.log("props",props.route.params.itemData)
                setDetailData(props.route.params.itemData)
            }
    },[])
   var height=Dimensions.get('window').height
    return <SafeAreaView style={{flex:1,backgroundColor:'white'}} >
        <ScrollView >
        <View >
        <View>
            <View style={styles.hero3Container}>
                <Text style={{fontSize:60,opacity:0.05,position:'absolute',alignItems:'center',alignSelf:'center',bottom:'5%',color:'blue'}}>{props.route.params.name}</Text>
                <Image  source={ require('../assets/bus1.png')} style={[styles.detailHero,{width:'100%',height:200,marginTop:20}]} scaleType={'center'}/>
                {/* <View style={styles.availableCOntainer}>
                    <Text style={styles.headerwhite}>250 ETB</Text>
                        <Text style={{color:"#fff",fontSize:10}} >25 seats available now</Text>
                </View> */}
            </View>
           
    <View style={styles.full}>
    <View>
    <View>
    <Text style={{width:'100%',color:'blue',fontSize:32,fontWeight:'bold'}}>{props.route.params.name}</Text>
    <Text style={{width:'100%',color:'black',fontSize:10,fontWeight:'100'}}>Lorem ipsum dolor sit amet connecticut Lorem ipsum dolor sit amet connecticutLorem ipsum dolor sit amet connecticutLorem ipsum dolor sit amet connecticutLorem ipsum dolor sit amet connecticutLorem ipsum dolor sit amet connecticut</Text>
                
    </View>
    </View>
    <View >

    <View style={{flexDirection:'row',width:'100%'}}>         
                              <View style={{flexDirection:'row',marginVertical:1,backgroundColor:'blue',padding:5,borderRadius:5}}>
                        <FontAwesomeIcon icon={faDollarSign} color={'white'} size={25}/>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>{props.route.params.price} ETB</Text>
                    </View>
                    </View>
                    </View>
    <View style={{backgroundColor:'white'}}>
    <View style={{marginLeft:50,borderLeftWidth:2,borderLeftColor:'black'}}>
    
    {/* {detailData?
        detailData.map((dat,i)=>{
            return  <View style={styles.features} key={i}>
        <FontAwesomeIcon icon={faCircle} color={'black'} style={{position:'absolute',left:-18}}/>
        <View style={{marginLeft:15}}>
            <Text>{dat.service}</Text>
            <Text style={styles.lil}>whats up everyone its me keishakur i was not supposed to tell you this but imma copy what i have wrote then paste it</Text>
        </View>
    </View>
        }):null
    } */}
   
   
    </View>
    
    <View style={{alignItems:'flex-end',marginTop:20}}>
    {detailData?detailData.TravelDateSlots.map((dat,i)=>{
      console.log("solof",dat)
          return <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end' }} onPress={() => {props.fetchStructure(dat.Travel.id);props.navigation.navigate('SelectSeat',{
            busName:props.route.params.name,
            travelSlotId:dat.id
          }) }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#0088ff10', borderRadius: 10 }}>
          <View style={{ paddingVertical: 5, alignItems: 'flex-end', paddingHorizontal: 5 }}>
            <Text style={{ fontSize: 18, color: 'blue', fontWeight: 'bold' }}>{dat.Travel.startTime}</Text>
            <Text style={{ fontSize: 8 }}>{dat.Travel.timeSection} travel</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 15, backgroundColor: 'blue', borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 20 }}> {strings.continue}</Text>
            <FontAwesomeIcon icon={faArrowRight} color={'white'} />
          </View>
        </View>
      </TouchableOpacity>
    }):null}
 
   
</View>
                </View>
   
    </View>
    </View>
    </View>
        </ScrollView>
    </SafeAreaView>
    
   
}
const mapStateToProps=(state)=>{
  return {
      isLoading:state.seatStructureReducer.isLoading
      
  }
}
const mapDispatchToProps=(dispatch)=>{
      return {
          fetchStructure:(travelid)=>dispatch(addSeatStructure(travelid))
      }
}
export default connect(mapStateToProps,mapDispatchToProps)(busDetail)