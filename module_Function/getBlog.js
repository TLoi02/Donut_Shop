function getBlog(callback) {
    fetch ('../JSON_DATA/blog.json')
        .then(response => response.json())
        .then(callback)
}

export default getBlog;