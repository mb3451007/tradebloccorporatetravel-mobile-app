import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {store, persistor} from '@redux/store';
import {Provider} from 'react-redux';
import RootNavigation from './src/navigation/rootNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import {NetworkContext} from '@src/utility/netInfoContext';
import {LogBox} from 'react-native';

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    SplashScreen.hide();
    // Checking for network listener
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      return setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  // Connecting redux and saga flow..
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NetworkContext.Provider value={isConnected}>
          <RootNavigation />
        </NetworkContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default App;
