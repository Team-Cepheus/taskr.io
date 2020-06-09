import authReducer from './authReducer'
import { createStore, combineReducers } from 'redux';


const rootReducer = combineReducers({
    authReducer
})

export default () => {
    const store = createStore(
        
        rootReducer,
        window['__REDUX_DEVTOOLS_EXTENSION__ ']&& window['__REDUX_DEVTOOLS_EXTENSION__']()   
    );
    return store;
}