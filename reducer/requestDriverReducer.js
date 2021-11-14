import { SIGNIN,SIGNOUT,REQUESTDRIVER } from "../action/type";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
//import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState={
    isLoading:false,
    error:null,
    success:null
}


const requestDriverReducer=(state=initialState,action)=>{
    switch(action.type){
        case REQUESTDRIVER:
            return {isLoading:action.isLoading,error:action.error,success:action.success}
            default: return state;
    }
}
export default requestDriverReducer