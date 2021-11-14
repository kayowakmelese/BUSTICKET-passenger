import { SEATDATE } from "../action/type";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
//import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState={
    isLoading:false,
    success:null,
    error:null,
    data:[]
}


const seatInformationReducer=(state=initialState,action)=>{
    switch(action.type){
        case SEATDATE:
            return {isLoading:action.isLoading,success:action.success,error:action.error,data:action.data}
            default: return state;
    }
}
export default seatInformationReducer