import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("places.db")

export function initialiseDB() {
	const initialised = new Promise((resolved, rejected) => {
		db.transaction(tx => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT, lat REAL, long REAL);",
				[],
				() => resolved(),
				(_, err) => rejected(err)
			)
		})
	})
	return initialised
}

export function insertPlace(title, imageUri, address, lat, long) {
	const promise = new Promise((resolved, rejected) => {
		db.transaction(tx => {
			tx.executeSql(
				"INSERT INTO places(title, imageUri, address, lat, long) VALUES(?, ?, ?, ?, ?)",
				[title, imageUri, address, lat, long],
				(_, result) => {
					resolved(result)
				},
				(_, err) => rejected(err)
			)
		})
	})
	return promise
}

export function loadPlaces() {
	const promise = new Promise((resolved, rejected) => {
		db.transaction(tx => {
			tx.executeSql(
				"SELECT * FROM places",
				[],
				(_, result) => resolved(result),
				(_, err) => rejected(err)
			)
		})
	})
	return promise
}
