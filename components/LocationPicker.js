import React, { useState } from "react"
import {
	View,
	Text,
	Button,
	StyleSheet,
	ActivityIndicator,
	Alert,
	TouchableOpacity
} from "react-native"
import * as Location from "expo-location"
import * as Permissions from "expo-permissions"

export default function LocationPicker({ onMapPress, setLocation, location }) {
	const [isFetching, setIsFetching] = useState(false)

	async function getPermissions() {
		const permitted = await Permissions.askAsync(Permissions.LOCATION)
		if (!permitted.granted) {
			Alert.alert(
				"Permission Required",
				"Location permission is required to get the current location.",
				[{ text: "Okay" }]
			)
			return false
		}
		return true
	}

	async function handlePress() {
		const hasGranted = await getPermissions()
		if (!hasGranted) return

		try {
			setIsFetching(true)
			const location = await Location.getCurrentPositionAsync({
				timeout: 5000
			})
			setIsFetching(false)
			setLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			})
		} catch (err) {
			setIsFetching(false)
			Alert.alert("Failed", "Could not fetch location. Try the map.", [
				{ text: "Okay" }
			])
		}
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.preview}
				activeOpacity={0.6}
				onPress={onMapPress}
			>
				{isFetching ? (
					<ActivityIndicator size="large" color="orange" />
				) : (
					<Text style={styles.text}>
						{location != null ? "Location chosen." : "No location chosen."}
					</Text>
				)}
			</TouchableOpacity>
			<View style={styles.button}>
				<Button
					title="Get Current Location"
					color="brown"
					onPress={handlePress}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginBottom: 50
	},
	preview: {
		width: "100%",
		height: 200,
		borderWidth: 3,
		borderColor: "white",
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 30
	},
	text: {
		color: "white"
	},
	button: {
		width: "40%",
		alignSelf: "center"
	}
})
