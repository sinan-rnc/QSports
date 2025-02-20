const initialState = {
    data: [],
    serverError: [],
    isLoading: false
}

export default function profileReducers(state = initialState, action) {
    switch (action.type) {
        case "GET_ALL_PROFILE" : {
            return { ...state, data: action.payload.filter(ele => !ele.isDeleted) }
        }
        case "CREATE_PROFILE" : {
            return { ...state, data: [ ...state.data , action.payload ] }
        }
        case "UPDATE_PROFILE" : {
            return { ...state, data: [ ...state.data.map((ele) => {
                if(ele._id === action.payload._id) {
                    return action.payload
                } else {
                    return ele
                }
            })] }
        }
        case "DELETE_PROFILE" : {
            return { ...state, data : state.data.filter((ele) => {
                return ele._id !== action.payload
            })}
        }
        default : {
            return { ...state }
        }

    }
}