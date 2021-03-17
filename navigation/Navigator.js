import { createStackNavigator, createAppContainer } from "react-navigation"
import { Platform } from "react-native"

import PlacesListScreen from "../screens/PlacesListScreen"
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen"
import NewPlaceScreen from "../screens/NewPlaceScreen"
import MapScreen from "../screens/MapScreen"
import Colours from "../constants/Colours"

const PlacesStack = createStackNavigator(
	{
		Places: PlacesListScreen,
		PlaceDetails: PlaceDetailsScreen,
		NewPlace: NewPlaceScreen,
		Map: MapScreen
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === "android" ? Colours.green : ""
			},
			headerTintColor: Platform.OS === "android" ? "#fff" : Colours.green
		}
	}
)

export default createAppContainer(PlacesStack)
