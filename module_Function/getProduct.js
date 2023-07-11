function getProduct (callback){
    fetch('./JSON_DATA/product.json')
        .then(response => response.json())
        .then(callback)
}

export default getProduct;
