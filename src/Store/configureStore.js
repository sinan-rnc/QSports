import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import clubsAndBarsReducers from "../Reducers/clubsAndBarsReducers"
import eventsReducers from "../Reducers/eventReducers"
import profileReducers from "../Reducers/profileReducers"

const configureStore = () => {
    const store = createStore(combineReducers({
        clubsAndBars: clubsAndBarsReducers,
        events: eventsReducers,
        profile: profileReducers,
    }), applyMiddleware(thunk))

    return store
}

export default configureStore