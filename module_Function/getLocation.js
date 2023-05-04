function getLocation(callback) {
    fetch('../JSON_DATA/location.json')
        .then(response => response.json())
        .then(callback)
}

export default getLocation;