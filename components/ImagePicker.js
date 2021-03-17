import React, { useState } from "react"
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native"
import * as ImgPicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

export default function ImagePicker({ onImageTaken }) {
	const [image, setImage] = useState()

	async function getPermissions() {
		const permitted = await Permissions.askAsync(
			Permissions.CAMERA,
			Permissions.MEDIA_LIBRARY
		)
		if (!permitted.granted) {
			Alert.alert(
				"Permission Required",
				"Camera permission is required to take photos.",
				[{ text: "Okay" }]
			)
			return false
		}
		return true
	}

	async function handleImage() {
		const hasGranted = await getPermissions()
		if (!hasGranted) return
		const image = await ImgPicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5
		})
		if (!image.cancelled) {
			setImage(image.uri)
			onImageTaken(image.uri)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.preview}>
				{image == null ? (
					<Text style={styles.text}>No image selected.</Text>
				) : (
					<Image style={styles.image} source={{ uri: image }} />
				)}
			</View>
			<View style={styles.button}>
				<Button title="Take Photo" color="purple" onPress={handleImage} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 20
	},
	preview: {
		width: "100%",
		height: 200,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "white",
		borderWidth: 3,
		marginBottom: 30,
		borderRadius: 5
	},
	text: {
		color: "white"
	},
	button: {
		width: "40%",
		alignSelf: "center"
	},
	image: {
		width: "100%",
		height: "100%"
	}
})
