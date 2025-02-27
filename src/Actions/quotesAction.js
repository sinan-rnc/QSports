import axios from "axios"
import { backendApi } from "../Apis/api"

export const startGetAllQuotes = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/quote/read-all-quotes`, { limit: 100, isDeleted: false })
            // console.log(response.data.data.results)
            dispatch(getAllQuotes(response.data.data.results))
        } catch(err) {
            // console.log(err);
            // alert(err.response.data.message)
        }
    }
}
const getAllQuotes = (quotes) => {
    return {
        type: "GET_ALL_QUOTES",
        payload: quotes
    }
}

export const startCreateQuote = (formData, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/quote/create-quote`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data.data)
            dispatch(createQuote(response.data.data))
            setAlertMessage("Quote Created Successfully")
            setAlertMessageColor("green")
        } catch(err) {
            // console.log(err);
            // alert(err.response.data.message)
            setAlertMessage("Unable to Create Quote")
            setAlertMessageColor("red")
        }
    }
}
const createQuote = (quote) => {
    return {
        type: "CREATE_QUOTE",
        payload: quote
    }
}

export const startUpdateQuote = (formData, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${backendApi}/quote/update-quote`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data.data)
            dispatch(updateQuote(response.data.data))
            setAlertMessage("Quote Updated Successfully")
            setAlertMessageColor("green")
        } catch(err) {
            // console.log(err);
            // alert(err.response.data.message)
            setAlertMessage("Unable to Update Quote")
            setAlertMessageColor("red")
        }
    }
}
const updateQuote = (quote) => {
    return {
        type: "UPDATE_QUOTE",
        payload: quote
    }
}

export const startGetQuoteOfTheDay = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/quote/read-quote-of-the-day`, {})
            // console.log(response.data.data.results)
            dispatch(getQuoteOfTheDay(response.data.data.results))
        } catch(err) {
            // console.log(err);
            // alert(err.response.data.message)
        }
    }
}
const getQuoteOfTheDay = (quote) => {
    return {
        type: "GET_QUOTE_OF_THE_DAY",
        payload: quote
    }
}

export const startDeleteQuote = (quoteID, setAlertMessage, setAlertMessageColor) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`${backendApi}/quote/delete-quote`, { _id : quoteID}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            // console.log(response)
            dispatch(deleteQuote(quoteID))
            setAlertMessage("Quote Deleted")
            setAlertMessageColor("green")
        } catch(err) {
            // console.log(err)
            // alert(err.message)
            setAlertMessage("Unable to Delete Quote")
            setAlertMessageColor("green")
        }
    }
}

const deleteQuote = (profileID) => {
    return {
        type : "DELETE_QUOTE",
        payload : profileID
    }
}