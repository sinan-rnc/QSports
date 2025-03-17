const initialState = {
    data: [],
    loading: false,
    serverErrors: [],
}

export default function clubApprovalListReducers(state = initialState, action) {
    switch (action.type) {
        case "GET_CLUB_APPROVAL_LIST": {
            return { ...state, data: action.payload.filter(ele => !ele.isDeleted) }
        }
        case "APPROVE_CLUB" : {
            return { ...state, data: state.data.map((ele) => {
                if(ele._id === action.payload._id) {
                    return action.payload
                } else {
                    return ele
                }
            }) }
        }
        default : {
            return { ...state }
        }
    }
}