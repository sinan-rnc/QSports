const initialState = {
    data: [],
    loading: false,
    serverErrors: [],
}

export default function quotesReducers(state = initialState, action) {
    switch(action.type) {
        case "GET_ALL_QUOTES" : {
            return { ...state, data: action.payload }
        }
        case "CREATE_QUOTE" : {
            return { ...state, data: [...state.data, action.payload] }
        }
        case "UPDATE_QUOTE" : {
            return { ...state, data: state.data.map((ele) => {
                if(ele._id === action.payload._id) {
                    return action.payload
                } else {
                    return ele
                }
            })}
        }
        case "DELETE_QUOTE" : {
            return { ...state, data : state.data.filter((ele) => {
                return ele._id !== action.payload
            })}
        }
        default : {
            return { ...state }
        }
    }
}