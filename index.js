import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import MainApp from "./mainreducer"


// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
//AppRegistry.registerComponent("main",()=>MainApp)
registerRootComponent(MainApp);
