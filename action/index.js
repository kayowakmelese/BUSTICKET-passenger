import {  CHANGELANGUAGE, CITY, ADDTRAVELDATE, ADDORIGINANDDESTINATION, AVAILABLECOMPANY, TRAVELSLOTDETAIL, ADDTRAVELSLOTID, ADDTRAVELSLOTSEATS,SIGNIN, LASTDATE, SEATSTRUCTURE, SEATDATE, PASSENGERINFORMATION, HISTORYDATA } from "./type";
import {IP,PORT} from '../ip_config'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";
axios.interceptors.request.use(
            async config=>{
                
                 const token = await AsyncStorage.getItem('token')
                 if (token) {
                    
                   config.headers.Authorization = "Bearer "+token;
                //   console.log(JSON.stringify((config)))
              
                 }else{
                     console.log("fuck toekn")
                 }
                
                return config
            }
        
    
    
)
export const setLanguage=(languageCode)=>{
    return {
        type:CHANGELANGUAGE,
        language:languageCode
    }
}
export const setCityData=(isLoading,error,success,citydata)=>{
    return {
        type:CITY,
        isLoading:isLoading,
        success:success,
        error:error,
        data:citydata
    }
}
export const setTravelDate=(travelDate)=>{
    return {
        type:ADDTRAVELDATE,
        isDraft:true,
        date:travelDate
    }
}
export const setHistoryData=(isLoading,error,success,data)=>{
    return {
        type:HISTORYDATA,
        isLoading,error,success,data
    }
}
export const setSlotId=(slotId)=>{
    return {
        isDraft:true,
        type:ADDTRAVELSLOTID,
        travelSlotId:slotId
    }
}
export const setSeatIds=(seatIds)=>{
    return {
        isDraft:true,
        type:ADDTRAVELSLOTSEATS,
        seatIds:seatIds
    }
}
export const setTravelOandD=(origin,destination)=>{
    return {
        type:ADDORIGINANDDESTINATION,
        isDraft:true,
        origin:origin,
        dest:destination
    }
}
export const setPassengerInfo=(isLoading,error,success)=>{
    return {
        type:PASSENGERINFORMATION,
        isLoading,error,success
    }
}
export const setSignIn=(isLoading,phoneNumber,isSigned,inited,token,userId)=>{
    return {
        type:SIGNIN,
        isLoading,
        isSigned,
        phoneNumber,
        inited,
        token,
        userId
    }
}
export const setLastTravelDate=(isLoading,date,error)=>{
    return {
        type:LASTDATE,
        isLoading,
        date,
        error
    }
}

export const setSeatData=(isLoading,error,success,data)=>{
    return {
        type:SEATDATE,
        isLoading,error,success,data
    }
}
export const setSeatStructure=(isLoading,error,success,data)=>{
    return {
        type:SEATSTRUCTURE,
        isLoading,error,success,data
    }
}
export const setAvailableCompany=(isLoading,error,success,data)=>{
    return {
        type:AVAILABLECOMPANY,
        isLoading,error,success,data
    }
}
export const setCompanyDetail=(isLoading,error,success,data)=>{
    return {
        type:TRAVELSLOTDETAIL,
        isLoading,error,success,data
    }
}
export const addTravelOriginAndDestination=(origin,destination)=>{
    return dispatch=>{
        dispatch(setTravelOandD(origin,destination))
        console.log("i have dispatched",origin+destination)
    }
}
export const sendPhone=(phone)=>{
    return dispatch=>{
        let params={"phoneNumber":phone}
        dispatch(setSignIn(true,phone,true))
        axios.post(`http://${IP}:${PORT}/api/v1/something`,params).then((data)=>{

        })

    }
}
export const loadHistoryData=()=>{
    return dispatch=>{
        dispatch(setHistoryData(true,null,null,null))
        axios.get(`http://${IP}:${PORT}/api/book/getCustomerBookHistory`,{}).then((data)=>{
                if(data.data){
                    console.log("this is the response",data.data)
                    dispatch(setHistoryData(false,null,null,data.data))

                }
        })

    }
}
export const addSeatInformation=(isloading,data)=>{
        return dispatch=>{
            dispatch(setSeatData(isloading,null,null,data))
        }
}
export const checkSigned=()=>{
    
    return async function(dispatch){
        dispatch(setSignIn(true,null,false,false,null,null))
        AsyncStorage.getItem("phonenumber").then((number)=>{
            console.log(number)
            number=number.toString();
            if(number.length>0){
                let dat=JSON.parse(number)
                console.log("i am hereT",number)
                dispatch(setSignIn(false,dat[0].phonenumber,true,true,dat[0].token))
            }else{
                dispatch(setSignIn(false,null,false,true))
            }
            
        }).catch((error)=>{dispatch(setSignIn(false,"nothing here",false,true));console.log("first of all","fuck you")})
    }
}
export const sendPassengerData=(travelId,passengerData)=>{
    return dispatch=>{
        dispatch(setPassengerInfo(true,null,null))
        let params={
            TravelDateSlotId:travelId,
            passanger:passengerData
        }
        console.log("params",params)
        axios.post(`http://${IP}:${PORT}/api/book/bookTicketByCustomer`,params).then((data)=>{
            if(data){
                console.log("i think its suceess");
                dispatch(setPassengerInfo(false,null,"booked successfully"))
            }else{
                console.log("ladies and gentlemen its null")
            }
        }).catch((err)=>console.log("last error",err))
    }
}
export const fetchDate=()=>{
    return dispatch=>{
        dispatch(setLastTravelDate(true,null,null))
        axios.get(`http://${IP}:${PORT}/api/travel/getLastTravelDate`,{}).then((resp)=>{
            dispatch(setLastTravelDate(false,resp.data[0].fullDate,null))

        }).catch((e)=>{console.log("eror",e);dispatch(setLastTravelDate(false,null,e))
    })
    }
}
export const setSigned=(phonenumber)=>{
        console.log("p",phonenumber)
    return async function(dispatch){
        let params={
            phoneNo:phonenumber
        }
        axios.post(`http://${IP}:${PORT}/api/auth/signUpCustomer`,params).then((dat)=>{
                console.log("respone",dat.data)
                if(dat.data){
                    axios.post(`http://${IP}:${PORT}/api/auth/getCustomerToken`,params).then((data)=>{
                        console.log("the token is",data.data)
                        dispatch(setSignIn(true,null,false))
                        AsyncStorage.setItem("phonenumber",JSON.stringify([{phonenumber:phonenumber,token:data.data.token}])).then(()=>{
                           AsyncStorage.setItem("token",data.data.token).then((d)=>{
                            dispatch(setSignIn(false,phonenumber,true,true,data.data.token,null))
                           }) 
                           //token
                       }).catch((error)=>console.log("async storage set data error",error))
                    }).catch((e)=>console.log("unfixed",e))
                }
        })
        console.log("phonenumber",phonenumber)
       
    }
}
export const addCitys=()=>{
    return dispatch=>{
        dispatch(setCityData(false,null,"data loaded successfully",[
            {
             "name":   "Addis Ababa"
            },
            {
                "name":   "Mekelle"
            },
            {
                "name":   "Gondar"
            },
            {
                "name":   "Adama"
            },
            {
                "name":    "Awassa"
            },
            {
                "name": "Bahir Dar"
            },
            {
                "name":  "Dire Dawa"
            },
            {
                "name":  "Sodo"
            },
            {
                "name":  "Dessie"
            },
            {
                "name":  "Jimma"
            },
            {
                "name":  "Jijiga"
            },
            {
                "name": "Shashamane"
            },
            {
                "name": "Bishoftu"
            },
            {
                "name":   "Arba Minch"
            },
            {
                "name":  "Hosaena"
            },
            {
                "name":  "Harar"
            },
            {
                "name":  "Dilla"
            },
            {
                "name":   "Nekemte"
            },
            {
                "name":   "Debre Birhan"
            },
            {
                "name":    "Asella"
            },
            {
                "name":  "Debre Markos"
            },
            {
                "name": "Kombolcha"
            },
            {
                "name":  "Debre Tabor"
            },
            {
                "name": "Adigrat"
            },
            {
                "name":  "Weldiya"
            },
            {
                "name":  "Sebeta"
            },
            {
                "name":   "Burayu"
            },
            {
                "name": "Shire"
            },
            {
                "name":    "Ambo"
            },
            {
                "name":  "Arsi Negele"
            },
            {
                "name": "Aksum"
            },
            {
                "name":     "Gambela"
            },
            {
                "name":   "Bale Robe"
            },
            {
                "name":  "Butajira"
            },
            {
                "name":   "Batu"
            },
            {
                "name":     "Adwa"
            },
            {
                "name":  "Areka"
            },
            {
                "name": "Yirgalem"
            },
            {
                "name":  "Waliso"
            },
            {
                "name":   "Welkite"
            },
            {
                "name":  "Gode"
            },
            {
                "name":   "Meki"
            },
            {
                "name":  "Negele Borana"
            },
            {
                "name":    "Alaba Kulito"
            },
            {
                "name":    "Alamata"
            },
            {
                "name":   "Chiro"
            },
            {
                "name":  "Tepi"
            },
            {
                "name":   "Durame"
            },
            {
                "name":   "Goba"
            },
            {
                "name":  "Assosa"
            },
            {
                "name":  "Boditi"
            },
            {
                "name":   "Gimbi"
            },
            {
                "name": "Wukro"
            },
            {
                "name": "Haramaya"
            },
            {
                "name":  "Mizan Teferi"
            },
            {
                "name":    "Sawla"
            },
            {
                "name":  "Mojo"
            },
            {
                "name":    "Dembi Dolo"
            },
            {
                "name":  "Aleta Wendo"
            },
            {
                "name":  "Metu"
            },
            {
                "name":  "Mota"
            },
            {
                "name":  "Fiche"
            },
            {
                "name": "Finote Selam"
            },
            {
                "name":  "Bule Hora"
            },
            {
                "name":   "Bonga"
            },
            {
                "name": "Kobo"
            },
            {
                "name":   "Jinka"
            },
            {
                "name": "Dangila"
            },
            {
                "name":   "Degehabur"
            },
            {
                "name":    "Dimtu"
            },
            {
                "name":  "Agaro"
            }
        ]))
    }
}
export const addAvailableCompany=(origin,destination,travelDate)=>{
    return dispatch=>{
        let params={
            startBranchName:origin,destnationBranchName:destination,date:moment(travelDate).format("YYYY-MM-DD")
        }
        console.log("whohertick",params)
        
        dispatch(setAvailableCompany(true,[],null,null))
        axios.post(`http://${IP}:${PORT}/api/travel/searchTravelByDate`,params).then((data)=>{
                    console.log("response",JSON.stringify(data.data))
                    dispatch(setAvailableCompany(false,null,null,data.data))

        }).catch((e)=>{console.log("Error",e);dispatch(setAvailableCompany(false,null,null,null))})
    }
}
export const addSeatStructure=(travelid)=>{
    return dispatch=>{
        let params={
            travelId:travelid
        }
        
        dispatch(setSeatStructure(true,null,null,null))
        axios.post(`http://${IP}:${PORT}/api/bus/getSeatStructureByTId`,params).then((data)=>{
                    console.log("===================",JSON.stringify(data.data))
                    dispatch(setSeatStructure(false,null,null,data.data))

        }).catch((e)=>{console.log("Error",e);dispatch(setSeatStructure(false,null,null,null))})
    }
}
export const addCompanyDetail=(companyId)=>{
    return dispatch=>{
        let params={companyId}
        dispatch(setCompanyDetail(false,null,"data loaded successfully",))
    }
}
export const addTravelDate=(travelDate)=>{
    return dispatch=>{
        dispatch(setTravelDate(travelDate))
    }
}
export const ChangeLanguageValue=(languagecode)=>{
    return dispatch=>{
        dispatch(setLanguage(languagecode))
    }
}
