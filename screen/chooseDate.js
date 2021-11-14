import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import styles from '../style/styles'
import CalendarStrip from 'react-native-calendar-strip'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import strings from '../translation'
import { connect } from 'react-redux'
ChooseDate = (params) => {
  const [beginDate, setBeginDate] = useState(new Date().toISOString())
  const [dayOfToday, setDayOfToday] = useState(null);
  const [date, setDate] = useState(null);
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
  return (
    <View style={styles.container}>
      <View style={{ color: 'white', alignItems: 'center', borderRadius: 10, backgroundColor: 'orange', transform: [{ rotate: "-5deg" }] }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, padding: 10, backgroundColor: 'black', borderRadius: 5 }}>JAN</Text>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', padding: 10, backgroundColor: 'orange', borderRadius: 5 }}>{date}</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{strings.ctraveldate}</Text>
      <CalendarStrip onDateSelected={(D) => { setBeginDate(D.toString()) }}
        daySelectionAnimation={{ type: 'background', highlightColor: 'blue', color: 'white' }}
        Type={'sequenced'} borderWidth={10} borderHighlightColor={'blue'} scrollable={true}
        highlightDateNumberStyle={{ color: 'white' }} styleWeekend={true} highlightDateNameStyle={{ color: 'white' }}
        dateNumberStyle={{ color: 'black' }}
        dateNameStyle={{ color: 'black', fontSize: 10 }}
         minDate={new Date(beginDate).toISOString()} style={{ width: '100%', height: 100, marginTop: 20 }} />
      <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end' }} onPress={() => { params.navigation.navigate('PickDest') }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#0088ff10', borderRadius: 10 }}>
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

  )
}
const mapStateToProps=(state)=>{
  return {
      
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
      
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChooseDate)