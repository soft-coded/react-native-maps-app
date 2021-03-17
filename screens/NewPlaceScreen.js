import React, { useState, useEffect } from "react"
import {
	ScrollView,
	View,
	Text,
	Button,
	TextInput,
	StyleSheet
} from "react-native"
import { useDispatch } from "react-redux"

import HeaderTitle from "../components/HeaderTitle"
import Colours from "../constants/Colours"
import { addPlace } from "../store/actions/PlacesActions"
import ImagePicker from "../components/ImagePicker"
import LocationPicker from "../components/LocationPicker"

export default function NewPlaceScreen({ navigation }) {
	const dispatch = useDispatch()
	const [location, setLocation] = useState()
	const [title, setTitle] = useState("")
	const [placeImageUri, setPlaceImageUri] = useState()
	const mapPickedLocation = navigation.getParam("pickedLocation")

	useEffect(() => {
		if (mapPickedLocation != null) setLocation(mapPickedLocation)
	}, [mapPickedLocation])

	function handleSubmit() {
		dispatch(addPlace(title, placeImageUri, location))
		navigation.goBack()
	}
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Title</Text>
			<TextInput
				value={title}
				style={styles.input}
				onChangeText={text => setTitle(text)}
			/>
			<ImagePicker onImageTaken={uri => setPlaceImageUri(uri)} />
			<LocationPicker
				setLocation={setLocation}
				location={location}
				onMapPress={() => navigation.navigate("Map")}
			/>
			<View style={styles.button}>
				<Button color="green" title="Add Place" onPress={handleSubmit} />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colours.black,
		padding: 20
	},
	title: {
		color: "white",
		fontSize: 23,
		letterSpacing: 3,
		marginTop: 10,
		fontWeight: "bold"
	},
	input: {
		borderBottomColor: "white",
		borderBottomWidth: 1,
		marginBottom: 30,
		height: 50,
		fontSize: 20,
		color: "white"
	},
	button: {
		alignSelf: "center",
		width: "40%"
	}
})

NewPlaceScreen.navigationOptions = {
	headerTitle: <HeaderTitle>Add Place</HeaderTitle>
}
