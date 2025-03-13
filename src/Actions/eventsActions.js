import axios from "axios"
import { backendApi } from "../Apis/api"

export const startGetAllEvents = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/event/read-all-events`, { limit: 100 }, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data.data.results)
            dispatch(setAllEvents(response.data.data.results))
        } catch(err) {
            // console.log(err)
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
            // console.log(response.data.data)
            dispatch(createEvents(response.data.data))
            setAlertMessage("Event Created Succcessfully")
            setAlertMessageColor("green")
        } catch(err) {
            console.log(err)
            // alert(err.message)
            setAlertMessage("Failed to Create Event")
            setAlertMessageColor("red")
        }
    }
}

const createEvents = (allEvents) => {
    return {
        type : "CREATE_EVENTS",
        payload : allEvents
    }
}

export const startUpdateEvent = (formData, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${backendApi}/event/update-event`, formData, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data.data)
            dispatch(updateEvent(response.data.data))
            setAlertMessage("Event Updated Succcessfully")
            setAlertMessageColor("green")
        } catch(err) {
            // console.log(err)
            // alert(err.message)
            setAlertMessage("Failed to Update Event")
            setAlertMessageColor("red")
        }
    }
}

const updateEvent = (allEvents) => {
    return {
        type : "UPDATE_EVENTS",
        payload : allEvents
    }
}

export const startFeatureEvent = (formData, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${backendApi}/event/update-event`, formData, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data.data)
            dispatch(featureEvent(response.data.data))
            if(response.data.data.isFeatured) {
                setAlertMessage("Event is marked as Featured")
                setAlertMessageColor("green")
            } else {
                setAlertMessage("Event removed from Featured")
                setAlertMessageColor("green")
            }
        } catch(err) {
            // console.log(err)
            // alert(err.message)
            setAlertMessage("Failed to removed Event from Featured")
            setAlertMessageColor("red")
        }
    }
}

const featureEvent = (allEvents) => {
    return {
        type : "FEATURE_EVENT",
        payload : allEvents
    }
}

export const startDeleteEvent = (eventID, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`${backendApi}/event/delete-event`, { _id : eventID }, {
                headers : {
                    "Authorization" : `Bearer  ${localStorage.getItem("token")}`
                }
            })
            // console.log(response)
            setAlertMessage("Event Deleted Succcessfully")
            setAlertMessageColor("green")
            dispatch(deleteEvent(eventID))
        } catch(err) {
            // console.log(err)
            // alert(err.message)
            setAlertMessage(" Failed to Delete Event")
            setAlertMessageColor("red")
        }
    }
}

const deleteEvent = (eventID) => {
    return {
        type : "DELETE_EVENTS",
        payload : eventID
    }
}