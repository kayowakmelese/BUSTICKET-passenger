import { CHANGELANGUAGE } from "../action/type";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
import AsyncStorage from "@react-native-community/async-storage";
//import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState={
    language:'en'
}


const languageChangeReducer=(state=initialState,action)=>{
    switch(action.type){
        case CHANGELANGUAGE:
            let key='en'
            if(action.language){
                key=action.language
            }
            AsyncStorage.setItem("language",key).then().catch((error)=>console.log("my error",error))
            return {language:action.language}
            default: return state;
    }
}
export default languageChangeReducer