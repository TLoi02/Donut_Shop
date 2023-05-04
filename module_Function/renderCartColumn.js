
function addQuanlityToListProduct(arrayCart, arrayProduct){
    const lenght = arrayCart.length;
    for (let i=0; i<lenght; i++) {
        arrayProduct[i].quanlity=arrayCart[i].quanlity;
    }

    arrayProduct.forEach(item => {
        item.totalPrice = item.price*item.quanlity;
    })

    return arrayProduct;
}

function calcTotalPrice (arrayProduct) {
    const price = arrayProduct.reduce((value,product) => {
        return value += product.totalPrice;

    },0)

    return price;
}

function renderCartColumn(data){
    const listProduct=data;
    const htmlContent = document.querySelector('.cart__content__list');
    const htmlTotalContent = document.querySelector('.cart__content__nav__cart__total-value')
    const checkCart = JSON.parse(localStorage.getItem('cart'));
    const htmlContentEmpty = document.querySelector('.product-content__cart__content-empty');
    const htmlContentNotEmpty = document.querySelector('.product-content__cart__content-notempty')

    if (checkCart.length > 0){
        htmlContentEmpty.classList.remove('active');
        htmlContentNotEmpty.classList.add('active');

        var findProduct=[];

        //Cart 1 product
        if (checkCart.length === 1){

            findProduct = listProduct.find(item => {
                    return item.idProduct === (checkCart[0].idProduct).toString();
            })
            
            htmlContent.innerHTML=`
            <div class="cart__content__item">
            <div class="cart__content__item__image">
                <img src=".${findProduct.image}" alt="">
            </div>
            <div class="cart__content__item__content">
                <div class="cart__content__item__content__title">
                    ${findProduct.nameProduct}
                </div>
                <div class="cart__content__item__content__info">
                    <div class="cart__content__item__content__info__value">
                        <span class="cart__content__item__content__info__value-child">
                            ${checkCart[0].quanlity}
                        </span>
                    </div>
                    <div class="cart__content__item__content__info__price">
                        <span class="cart__content__item__content__info__price__icon">
                            x
                        </span>
                        $<span class="cart__content__item__content__info__price-child">
                            ${checkCart[0].price}
                        </span>
                    </div>
                </div>
            </div>
            <div class="cart__content__item__icon" onclick="handelDeleteCart(${checkCart[0].idProduct})">
                <i class="ti-close"></i>
            </div>
            </div>
            `;

            htmlTotalContent.innerText = checkCart[0].price * checkCart[0].quanlity;


        }

        //Cart have some Product 
        else{
            checkCart.forEach(item => {
                findProduct.push(listProduct.find(product => {
                    return product.idProduct === (item.idProduct).toString();
                }))
            })
            const productCartSuccess = addQuanlityToListProduct(checkCart, findProduct)
            
            const htmlCode =  productCartSuccess.map(item => {
                return `
                <div class="cart__content__item">
                    <div class="cart__content__item__image">
                        <img src=".${item.image}" alt="">
                    </div>
                    <div class="cart__content__item__content">
                        <div class="cart__content__item__content__title">
                            ${item.nameProduct}
                        </div>
                        <div class="cart__content__item__content__info">
                            <div class="cart__content__item__content__info__value">
                                <span class="cart__content__item__content__info__value-child">
                                    ${item.quanlity}
                                </span>
                            </div>
                            <div class="cart__content__item__content__info__price">
                                <span class="cart__content__item__content__info__price__icon">
                                    x
                                </span>
                                $<span class="cart__content__item__content__info__price-child">
                                    ${item.price}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="cart__content__item__icon" onclick="handelDeleteCart(${item.idProduct})">
                        <i class="ti-close"></i>
                    </div>
                </div>
                `
            }).join('');

            htmlTotalContent.innerText = calcTotalPrice(productCartSuccess);
            htmlContent.innerHTML=htmlCode;

        }
    }

}

export default renderCartColumn;