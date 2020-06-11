import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { Provider } from 'react-redux'
import globalStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './components/Loading';


const { store, persistor} = globalStore();
store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
