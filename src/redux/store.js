import authReducer from './authReducer';
import userReducer from './userReducer';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    authReducer,
    userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export default () => {
    const store = createStore(
        persistedReducer,
        window['__REDUX_DEVTOOLS_EXTENSION__ '] && window['__REDUX_DEVTOOLS_EXTENSION__']()
    );
    let persistor = persistStore(store);

    return { store, persistor };
}