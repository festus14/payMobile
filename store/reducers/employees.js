import { SET_EMPLOYEES } from "../actions/actionTypes";

const initialState = {
    employees: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_EMPLOYEES:
        return {
            ...state,
            employees: action.employees
        }
    default:
        return state
    }
}

export default reducer