import { StatusBar } from "expo-status-bar"
import React from "react"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import ReduxThunk from "redux-thunk"

import AppNavigator from "./navigation/Navigator"
import placesReducer from "./store/reducers/PlacesReducer"
import { initialiseDB } from "./database/db"

initialiseDB().catch(err => console.log("Could not initialise database", err))

const rootReducer = combineReducers({
	places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar style="inverted" />
			<AppNavigator />
		</Provider>
	)
}
