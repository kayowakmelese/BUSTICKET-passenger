import { combineReducers } from "redux";

import requestDriverReducer from './requestDriverReducer'
import languageChangeReducer from './languageInfoReducer'
import cityListReducer from './cityListReducer'
import travelOrderReducer from './travelOrderReducer'
import availableCompanyReducer from "./availableCompanyReducer"
import companyDetailReducer from "./companyDetailReducer"
import signedInfoReducer from './signedInfoReducer'
import lastTravelDateReducer from './lastTravelDateReducer'
import seatStructureReducer from "./seatStructureReducer";
import seatInformationReducer from './seatIformationReducer'
import passengerInformationReducer from './passengerInformationReducer'
import historyDataReducer from './historyDataReducer'
const rootReducer=combineReducers({
    languageChangeReducer,
    cityListReducer,
    travelOrderReducer,
    availableCompanyReducer,
    companyDetailReducer,
    signedInfoReducer,
    lastTravelDateReducer,
    seatStructureReducer,
    seatInformationReducer,
    passengerInformationReducer,
    historyDataReducer
})

export default rootReducer