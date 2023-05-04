function getBlog(callback) {
    fetch ('https://my-json-server.typicode.com/TLoi02/JSON_API_BLOGS/Blogs')
        .then(response => response.json())
        .then(callback)
}

export default getBlog;