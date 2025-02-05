import axios from "axios";
import { backendApi } from "../Apis/api";
import { useAuth } from "../Context/AuthContext";

export const startGetAllClubsAndBars = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/club/read-all-clubs`, {} ,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data.results)
            dispatch(setClubsAndBars(response.data.data.results))
        } catch(err) {
            console.log(err);
            alert(err.response.data.message)
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
//             const response = await axios.get(`${backendApi}/club/read-club`, {
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

export const startCreateClub = (formData, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/club/create-club`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setAlertMessage("Club Profile Created Successfully")
            setAlertMessageColor("green")
            console.log(response)
            dispatch(createClub(response.data.data.results))
        } catch(err) {
            console.log(err)
            console.log(err.response.data.message)
            alert(err.response.data.message)
            setAlertMessage(err.response.data.message)
            setAlertMessageColor("red")
        }
    }
}

const createClub = (club) => {
    return {
        type : "CREATE_CLUB",
        payload : club
    }
}

export const startUpdateClub = (formData, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${backendApi}/club/update-club`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            dispatch(updateClub(response.data.data))
            setAlertMessage("Club Profile Updated Successfully")
            setAlertMessageColor("green")
        } catch(err) {
            console.log(err)
            setAlertMessage(err.response.data.message)
            setAlertMessageColor("red")
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
            const response = await axios.patch(`${backendApi}/club/delete-club`, { _id : formData._id}, {
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