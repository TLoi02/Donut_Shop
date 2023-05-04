function calcCoupon() {
    const input = document.querySelector('.content-gift__input__child')
    const valueInput = document.querySelector('.content-gift__input__child').value.toUpperCase().trim();
    const lineOldPrice = document.querySelector('.sub-total__price__line');
    const newPriceContent = document.querySelector('.sub-total__new-price');
    const newPriceValue = document.querySelector('.sub-total__new-price__value');
    const totalPrice = document.querySelector('.total-price__value__child')
    const couponContent = document.querySelector('.content-gif__text')
    const couponButton = document.querySelector('.content-gift__btn-list');
    const priceValue = parseInt(document.querySelector('.sub-total__price__value').textContent);

    const listCoupons = [
        {
            codeCoupon: 'THUANLOI20',
            value: 20
        },
        {
            codeCoupon: 'THUANLOI50',
            value: 50
        }
    ]

    const check = listCoupons.find(code => {
        return code.codeCoupon === valueInput;
    })


    //Code Coupon Isn't True
    if (check === undefined) {
        const input = document.querySelector('.content-gift__input__child');
        input.value = '';
        input.placeholder = 'Wrong Coupon!'
        input.style.border = '1px solid red';

        localStorage.setItem('coupon', null);
    }

    //Code Coupon Is True 
    else {
        const priceSale = (priceValue / 100) * check.value;
        const priceNew = Math.round(priceValue - priceSale);
        input.value = '';

        localStorage.setItem('coupon', check.value);

        couponContent.classList.add('done')
        couponButton.classList.add('done')


        //inner new price;
        lineOldPrice.classList.add('active')
        newPriceValue.innerText = priceNew;
        newPriceContent.classList.add('active')
        totalPrice.innerText = priceNew;
    }
}


function handeChangeQuanlity(id, type) {
    var input;
    if (type === 2){
        input = parseInt(document.getElementById(`input__product-${id}`).value);
    }
    else{
        input = parseInt(document.getElementById(`input__product__mobile-${id}`).value);
    }
    const listProduct = JSON.parse(localStorage.getItem('cart'));

    //1 product
    if (listProduct.length === 1) {
        if (input <= 0) {
            listProduct.splice(0, 1);

            localStorage.setItem('cart', JSON.stringify(listProduct));
            location.reload();
        }
        else {
            listProduct[0].quanlity = input;

            localStorage.setItem('cart', JSON.stringify(listProduct));
            location.reload();
        }

    }
    //Some products
    else {
        const findProduct = listProduct.find(product => {
            return product.idProduct === id;
        })
        const findIndex = listProduct.findIndex(product => {
            return product.idProduct === id;
        })
        if (input <= 0) {
            listProduct.splice(findIndex, 1);
            localStorage.setItem('cart', JSON.stringify(listProduct));
            location.reload();
        }
        else {
            listProduct.splice(findIndex, 1);
            findProduct.quanlity = input;

            listProduct.splice(findIndex, 0, findProduct);

            localStorage.setItem('cart', JSON.stringify(listProduct));
            location.reload();
        }
    }
}

function handelUndoProduct(id){
    const checkListProduct = JSON.parse(localStorage.getItem('cart'));
    var listProduct;
    const listDeleteProduct = JSON.parse(localStorage.getItem('deleted'));

    listProduct = (checkListProduct === null) ? [] : checkListProduct;

   const findProduct = listDeleteProduct.findIndex(item => {
       return item.idProduct === id
   })

   const slice = listDeleteProduct.find(product => {
       return product.idProduct === id;
   });

   listDeleteProduct.splice(findProduct, 1)

   listProduct.push(slice);

   localStorage.setItem('cart', JSON.stringify(listProduct))
   localStorage.setItem('deleted', JSON.stringify(listDeleteProduct))

   location.reload();
}

function handelHideDeletedProduct(){
    const deletedContent = document.querySelector('.deleted__product')

    localStorage.setItem('deleted', JSON.stringify([]));
    deletedContent.classList.remove('active');
}

function handelUndoAll(){
    const listDeletedProduct = JSON.parse(localStorage.getItem('deleted'))
    const cart = JSON.parse(localStorage.getItem('cart'));

    for (var key in listDeletedProduct){
        cart.push(listDeletedProduct[key])
    }

    localStorage.setItem('deleted', JSON.stringify([]))
    localStorage.setItem('cart', JSON.stringify(cart))

    location.reload();

}
