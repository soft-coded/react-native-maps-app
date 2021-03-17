import * as FileSystem from "expo-file-system"

import { insertPlace, loadPlaces } from "../../database/db"

export const ADD_PLACE = "ADD_PLACE"
export const LOAD_PLACES = "LOAD_PLACES"

export function addPlace(title, placeImageUri, location) {
	return async dispatch => {
		const fileName = placeImageUri.split("/").pop()
		const newPath = FileSystem.documentDirectory + fileName
		const address = `Location at these coordinates: ${location.latitude} lat, ${location.longitude} long.`

		FileSystem.moveAsync({
			from: placeImageUri,
			to: newPath
		}).catch(err => console.log(err))

		try {
			const place = await insertPlace(
				title,
				newPath,
				address,
				location.latitude,
				location.longitude
			)
			dispatch({
				type: ADD_PLACE,
				payload: {
					id: place.insertId,
					title,
					imageUri: newPath,
					location,
					address
				}
			})
		} catch (err) {
			console.log(err)
		}
	}
}

export function loadPlacesToRedux() {
	return async dispatch => {
		try {
			const dbResult = await loadPlaces()
			dispatch({ type: LOAD_PLACES, payload: dbResult.rows._array })
		} catch (err) {
			throw err
		}
	}
}
