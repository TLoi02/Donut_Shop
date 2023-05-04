import getProduct from '/module_Function/getProduct.js';
import handelFunction from '/module_Function/handelContentModule.js';

function start(){
    getProduct(handelFunction.renderCartLayout);
    handelFunction.renderValueCartIcon();
    
}


start();

