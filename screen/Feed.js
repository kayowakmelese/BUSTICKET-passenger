import { faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import styles from '../style/styles'


const Feed=(params)=>{
    return (
        <View style={styles.container}>
        <TouchableOpacity style={{padding:5,backgroundColor:'orange',borderRadius:5}}>
        <FontAwesomeIcon icon={faFire} color={'white'} size={20}/>
        </TouchableOpacity>
        
            <Text style={{fontSize:20,fontWeight:'bold'}}>Coming Soon</Text>
            <Text style={{fontSize:8,color:'gray'}}>this feature will be available on the next version</Text>
        </View>
    )
}
export default Feed;