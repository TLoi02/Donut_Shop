import getProduct from '/module_Function/getProduct.js'
import renderValueCartIcon from '/module_Function/renderValueCartIcon.js'
import renderCartColumn from '/module_Function/renderCartColumn.js'

function start() {
    getProduct(renderProduct);
    getProduct(renderCartColumn);
    renderValueCartIcon();

}

function renderProduct(data) {
    const htmlContent = document.querySelector('.content-product');

    const htmlCode = data.map(product => {
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
                </a>
            </div>
        `
    }).join('');

    htmlContent.innerHTML=htmlCode;
    handelLoading();
}





start();