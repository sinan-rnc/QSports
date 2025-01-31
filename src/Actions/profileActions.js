import axios from "axios"

export const startGetAllProfile = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://103.134.237.3:3001/v1/profile/read-all-profiles");
            console.log(response)
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

export const startCreateProfile = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put("http://103.134.237.3:3001/v1/profile/create-profile", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            dispatch(createProfile(response.data.data.results))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const createProfile = (profile) => {
    return {
        type : "CREATE_PROFILE",
        payload : profile
    }
}

export const startUpdateProfile = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put("http://103.134.237.3:3001/v1/profile/update-profile", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data.results)
            dispatch(updateProfile(response.data.data.results))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const updateProfile = (profile) => {
    return {
        type : "UPDATE_PROFILE",
        payload : profile
    }
}

export const startDeleteProfile = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch("http://103.134.237.3:3001/v1/profile/delete-profile", { _id : formData._id}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            dispatch(deleteProfile(formData._id))
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