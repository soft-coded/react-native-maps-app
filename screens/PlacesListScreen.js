import React, { useEffect } from "react"
import { View, Button, StyleSheet, FlatList } from "react-native"
import { useSelector, useDispatch } from "react-redux"

import HeaderTitle from "../components/HeaderTitle"
import Colours from "../constants/Colours"
import PlacesListItem from "../components/PlacesListItem"
import { loadPlacesToRedux } from "../store/actions/PlacesActions"

export default function PlacesListScreens({ navigation }) {
	const data = useSelector(state => state.places.places)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadPlacesToRedux())
	}, [dispatch])

	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<PlacesListItem
					item={item}
					onPress={() =>
						navigation.navigate("PlaceDetails", {
							title: item.title,
							id: item.id
						})
					}
				/>
			)}
			contentContainerStyle={styles.container}
			style={{ flex: 1 }}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colours.black
	}
})

PlacesListScreens.navigationOptions = navData => {
	return {
		headerTitle: <HeaderTitle>All Places</HeaderTitle>,
		headerRight: (
			<View style={{ marginRight: 10 }}>
				<Button
					color="green"
					title="Add place"
					onPress={() => navData.navigation.navigate("NewPlace")}
				/>
			</View>
		)
	}
}
