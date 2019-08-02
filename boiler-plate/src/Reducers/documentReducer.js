'use strict'
import {GET_DOCS, ADD_DOC, DELETE_DOC, UPDATE_DOC} from '../Actions/types';

///going to eventually map this to component properties for use
const initialState = {
    documents: [
        ///static docs that would be returned by api
        {id: '7465434', type: 'word', purpose:'functionality_update', complete: false},
        {id: '3647484', type: 'pdf', purpose:'template_creation', complete: true},
        {id: '9803736', type: 'pdf', purpose:'proposal_agreement', complete: true},
        {id: '5647328', type: 'excel', purpose:'proposal_update', complete: false},
        {id: '2565657', type: 'csv', purpose:'database_entry', complete: false},
        {id: '8838474', type: 'text', purpose:'database_entry', complete: true}
    ]
};

///functions takes state, which we set to our initial state,
///and it takes an action, which will have a type attacted to it
export default function(state = initialState, action) {

    switch(action.type) {
        case GET_DOCS:
            return {...state}; ///spread operator to go from 0th to nth
        default:
            return state;
    }
}