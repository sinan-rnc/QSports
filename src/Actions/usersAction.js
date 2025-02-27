import axios from "axios"
import { backendApi } from "../Apis/api"

export const startGetAllUsers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/users/read-all-users`, { limit: 100, page: 1 }, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data.data.results)
            dispatch(setAllUsers(response.data.data.results))
        } catch(err) {
            // console.log(err)
            // alert(err.message)
        }
    }
}

const setAllUsers = (allUsers) => {
    return {
        type : "GET_ALL_USERS",
        payload : allUsers
    }
}

export const startUpdateUser = (formData, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            // console.log(formData)
            const response = await axios.put(`${backendApi}/users/update-user`, formData, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data.data)
            dispatch(updateUser(response.data.data))
            setAlertMessage("User Details Updated Successfully")
            setAlertMessageColor("green")
        } catch(err) {
            // console.log(err)
            // alert(err.message)
            setAlertMessage("Unable to Update User Details")
            setAlertMessageColor("red")
        }
    }
}

const updateUser = (user) => {
    return {
        type : "UPDATE_USER",
        payload : user
    }
}

export const startDeleteUser = (UserID, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`${backendApi}/users/delete-user`, { _id: UserID}, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data.data)
            dispatch(deleteUser(UserID))
            setAlertMessage("User Deleted Successfully")
            setAlertMessageColor("green")
        } catch(err) {
            // console.log(err)
            // alert(err.message)
            setAlertMessage("Unable to Delete User")
            setAlertMessageColor("red")
        }
    }
}

const deleteUser = (UserID) => {
    return {
        type : "DELETE_USER",
        payload : UserID
    }
}