import { Alert, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyA_2X4BzU2clpSkcHanymMIhXWl5cJq-qc",
  authDomain: "chatapp-80a34.firebaseapp.com",
  projectId: "chatapp-80a34",
  storageBucket: "chatapp-80a34.appspot.com",
  messagingSenderId: "504923791811",
  appId: "1:504923791811:web:9711b2ed5e8993f16d9d76",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const App = () => {
  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
