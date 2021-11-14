import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { faBus, faCar, faCog, faCogs, faHistory, faNewspaper, faPaperclip, faPlane, faRss, faRssSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import styles from '../style/styles'
import chooseDate from './chooseDate'
import PhoneAuthentication from './phoneAuthentication'
import SettingsScreen from './settingsScreen'
import TravelHistory from './travelHistory'
import BookTravel from './bookTravel'
import Feed from './Feed'



const HomeScreen=({params})=>{
    const Tab=createBottomTabNavigator();
    return (
        <Tab.Navigator    initialRouteName={"Book Travel"} screenOptions={{
            tabBarStyle:{marginHorizontal:5,marginVertical:5,borderRadius:5,borderWidth:0,borderColor:'blue',borderTopColor:'blue',borderTopWidth:0,elevation:0},
            tabBarActiveTintColor: 'blue',tabBarInactiveTintColor:'#555',tabBarShowLabel:true,tabBarHideOnKeyboard:true,tabBarAllowFontScaling:true,
            tabBarLabelPosition:'below-icon'
            
          }}   >
            <Tab.Screen  name="Book Travel" component={BookTravel} options={{headerShown:false,tabBarIcon:({color,size})=>(
                <View style={[styles.tabIcons,{backgroundColor:"#eee"}]}>
 <FontAwesomeIcon icon={faCar} color={color} size={size-5.0}/>
                </View>
               
            )}}  />
            <Tab.Screen name="Booking history" component={TravelHistory} options={{headerShown:false,tabBarIcon:({color,size})=>(
                <View style={[styles.tabIcons,{backgroundColor:"#eee"}]}>
<FontAwesomeIcon icon={faCalendarCheck} color={color} size={size-5}/>
                </View>
                
            )}}/>
             <Tab.Screen name="Feed" component={Feed} options={{headerShown:false,tabBarIcon:({color,size})=>(
               <View style={[styles.tabIcons,{backgroundColor:"#eee"}]}>
                <FontAwesomeIcon icon={faRss} color={color} size={size-5}/>

               </View>
            ),tabBarBadgeStyle:{backgroundColor:'red',borderRadius:10,marginLeft:5},tabBarBadge:"3"}}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{headerShown:false,tabBarIcon:({color,size})=>(
                <View style={[styles.tabIcons,{backgroundColor:"#eee"}]}>
<FontAwesomeIcon icon={faCog} color={color} size={size-5}/>
                </View>
                
            )}}/>
        </Tab.Navigator>
    )
}
export default HomeScreen;