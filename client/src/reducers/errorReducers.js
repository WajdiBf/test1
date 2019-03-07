import {GET_ERRORS} from '../action/types'
const initialeState = {}


export default function(state = initialeState,action) {
switch(action.type)
{
    case GET_ERRORS:
         return action.payload;
    default:
         return state; 
}
}