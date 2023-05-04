import getProduct from '/module_Function/getProduct.js'
import handelFunction from '/module_Function/handelContentModule.js'

function start(){

    getProduct(renderProduct);
    getProduct(handelFunction.renderCartLayout);
    handelFunction.renderValueCartIcon();
}

function renderProduct(data){
    const listProduct = data;
    const htmlContent = document.querySelector('.trending-product__content-wrap');

    const htmlCode = listProduct.map(product => {
        return `

        <div class="col-lg-4 col-md-6 col-sm-12 ">
            <div class="trending-product">
                <div class="trending-product__type">
                    ${product.type}
                </div>
                <a href="./detail-product_Page/index-detail.html">
                    <div class="trending-product__title" onclick="handelDetailPage(${product.idProduct})">
                        ${product.nameProduct}
                    </div>
                </a>
                <a href="./detail-product_Page/index-detail.html">
                    <div class="trending-product__image" onclick="handelDetailPage(${product.idProduct})">
                        <img src="${product.image}" alt="">
                    </div>
                </a>

                <div class="trending-product__price">
                    <div class="trending-product__price__child">
                        <div class="trending-product__price__child-value">
                            <div class="trending-product__price__child__value-icon">
                                $
                            </div>
                            <div class="trending-product__price__child__value-number">
                                ${product.price}
                            </div>
                        </div>
                        <div class="trending-product__price__child-info">
                            Portion / 257 kcal
                        </div>
                    </div>
                    <div class="trending-product__price__btn" onclick="handelCartButton(${product.idProduct}, ${product.price})">
                        <i class="ti-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        
        `
    }).join('');

    htmlContent.innerHTML = htmlCode;
     
    handelLoading();
}


start();