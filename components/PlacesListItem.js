import React from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"

export default function PlacesListItem({ item, onPress }) {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.6}>
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={{ uri: item.imageUri }}
					resizeMode="cover"
				/>
				<View style={styles.textContainer}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.address}>{item.address}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 180,
		borderBottomColor: "#d3d3d3",
		borderBottomWidth: 2,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		overflow: "hidden"
	},
	image: {
		borderRadius: 50,
		height: 100,
		width: 100,
		borderWidth: 2,
		borderColor: "#d3d3d390"
	},
	title: {
		color: "white",
		fontSize: 25,
		letterSpacing: 2,
		fontWeight: "bold",
		marginLeft: 30,
		marginBottom: 10
	},
	address: {
		fontSize: 15,
		color: "#d3d3d3",
		marginHorizontal: 30,
		paddingRight: 80
	},
	textContainer: {
		justifyContent: "center"
	}
})
