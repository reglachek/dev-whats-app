import { combineReducers } from 'redux'

import AuthReducer from './reducers/AuthReducer'
import ChatReducer from './reducers/ChatReducer'

const Reducers = combineReducers({
    AuthReducer,
    ChatReducer
})

export default Reducers
