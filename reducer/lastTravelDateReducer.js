import { CHANGELANGUAGE,LASTDATE } from "../action/type";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
import AsyncStorage from "@react-native-community/async-storage";
//import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState={
    isLoading:false,
    date:null,
    error:null
}


const lastTravelDateReducer=(state=initialState,action)=>{
    switch(action.type){
        case LASTDATE:
            return {
                isLoading:action.isLoading,
                date:action.date,
                error:action.error
            }
            default: return state;
    }
}
export default lastTravelDateReducer