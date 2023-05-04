import getProduct from '/module_Function/getProduct.js'
import renderValueCartIcon from '/module_Function/renderValueCartIcon.js'

function start() {

    getProduct(renderProduct);
    getProduct(renderRelatedProduct);
    getProduct(renderCart);
    renderValueCartIcon();


}

function renderProduct(data) {
    const listProduct = data;
    const idProduct = localStorage.getItem('idDetail');
    const thisProduct = listProduct.find(item => {
        return item.idProduct === idProduct;
    })

    const htmlTitle = document.querySelector('.header-product__title__wrap');
    const htmlImage = document.querySelector('.product-image');
    const htmlContentName = document.querySelector('.product-content__wrap');
    const htmlContentDesc = document.querySelector('.product__content__desc__wrap')

    htmlTitle.innerHTML = `
        <h2 class="header__product__title">
            ${thisProduct.nameProduct}
        </h2>
    `;

    htmlImage.innerHTML = `
        <img src=".${thisProduct.image}" alt="">
    `;
    
    htmlContentName.innerHTML = `
        <div class="product-content">
            <div class="product-content__price">
                $ <span id="product-content__price__value" class="product-content__price__value">
                    ${thisProduct.price}
                </span>
            </div>
            <div class="product-content__ingre__title">
                Ingredients:
            </div>
            <div class="product-content__ingre__desc">
                ${thisProduct.ingredients}
            </div>
              <div class="product-content__cart-btn">
                    <div class="product-content__cart-btn__input">
                        <input id="input-${thisProduct.idProduct}" type="number" min="1" max="20" value="1">
                    </div>
                    <div class="product-content__cart-btn__child"  onclick="handelAddToCart(${thisProduct.idProduct}, ${thisProduct.price})">
                        ADD TO CART
                    </div>
                </div>
        </div>
    `;

    htmlContentDesc.innerHTML = `
        <div class="product-content__desc-title">
            Description
        </div>
        <div class="product-content__desc-content">
            ${thisProduct.description}
            <div class="product-content__desc__list-icon">
            <i class="ti-facebook"></i>
            <i class="ti-twitter-alt"></i>
            <i class="ti-linkedin"></i>
            </div>
        </div>
            `
}


function renderRelatedProduct(data) {
    const listProduct = data;
    const idProduct = localStorage.getItem('idDetail');
    const thisProduct = listProduct.find(item => {
        return item.idProduct === idProduct;
    })

    const relatedProducts = thisProduct.recomment;
    const findInfoProduct = [];

    for (var key in relatedProducts) {
        findInfoProduct.push(listProduct.find(item => {
            return item.idProduct === relatedProducts[key];
        }))
    }

    const htmlContent = document.querySelector('.product-items__wrap');
    const htmlCode = findInfoProduct.map(product => {
        return `
            <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="product-item">
                        <a class="product-item__link" href="../detail-product_Page/index-detail.html" onclick="handelDetailPage(${product.idProduct})">
                            <div class="product-item__image">
                                <img src=".${product.image}" alt="">
                            </div>
                        </a>
                        <div class="product-item__type">
                            ${product.type}
                        </div>
                        <a class="product-item__link" href="../detail-product_Page/index-detail.html" onclick="handelDetailPage(${product.idProduct})">
                            <div class="product-item__title">
                                ${product.nameProduct}
                            </div>
                        </a>
                        <div class="product-item__price">
                            $
                            <span class="product-item__price__value">
                                ${product.price}
                            </span>
                        </div>
                        <div class="product-item__btn" onclick="handelCartButton(${product.idProduct}, ${product.price})">
                            ADD TO CART
                        </div>
                    </div>
            </div>
        `
    }).join('');

    htmlContent.innerHTML = htmlCode;
}

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

function renderCart(data){
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
            handelLoading();


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
            handelLoading();
        }
    }

    else{
        handelLoading();
    }

}


start();


