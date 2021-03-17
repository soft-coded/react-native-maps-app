import { ADD_PLACE, LOAD_PLACES } from "../actions/PlacesActions"

const initialState = {
	places: []
}

export default function (state = initialState, action) {
	switch (action.type) {
		case ADD_PLACE:
			return {
				places: state.places.concat({
					id: action.payload.id,
					title: action.payload.title,
					imageUri: action.payload.imageUri,
					latitude: action.payload.location.latitude,
					longitude: action.payload.location.longitude,
					address: action.payload.address
				})
			}

		case LOAD_PLACES:
			return {
				places: action.payload
			}

		default:
			return state
	}
}
