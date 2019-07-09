import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './reducers/ui'
import authReducer from './reducers/auth'
import userReducer from './reducers/user'

// This combines the reducers into one root reducer
const rootReducer = combineReducers({
    ui: uiReducer,
    user: userReducer,
    auth: authReducer
})

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}

export default configStore