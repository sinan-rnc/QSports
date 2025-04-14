const initialState = {
    data: [],
    loading: false,
    serverError: []
}

export default function userReducers(state = initialState, action) {
    switch(action.type) {
        case  "GET_ALL_USERS" : {
            return { ...state, data: action.payload.filter(ele => !ele.isDeleted) }
        }
        case "CREATE_USER" : {
            return { ...state, data: [ ...state.data , action.payload ] }
        }
        case "UPDATE_USER" : {
            return { ...state, data: state.data.map((ele) => {
                if(ele._id === action.payload._id) {
                    return action.payload
                } else {
                    return ele
                }
            })}
        }
        case "DELETE_USER" : {
            return { ...state, data: state.data.filter((ele) => {
                return ele._id !== action.payload
            }) }
        }
        default : {
            return { ...state }
        }
    }
}