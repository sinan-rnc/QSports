import axios from "axios";

export const startGetAllClubsAndBars = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://103.134.237.3:3001/v1/club/read-all-clubs",{} ,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data.results)
            dispatch(setClubsAndBars(response.data.data.results))
        } catch(err) {
            console.log(err);
            alert(err.message)
        }
    }
}

const setClubsAndBars = (clubAndBars) => {
    return {
        type: "GET_ALL_CLUBS_AND_BARS",
        payload: clubAndBars
    }
}

// export const startGetClub = (userID) => {
//     console.log(userID)
//     return async (dispatch) => {
//         try {
//             const response = await axios.get("http://103.134.237.3:3001/v1/club/read-club", {
//                 headers: {
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`
//                 }
//             }, {
//                 data : {
//                     _id : userID
//                 }
//             })
//             // console.log(userID)
//             console.log(response)
//             dispatch(getClub(response.data.data.results))
//         } catch(err) {
//             console.log(err)
//             alert(err.message)
//         }
//     }
// }

// const getClub = (profile) => {
//     return {
//         type : "GET_CLUB_PROFILE",
//         payload : profile
//     }
// }

export const startCreateClub = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put("http://103.134.237.3:3001/v1/club/create-club", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            dispatch(createClub(response.data.data.results))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const createClub = (club) => {
    return {
        type : "CREATE_CLUB",
        payload : club
    }
}

export const startUpdateClub = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put("http://103.134.237.3:3001/v1/club/update-club", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            dispatch(updateClub(response.data.data.results))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const updateClub = (club) => {
    return {
        type : "UPDATE_CLUB",
        payload : club
    }
}

export const startDeleteClub = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch("http://103.134.237.3:3001/v1/club/delete-club", { _id : formData._id}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            dispatch(deleteClub(formData._id))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const deleteClub = (clubID) => {
    return {
        type : "DELETE_CLUB",
        payload : clubID
    }
}