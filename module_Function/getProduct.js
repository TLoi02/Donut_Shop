function getProduct (callback){
    fetch('https://my-json-server.typicode.com/TLoi02/JSON_API/product')
        .then(response => response.json())
        .then(callback)
}

export default getProduct;
