import axios from "axios"
import { backendApi } from "../Apis/api"

export const startGetAllEvents = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/event/read-all-events`, {}, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data.results)
            dispatch(setAllEvents(response.data.data.results))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const setAllEvents = (allEvents) => {
    return {
        type : "GET_ALL_EVENTS",
        payload : allEvents
    }
}

export const startCreateEvent = (formData, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/event/create-event`, formData, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data)
            dispatch(createEvents(response.data.data))
            setAlertMessage("Event Created Succcessfully")
            setAlertMessageColor("green")
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const createEvents = (allEvents) => {
    return {
        type : "CREATE_EVENTS",
        payload : allEvents
    }
}

export const startUpdateEvent = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${backendApi}/event/update-event`, formData, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data.results)
            dispatch(updateEvent(response.data.data.results))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const updateEvent = (allEvents) => {
    return {
        type : "UPDATE_EVENTS",
        payload : allEvents
    }
}

export const startDeleteEvent = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`${backendApi}/event/delete-event`, { _id : formData._id }, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data.results)
            dispatch(deleteEvent(formData._id))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const deleteEvent = (eventID) => {
    return {
        type : "DELETE_EVENTS",
        payload : eventID
    }
}