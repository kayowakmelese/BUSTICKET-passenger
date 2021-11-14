 import { ADDORIGINANDDESTINATION, ADDTRAVELDATE, ADDTRAVELSLOTID, NEWTRAVEL,ADDTRAVELSLOTSEATS } from "../action/type";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
//import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState={
    isDraft:false,
    travelSlotId:null,
    date:null,
    origin:null,
    dest:null,
    seatIds:null
    
}


const travelOrderReducer=(state=initialState,action)=>{
    switch(action.type){
        case NEWTRAVEL:
            return {
                isDraft:action.isDraft,
                travelSlotId:action.travelSlotId,
                date:action.date,
                origin:action.origin,
                dest:action.dest,
                seatIds:action.seatIds
            }
            case ADDTRAVELDATE:
                return {
                    isDraft:action.isDraft,
                    date:action.date
                }
                case ADDORIGINANDDESTINATION:
                    console.log("i was here")
                    return {
                        
                        isDraft:action.isDraft,
                        origin:action.origin,
                        dest:action.dest
                    }
                case ADDTRAVELSLOTID:
                    return {                
                        isDraft:action.isDraft,
                        travelSlotId:action.travelSlotId
                    }
                    case ADDTRAVELSLOTSEATS:
                        return {
                            isDraft:action.isDraft,
                            seatIds:action.seatIds
                        }
            default: return state;
    }
}
export default travelOrderReducer