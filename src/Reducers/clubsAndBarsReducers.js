const initialState = {
    data: [],
    loading: false,
    serverErrors: [],
}

export default function clubsAndBarsReducers(state = initialState, action) {
    switch (action.type) {
        case "GET_ALL_CLUBS_AND_BARS": {
            return { ...state, data: action.payload.filter(ele => !ele.isDeleted) }
        }
        case "SEARCH_CLUBS_AND_BARS": {
            return { ...state, data: action.payload.filter(ele => !ele.isDeleted) }
        }
        case "CREATE_CLUB" : {
            return { ...state, data: [...state.data, action.payload] }
        }
        case "UPDATE_CLUB" : {
            return { ...state, data: state.data.map((ele) => {
                if(ele._id === action.payload._id) {
                    return action.payload
                } else {
                    return ele
                }
            }) }
        }
        case "DELETE_CLUB" : {
            return { ...state, data: state.data.filter((ele) => {
                return ele._id !== action.payload
            })}
        }
        default : {
            return { ...state }
        }
    }
}