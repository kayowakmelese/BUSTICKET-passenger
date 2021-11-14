 import { StyleSheet } from "react-native";
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal:10
    },headercontainer:{
      height:'25%',
      padding:10,
      justifyContent:'flex-end',
      alignItems:'center',

      
    },
    tabIcons:{padding:5,borderRadius:5},
    detailHeader:{
      height:300,
      padding:10,
      justifyContent:'flex-end',
      alignItems:'center',
    },
    carseats:{
      margin:2,backgroundColor:'black',padding:0,borderRadius:5,width:40,height:30,alignSelf:'center',alignContent:'center',justifyContent:'center',
     
    }
    ,
    carSeatText:{
      color:'white',textAlign:'center'
    },
    carseatsNo:{
      margin:2,backgroundColor:'white',padding:0,borderRadius:5,width:40,height:30,alignSelf:'center',alignContent:'center'
    },
    button:{
      margin:10,
      padding:15,
      borderRadius:5,
      fontSize:24,
      alignSelf:'stretch',
      backgroundColor:"#001ffd",
      fontWeight:'900'
      
    },lil:{
      fontSize:8,
      color:'#aaa',
      flexWrap:'wrap',
      width:'60%',
      fontStyle:'italic'
    },features:{
      margin:10,
      marginBottom:0,
      borderRadius:10,
      flexDirection:'row',
      justifyContent:'flex-start'
      
    }, full:{
      height:'100%',
      margin:10,
      borderRadius:10,
    }
  });
  export default styles;