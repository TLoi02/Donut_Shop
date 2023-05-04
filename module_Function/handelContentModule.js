//Handel Cart Layout
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

function renderCartLayout(data){
    const listProduct = data;
    const listCart = JSON.parse(localStorage.getItem('cart'));
    const contentEmpty = document.querySelector('.cart-pc__layout__noitem');
    const contentLayout = document.querySelector('.cart__pc__layout__content');
    const contentCart = document.querySelector('.cart__pc__layout__content__list');
    const totalPrice = document.querySelector('.cart__pc__layout__content__price__content__value');
    let checkCart;

    checkCart = (listCart === null ) ? [] : listCart;
    
    if (checkCart.length > 0){
        contentEmpty.classList.remove('active')
        contentLayout.classList.add('active')

        var findProduct=[];

        //Cart 1 item
        if (checkCart.lenght === 1){
            findProduct = listProduct.find(item => {
                return item.idProduct === (checkCart[0].idProduct).toString();
            })

            contentCart.innerHTML = `
            <div class="cart__pc__layout__content__item">
                <a href="./detail-product_Page/index-detail.html">
                    <div class="cart__pc__layout__content__item__image" onclick="handelDetailPage(${checkCart[0].idProduct})">
                        <img src="${findProduct.image}" alt="">
                    </div>
                </a>
                <div class="cart__pc__layout__content__item__text">
                    <a href="./detail-product_Page/index-detail.html">
                        <div class="cart__pc__layout__content__item__text__title" onclick="handelDetailPage(${checkCart[0].idProduct})">
                            ${findProduct.nameProduct}
                        </div>
                    </a>
                    <div class="cart__pc__layout__content__item__value">
                        <div class="cart__pc__layout__content__item__value__quanlity">
                            ${checkCart[0].quanlity} x
                        </div>
                        <div class="cart__pc__layout__content__item_price">
                            $ <span class="cart__pc__layout__content__item__price__value">
                                ${checkCart[0].price}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="cart__pc__layout__content__item__icon" onclick="handelDeleteCart(${checkCart[0].idProduct})">
                    <i class="ti-close"></i>
                </div>
            </div>
            `
            totalPrice.innerText = checkCart[0].price * checkCart[0].quanlity;
        }
        else{
            checkCart.forEach(item => {
                findProduct.push(listProduct.find(product => {
                    return product.idProduct === (item.idProduct).toString();
                }))
            })

            const productCartSuccess = addQuanlityToListProduct(checkCart, findProduct)

            const htmlCode = productCartSuccess.map(item => {
                return `
                <div class="cart__pc__layout__content__item">
                        <div class="cart__pc__layout__content__item__image" onclick="handelDetailPage(${item.idProduct})">
                            <img src=".${item.image}" alt="">
                        </div>
                    <div class="cart__pc__layout__content__item__text">
                            <div class="cart__pc__layout__content__item__text__title">
                                ${item.nameProduct}
                            </div>
                        <div class="cart__pc__layout__content__item__value">
                            <div class="cart__pc__layout__content__item__value__quanlity">
                                ${item.quanlity} x
                            </div>
                            <div class="cart__pc__layout__content__item_price">
                                $ <span class="cart__pc__layout__content__item__price__value">
                                    ${item.price}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="cart__pc__layout__content__item__icon" onclick="handelDeleteCart(${item.idProduct})">
                        <i class="ti-close"></i>
                    </div>
                </div>
                `
            }).join('');

            contentCart.innerHTML = htmlCode;
            totalPrice.innerText = calcTotalPrice(productCartSuccess);
        }

    }

}

//Handel Scroll Navbar
function handelScrollHeader(){
    const headerContent = document.querySelector('.nav-pc__wrap');
    const navContent = document.querySelector('.nav-pc');
    const navMobileContent = document.querySelector('.nav-mobile__wrap')

    window.onscroll=()=>{
        const offset = window.pageYOffset;

        if (offset >= 300){
            headerContent.classList.add('active');
            navContent.classList.add('active');
            navMobileContent.classList.add('active');
        }
        else{
            headerContent.classList.remove('active');
            navContent.classList.remove('active');
            navMobileContent.classList.remove('active');
        }
    }
}

//Render Value Cart
function renderValueCartIcon(){
    const value = (JSON.parse(localStorage.getItem('cart'))).length;
    
    const htmlContent = document.querySelectorAll('.product-pc__list__cart-value__content');

    htmlContent.forEach(html => {
        html.innerText = value;
    })
}

export default {renderCartLayout,
                handelScrollHeader, 
                renderValueCartIcon};