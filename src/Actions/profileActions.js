import axios from "axios"
import { backendApi } from "../Apis/api";

export const startGetAllProfile = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/profile/read-all-profiles`);
            console.log(response.data.data.results)
            dispatch(getProfile(response.data.data.results))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const getProfile = (profile) => {
    return {
        type : "GET_ALL_PROFILE",
        payload : profile
    }
}

export const startCreateProfile = (formData, setAlertMessage, setAlertMessageColor) => {
    console.log("hii-1", formData)
    return async (dispatch) => {
        console.log("hii-2", formData)
        try {
            console.log("hii-3", formData)
            const response = await axios.post(`${backendApi}/profile/create-profile`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(createProfile(response.data.data.results))
            console.log(response)
            setAlertMessage("Profile Succcessfully Created")
            setAlertMessageColor("green")
        } catch(err) {
            console.log("error hii")
            console.log(err)
            alert(err.message)
            setAlertMessage(err.response.data.message)
            setAlertMessageColor("red")
        }
    }
}

const createProfile = (profile) => {
    return {
        type : "CREATE_PROFILE",
        payload : profile
    }
}

export const startUpdateProfile = (formData, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${backendApi}/profile/update-profile`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data)
            dispatch(updateProfile(response.data.data))
            setAlertMessage("Profile Succcessfully Updated")
            setAlertMessageColor("green")
        } catch(err) {
            console.log(err)
            alert(err.message)
            setAlertMessage(err.response.data.message)
            setAlertMessageColor("red")
        }
    }
}

const updateProfile = (profile) => {
    return {
        type : "UPDATE_PROFILE",
        payload : profile
    }
}

export const startDeleteProfile = (profile) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`${backendApi}/profile/delete-profile`, { _id : profile._id}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            dispatch(deleteProfile(profile._id))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const deleteProfile = (profileID) => {
    return {
        type : "DELETE_PROFILE",
        payload : profileID
    }
}