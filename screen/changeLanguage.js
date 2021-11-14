
import React,{useEffect,useState} from 'react'
import {Text,View,Image,TouchableOpacity,TextInput} from 'react-native'
import styles from '../style/styles'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faArrowRight, faLanguage, faSadCry, faSadTear, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import {changeLanguage} from '../translation/index'
import { connect } from 'react-redux'
import {ChangeLanguageValue} from '../action/index'
const ChangeLanguage=(params)=>{
    const [langData,setLangData]=useState([{name:"Amharic",actualname:"እማርኛ",langCode:"amh"}
,{name:"Oromic",actualname:"Oromiffa",langCode:"oro"},
{name:"English",actualname:"English",langCode:"en"}
])
   useEffect(()=>{
       console.log(params.language)
       if(params.language){
        changeLanguage(params.language)
       }
    
   
   },[params.language])
    return (
        <View style={[styles.container,{paddingTop:200,backgroundColor:'#eee'}]}>
       <View style={{backgroundColor:'#333',padding:10,borderRadius:5}}>
            <FontAwesomeIcon icon={faLanguage} color={'white'} size={30} />
       </View>
        <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Language</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:10,color:'gray'}}>Change the aplication language</Text>
        </View>
        <View style={{ paddingHorizontal: 0,width:'100%' }}>
              
                {
                    langData.length>0?
                    <FlatList keyExtractor={(item,index)=>index.toString()} data={langData} style={{height:500}}
                        renderItem={(dat,i)=>{
                            return (
                                <TouchableOpacity onPress={()=>{params.changeLang(dat.item.langCode); params.navigation.goBack()}} style={{backgroundColor:'white',padding:10,marginVertical:3,borderRadius:5,flexDirection:'row'}}  key={dat.index+"io"}>
                            <FontAwesomeIcon icon={faLanguage} color={'blue'} size={30} style={{marginVertical:5,marginHorizontal:5}}/>
                             <View><Text style={{fontWeight:'bold',fontSize:18}}>{dat.item.actualname}</Text>
                             <Text style={{fontSize:10,color:'#555'}}>{dat.item.name}</Text>
                             </View>
                              </TouchableOpacity>
                           )
                        }}

                    />:
                    <View style={{padding:20,alignItems:'center'}}>
                        <FontAwesomeIcon icon={faSadTear} color={'blue'} size={50}/>
                        <Text style={{fontWeight:'bold',fontSize:24}}>No Bus Found</Text>
                        <Text style={{fontSize:8,color:'gray'}}>we tried our best but we failed said elon musk</Text>
                    </View>
                }
                </View>
        </View>
        
    )
}
const mapStateToProps=(state)=>{
    return {
        language:state.languageChangeReducer.language
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        changeLang:(langcode)=>dispatch(ChangeLanguageValue(langcode))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChangeLanguage)