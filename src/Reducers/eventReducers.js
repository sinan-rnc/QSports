const initialState = {
    data : [],
    ServerError : [],
    isLoading : false
}

export default function eventsReducers(state = initialState, action) {
    switch (action.type) {
        case  "GET_ALL_EVENTS" : {
            return { ...state, data: action.payload.filter(ele => !ele.isDeleted) }
        }
        case "CREATE_EVENTS" : {
            return { ...state, data: [ ...state.data , action.payload ] }
        }
        case "UPDATE_EVENTS" : {
            return { ...state, data: state.data.map((ele) => {
                if(ele._id === action.payload._id) {
                    return action.payload
                } else {
                    return ele
                }
            })}
        }
        case "FEATURE_EVENT" : {
            return { ...state, data: state.data.map((ele) => {
                if(ele._id === action.payload._id) {
                    return action.payload
                } else {
                    return ele
                }
            })}
        }
        case "DELETE_EVENTS" : {
            return { ...state, data: state.data.filter((ele) => {
                return ele._id !== action.payload
            }) }
        }
        default : {
            return { ...state }
        }
    }
}