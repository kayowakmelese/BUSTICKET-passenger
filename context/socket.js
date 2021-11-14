import socketIOClient from "socket.io-client";
import React from 'react'
import {IP,PORT} from '../ip_config.js'
export const socket = socketIOClient(`http://${IP}:${PORT}`,{
    reconnectionDelayMax: 100000,
  });
export const SocketContext = React.createContext();