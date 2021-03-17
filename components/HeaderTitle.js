import React from "react"
import { Text, StyleSheet } from "react-native"

export default function HeaderTitle({ children, style }) {
	return <Text style={{ ...styles.headerText, ...style }}>{children}</Text>
}

const styles = StyleSheet.create({
	headerText: {
		fontWeight: "bold",
		color: "white",
		fontSize: 25,
		marginLeft: 20,
		letterSpacing: 1
	}
})
