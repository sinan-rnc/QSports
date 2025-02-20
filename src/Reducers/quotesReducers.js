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
        default : {
            return { ...state }
        }
    }
}