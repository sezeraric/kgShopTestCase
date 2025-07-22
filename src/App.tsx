import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import AppNavigator from '@/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import CustomToast from '@/components/CustomToast';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
        <Toast config={{ custom: (props) => <CustomToast {...props} /> }} position="top" />
      </PersistGate>
    </Provider>
  );
} 