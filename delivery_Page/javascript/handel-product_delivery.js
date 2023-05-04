import getProduct from '/module_Function/getProduct.js'
import getProduct from '/module_Function/getProduct.js';
import handelFunction from '/module_Function/handelContentModule.js';

function start(){

    getProduct(renderTrendingProduct);
    handelFunction.renderValueCartIcon();

}

function renderTrendingProduct(data){
    const listProduct = data;
    const filterTrendingProduct = listProduct.filter(item => {
        return item.trending===1;
    })
    
    const htmlContent = document.querySelector('.trending__product-content');

    const htmlCode = filterTrendingProduct.map(product => {
        return `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="product-item">
               <a href="../detail-product_Page/index-detail.html" onclick="handelDetailPage(${product.idProduct})">
                    <div class="product-item__image">
                        <img src=".${product.image}" alt="">
                    </div>
               </a>
                <div class="product-item__type">
                    ${product.type}
                </div>
               <a href="../detail-product_Page/index-detail.html" onclick="handelDetailPage(${product.idProduct})">
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
    handelLoading();
}




start();