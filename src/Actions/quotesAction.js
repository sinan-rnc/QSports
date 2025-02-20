import axios from "axios"
import { backendApi } from "../Apis/api"

export const startGetAllQuotes = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/quote/read-all-quotes`)
            console.log(response.data.data.results)
            dispatch(getAllQuotes(response.data.data.results))
        } catch(err) {
            console.log(err);
            alert(err.response.data.message)
        }
    }
}
const getAllQuotes = (quotes) => {
    return {
        type: "GET_ALL_QUOTES",
        payload: quotes
    }
}

export const startCreateQuote = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/quote/create-quote`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data.data.results)
            dispatch(createQuote(response.data.data.results))
        } catch(err) {
            console.log(err);
            alert(err.response.data.message)
        }
    }
}
const createQuote = (quote) => {
    return {
        type: "CREATE_QUOTE",
        payload: quote
    }
}

export const startGetQuoteOfTheDay = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${backendApi}/quote/read-quote-of-the-day`, {})
            console.log(response.data.data.results)
            dispatch(getQuoteOfTheDay(response.data.data.results))
        } catch(err) {
            console.log(err);
            alert(err.response.data.message)
        }
    }
}
const getQuoteOfTheDay = (quote) => {
    return {
        type: "GET_QUOTE_OF_THE_DAY",
        payload: quote
    }
}