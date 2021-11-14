import LocalizedStrings from "react-native-localization";
import english from './languages/en'
import oromic from './languages/or'
import amharic from './languages/amh'
import tigrayan from './languages/tig'
import AsyncStorage from "@react-native-community/async-storage";

const strings=new LocalizedStrings({
    en:english,
    oro:oromic,
    amh:amharic,
    tig:tigrayan
})
export const changeLanguage =(languagekey)=>{
    strings.setLanguage(languagekey)

}

export default  strings;