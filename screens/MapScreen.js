import React, { useState, useEffect, useCallback } from "react"
import { Button, StyleSheet, View } from "react-native"
import Map, { Marker } from "react-native-maps"
import HeaderTitle from "../components/HeaderTitle"

export default function MapScreen({ navigation }) {
	const [pickedLocation, setPickedLocation] = useState()

	function handleMapPress(e) {
		setPickedLocation({
			latitude: e.nativeEvent.coordinate.latitude,
			longitude: e.nativeEvent.coordinate.longitude
		})
	}

	const savePickedLocation = useCallback(() => {
		navigation.navigate("NewPlace", { pickedLocation })
	}, [pickedLocation])

	useEffect(() => {
		navigation.setParams({ saveLocation: savePickedLocation })
	}, [savePickedLocation])

	return (
		<Map
			style={styles.map}
			region={{
				latitude: 37.78,
				longitude: -122.22,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			}}
			onPress={handleMapPress}
		>
			{pickedLocation && (
				<Marker title="Picked Location" coordinate={pickedLocation} />
			)}
		</Map>
	)
}

const styles = StyleSheet.create({
	map: {
		flex: 1
	},
	headerButton: {
		marginRight: 15
	}
})

MapScreen.navigationOptions = navData => {
	const saveLocation = navData.navigation.getParam("saveLocation")
	return {
		headerTitle: <HeaderTitle>Pick Location</HeaderTitle>,
		headerRight: (
			<View style={styles.headerButton}>
				<Button title="Save" color="green" onPress={saveLocation} />
			</View>
		)
	}
}
