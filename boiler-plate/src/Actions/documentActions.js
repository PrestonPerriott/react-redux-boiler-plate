'use strict'
import {GET_DOCS, ADD_DOC, DELETE_DOC, UPDATE_DOC} from './types';

///This is going to handle the specific call to our backend that will eventually handle the documents

export function getDocs() {
    ///returning GET_DOCS to the reducer
    ///this will go into the reducer and check the switch statement for the specific action type,
    ///this being the action.type
    return {
        type: GET_DOCS
    };
}