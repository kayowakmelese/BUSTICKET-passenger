import { HISTORYDATA } from "../action/type";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
//import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState={
    isLoading:false,
    error:null,
    success:null,
    data:null
}


const historyDataReducer=(state=initialState,action)=>{
    switch(action.type){
        case HISTORYDATA:
            return {isLoading:action.isLoading,error:action.error,success:action.success,data:action.data}
            default: return state;
    }
}
export default historyDataReducer