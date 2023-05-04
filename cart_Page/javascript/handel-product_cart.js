import getProduct from '/module_Function/getProduct.js'
import getLocation from '/module_Function/getLocation.js'

function start(){
    const check = JSON.parse(localStorage.getItem('cart'));
    var listProductCart;
    listProductCart = (check === null ) ? [] : check;
    const contentEmpty = document.querySelector('.content__empty');
    const contentNotEmpty = document.querySelector('.content__cart');

    getProduct(renderDeletedProduct)
    
    if (listProductCart.length > 0){
        contentNotEmpty.classList.add('active')
        contentEmpty.classList.remove('active')
        getProduct(renderCartTable);
        getProduct(renderCartMobile);
    }
    else{
        contentNotEmpty.classList.remove('active')
        contentEmpty.classList.add('active')
    }

    getLocation(renderListLocation)
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

function calcSubPrice(arrayProduct){
    const priceProduct = arrayProduct.reduce((value,product) => {
        return value += product.totalPrice;

    },0)

    return priceProduct;
}

function calcTotalPrice (arrayProduct) {
    const getShipping = JSON.parse(localStorage.getItem('shipping'));
    let priceShipping;

    priceShipping = (getShipping === null) ? 0 : getShipping.price;


    const priceProduct = arrayProduct.reduce((value,product) => {
        return value += product.totalPrice;

    },0)

    const total = priceProduct + priceShipping;

    return total;
}

//Render cart on mobile
function renderCartMobile(data){
    const listProduct = data;
    const htmlContent = document.querySelector('.content__cart__mobile');
    const checkCart = JSON.parse(localStorage.getItem('cart'));

    if (checkCart.length >0){
        var findProduct=[];

        if (checkCart.length === 1){
            findProduct = listProduct.find(item => {
                return item.idProduct === (checkCart[0].idProduct).toString();
            })

            htmlContent.innerHTML = `
                <div class="content__cart__mobile__item">
                    <div class="content__cart__mobile__item__icon" onclick="handelDeleteCart(${findProduct.idProduct})">
                        <i class="ti-close"></i>
                    </div>
                    <a href="../detail-product_Page/index-detail.html">
                        <div onclick="handelDetailPage(${findProduct.idProduct})" class="content__cart__mobile__item__image">
                            <img src="${findProduct.image}" alt="">
                        </div>
                    </a>            
                    <div class="content__cart__mobile__item__title">
                        <div class="content__cart__mobile__item__title__text">
                            Product:
                        </div>
                        <a href="../detail-product_Page/index-detail.html">
                            <div onclick="handelDetailPage(${findProduct.idProduct})" class="content__cart__mobile__item__title__name">
                                ${findProduct.nameProduct}
                            </div>
                        </a>            
                    </div>
                <div class="content__cart__mobile__item__price">
                    <div class="content__cart__mobile__item__price__text">
                            Price:
                    </div>
                    <div class="content__cart__mobile__item__price__value">
                        $ <span class="content__cart__mobile__item__price__value__number">
                            ${checkCart[0].price}
                        </span>
                    </div>
                </div>
                <div class="content__cart__mobile__item__quanlity">
                    <div class="content__cart__mobile__item__quanlity__text">
                        Quanlity:
                    </div>
                    <div class="content__cart__mobile__item__quanlity__input">
                        <input type="number" id="input__product__mobile-${findProduct.idProduct}" onblur="handeChangeQuanlity(${findProduct.idProduct},1)" min="1" max="100" value="${checkCart[0].quanlity}" class="content__cart__mobile__item__quanlity__input__child">
                    </div>
                </div>
                <div class="content__cart__mobile__item__sub">
                    <div class="content__cart__mobile__item__sub__text">
                        Subtotal:
                    </div>
                    <div class="content__cart__mobile__item__sub__value">
                        $ <span class="content__cart__mobile__item__sub__value__number">
                            ${checkCart[0].price*checkCart[0].quanlity}
                        </span>
                    </div>
                </div>
            </div>   

            `
        }
        else{
            checkCart.forEach(item => {
                findProduct.push(listProduct.find(product => {
                    return product.idProduct === (item.idProduct).toString();
                }))
            })
            const productCartSuccess = addQuanlityToListProduct(checkCart, findProduct)

            const htmlCode = productCartSuccess.map(item => {
                return`
                <div class="content__cart__mobile__item">
                    <div class="content__cart__mobile__item__icon" onclick="handelDeleteCart(${item.idProduct})">
                        <i class="ti-close"></i>
                    </div>
                    <a href="../detail-product_Page/index-detail.html">
                        <div onclick="handelDetailPage(${item.idProduct})" class="content__cart__mobile__item__image">
                            <img src="${item.image}" alt="">
                        </div>
                    </a>            
                    <div class="content__cart__mobile__item__title">
                        <div class="content__cart__mobile__item__title__text">
                            Product:
                        </div>
                        <a href="../detail-product_Page/index-detail.html">
                            <div onclick="handelDetailPage(${item.idProduct})" class="content__cart__mobile__item__title__name">
                                ${item.nameProduct}
                            </div>
                        </a>            
                    </div>
                <div class="content__cart__mobile__item__price">
                    <div class="content__cart__mobile__item__price__text">
                            Price:
                    </div>
                    <div class="content__cart__mobile__item__price__value">
                        $ <span class="content__cart__mobile__item__price__value__number">
                            ${item.price}
                        </span>
                    </div>
                </div>
                <div class="content__cart__mobile__item__quanlity">
                    <div class="content__cart__mobile__item__quanlity__text">
                        Quanlity:
                    </div>
                    <div class="content__cart__mobile__item__quanlity__input">
                        <input type="number" id="input__product__mobile-${item.idProduct}" onblur="handeChangeQuanlity(${item.idProduct},1)" min="1" max="100" value="${item.quanlity}" class="content__cart__mobile__item__quanlity__input__child">
                    </div>
                </div>
                <div class="content__cart__mobile__item__sub">
                    <div class="content__cart__mobile__item__sub__text">
                        Subtotal:
                    </div>
                    <div class="content__cart__mobile__item__sub__value">
                        $ <span class="content__cart__mobile__item__sub__value__number">
                            ${item.price*item.quanlity}
                        </span>
                    </div>
                </div>
                </div>   
                `
            }).join('');

            htmlContent.innerHTML = htmlCode;
        }
    }
}

//Render cart on Tablet and PC
function renderCartTable(data){
    const listProduct = data;
    const htmlContent = document.querySelector('.content__cart__table__pc__content__list-product');
    const checkCart = JSON.parse(localStorage.getItem('cart'));
    const subTotal = document.querySelector('.sub-total__price__value')
    const totalPrice = document.querySelector('.total-price__value__child')
   

    if (checkCart.length >0){


        var findProduct = [];
        
        //Cart 1 Product
        if (checkCart.length === 1){
            const getShipping = JSON.parse(localStorage.getItem('shipping'));
            let priceShipping;
        
            priceShipping = (getShipping === null) ? 0 : getShipping.price; 

            findProduct = listProduct.find(item => {
                return item.idProduct === (checkCart[0].idProduct).toString();
            })

            htmlContent.innerHTML = `
            <tr class="content__cart__table__pc__content__wraper">
                    <td>
                        <div class="content__cart__table__pc__icon" onclick="handelDeleteCart(${findProduct.idProduct})">
                            <i class="ti-close"></i>
                        </div>
                    </td>
                    <td>
                        <a href="../detail-product_Page/index-detail.html">
                            <div class="content__cart__table__pc__product-image" onclick="handelDetailPage(${findProduct.idProduct})">
                                <img src="${findProduct.image}" alt="">
                            </div>
                        </a>
                    </td>
                    <td colspan="2">
                        <div class="content__cart__table__pc__title" onclick="handelDetailPage(${findProduct.idProduct})">
                            <a href="../detail-product_Page/index-detail.html">
                                <span>
                                    ${findProduct.nameProduct}                             
                                </span>
                            </a>
                        </div>
                    </td>
                    <td>
                        <div class="content__cart__table__pc__price">
                            $ <span class="content__cart__table__pc__price__value">
                                ${findProduct.price}
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="content__cart__table__pc__quanlity">
                            <input id="input__product-${checkCart[0].idProduct}" onblur="handeChangeQuanlity(${checkCart[0].idProduct}, 2)" class="content__cart__table__pc__quanlity__input" type="number" min="1" max="100" value="${checkCart[0].quanlity}" />
                        </div>
                    </td>
                    <td>
                        <div class="content__cart__table__pc__total">
                            $ <span class="content__cart__table__pc__total__value">
                                ${findProduct.price * checkCart[0].quanlity}
                            </span>
                        </div>
                    </td>
                    </tr>
            `

            const subPrice = findProduct.price*checkCart[0].quanlity;
            
            subTotal.innerText= subPrice
            
            totalPrice.innerText= subPrice + priceShipping;
        }

        //Cart have some product 
        else{
            checkCart.forEach(item => {
                findProduct.push(listProduct.find(product => {
                    return product.idProduct === (item.idProduct).toString();
                }))
            })
            const productCartSuccess = addQuanlityToListProduct(checkCart, findProduct)
            
            const htmlCode =  productCartSuccess.map(item => {
                return`
                <tr class="content__cart__table__pc__content__wraper">
                    <td>
                        <div class="content__cart__table__pc__icon" onclick="handelDeleteCart(${item.idProduct})">
                            <i class="ti-close"></i>
                        </div>
                    </td>
                    <td>
                        <a href="../detail-product_Page/index-detail.html">
                            <div class="content__cart__table__pc__product-image" onclick="handelDetailPage(${item.idProduct})">
                                <img src="${item.image}" alt="">
                            </div>
                        </a>
                    </td>
                    <td colspan="2">
                        
                        <div class="content__cart__table__pc__title" onclick="handelDetailPage(${item.idProduct})">
                            <a href="../detail-product_Page/index-detail.html">
                                <span>
                                    ${item.nameProduct}                             
                                </span>
                            </a>
                        </div>
                    </td>
                    <td>
                        <div class="content__cart__table__pc__price">
                            $ <span class="content__cart__table__pc__price__value">
                                ${item.price}
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="content__cart__table__pc__quanlity">
                            <input  id="input__product-${item.idProduct}" onblur="handeChangeQuanlity(${item.idProduct}, 2)" class="content__cart__table__pc__quanlity__input" type="number" min="1" max="100" value="${item.quanlity}" />
                        </div>
                    </td>
                    <td>
                        <div class="content__cart__table__pc__total">
                            $ <span class="content__cart__table__pc__total__value">
                                ${item.price * item.quanlity}
                            </span>
                        </div>
                    </td>
                </tr>
                `
                
            }).join('');
            htmlContent.innerHTML = htmlCode;
            
            subTotal.innerText = calcSubPrice(findProduct);
            totalPrice.innerText = calcTotalPrice(findProduct);

        }
    }
}

function renderDeletedProduct(data){
    const listProduct = data;
    const checkDeletedProduct = JSON.parse(localStorage.getItem('deleted'));
    var listDeletedProduct;
    const deletedContent = document.querySelector('.deleted__product')
    const deleted1Product = document.querySelector('.deleted__product__child')
    const deletedSomeProduct = document.querySelector('.deleted__product__some')
    const deletedSomeProductList = document.querySelector('.deleted__product__some__list');

    listDeletedProduct = (checkDeletedProduct === null) ? [] : checkDeletedProduct;

    if (listDeletedProduct.length > 0){
        deletedContent.classList.add('active');
        

        //1 Product In Deleted List
        if (listDeletedProduct.length === 1){
            const checkProduct = listProduct.find(item => {
                return item.idProduct === (listDeletedProduct[0].idProduct).toString();
            })

            deleted1Product.innerHTML = `
            <div class="deleted__product__icon">
            <i class="ti-info-alt"></i>
            </div>
            <div class="deleted__product__text">
                "${checkProduct.nameProduct}" removed.
            </div>
            <div class="deleted__product__link" onclick="handelUndoProduct(${checkProduct.idProduct})">
                Undo?
            </div>
            `
            deleted1Product.classList.add('active');
        }

        //Somes product in deleted list
        else{
            const filterProduct = [];

            listDeletedProduct.forEach(product => {
                filterProduct.push(listProduct.find(item => {
                    return item.idProduct === (product.idProduct).toString();
                }))
            })

            const htmlCode = filterProduct.map(item => {
                return `
                <div class="deleted__product__some__item">
                    <div class="deleted__product__some__item__icon">
                        <i class="ti-info-alt"></i>
                    </div>
                    <div class="deleted__product__some__item__text">
                        "${item.nameProduct}" removed.
                    </div>
                    <div class="deleted__product__some__item__link" onclick="handelUndoProduct(${item.idProduct})">
                        Undo?
                    </div>
                </div>
                `
            }).join('');
            
            deletedSomeProductList.innerHTML = htmlCode;
            deletedSomeProduct.classList.add('active');
        }
    }

}

function renderListLocation(data) {
    const listLocation = data;
    const htmlContent = document.querySelector('.shipping__select');

    const htmlCode = listLocation.map(e => {
        return `
            <option value="${e.type}">${e.nameLocation}</option>
        `
    }).join('');

    htmlContent.innerHTML = htmlCode;
}

start();