'use strict'

///this 'rootReducer' is here primarily to combine all our other reducers
import {combineReducers} from 'redux';
import documentReducer from './documentReducer';
//import authReducer from './authReducer';

///how reducers are mapped to props, i.e this.props.document or this.props.auth
export default combineReducers({
    document: documentReducer
    //auth: authReducer
})