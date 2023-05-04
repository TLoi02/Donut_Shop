function handelCartButton(id, price){
    const checkArray = localStorage.getItem('cart');
    var arrayProduct;


    checkArray === null ? arrayProduct =[] : arrayProduct=JSON.parse(localStorage.getItem('cart'));

    const checkObject = {
        'idProduct' : id,
        'quanlity' : 1,
        'price': price
    };



    const lengthArrayProduct = arrayProduct.length;

    if (lengthArrayProduct === 0){
        arrayProduct.push(checkObject);
        localStorage.setItem('cart', JSON.stringify(arrayProduct));
    }
    else{
        let checkId = 0
        arrayProduct.forEach(checkProduct => {
            if (checkProduct.idProduct === id){
                checkId+=1;
            }
        })
        if (checkId !== 0) {
            arrayProduct.forEach(product => {
                if (id === product.idProduct){
                    product.quanlity += 1;
                }
            })
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(arrayProduct));
        }
        else{
            arrayProduct.push(checkObject);
            localStorage.setItem('cart', JSON.stringify(arrayProduct));
        }
    }

    const value = (JSON.parse(localStorage.getItem('cart'))).length;
    
    const htmlContent = document.querySelectorAll('.product-pc__list__cart-value__content');

    htmlContent.forEach(html => {
        html.innerText = value;
    })
    location.reload();
}
