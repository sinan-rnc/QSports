import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import clubsAndBarsReducers from "../Reducers/clubsAndBarsReducers"
import eventsReducers from "../Reducers/eventReducers"
import profileReducers from "../Reducers/profileReducers"
import quotesReducers from "../Reducers/quotesReducers"

const configureStore = () => {
    const store = createStore(combineReducers({
        clubsAndBars: clubsAndBarsReducers,
        events: eventsReducers,
        profile: profileReducers,
        quotes: quotesReducers
    }), applyMiddleware(thunk))

    return store
}

export default configureStore