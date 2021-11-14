
 import axios from "axios"
 import { Provider } from 'react-redux';
 import { createStore, applyMiddleware } from "redux"
 import thunk from "redux-thunk"
 import Toast from 'react-native-toast-message';
 import {View } from "react-native"
 import AllReducer  from "./reducer/index"
 import App from "./App"
 import React from "react";
  import { useContext } from "react";
import { SocketContext,socket } from "./context/socket";
 
 // or ES6+ destructured imports
  
  
 const store = createStore(AllReducer,
     applyMiddleware(thunk),
     // other store enhancers if any
   );
 export default class Apps extends React.PureComponent {
   constructor() {
     super();
     this.state = {
       location: null
     };
   }

   componentDidMount=()=>{
       
   }
 
 
 
   render() {
     return (
     
      
     <Provider store={store}  >
     <SocketContext.Provider value={socket}>
      <View style={{flex: 1}}>
          <App/>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
       </SocketContext.Provider>
  </Provider>
 
     );
   }
 } 
 