'use strict'

function saveToStorage(key, val) {
    const strVal = JSON.stringify(val)
	localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
	const val = localStorage.getItem(key)
	return JSON.parse(val)
}