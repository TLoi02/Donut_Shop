
function start(){

    renderProduct();
    renderAddress();

}

function renderAddress(){
    const htmlInput = document.querySelector('#form_district-name');
    const getShipping = JSON.parse(localStorage.getItem('shipping'));

    if (getShipping != null){
        htmlInput.value = getShipping.valueAddress;
        htmlInput.readOnly = true;
        htmlInput.style.borderColor = 'green';
        htmlInput.style.outlineColor = 'green';
    }
}

function renderProduct(){
    const listCart = JSON.parse(localStorage.getItem('cart'))
    const htmlContent = document.querySelector('.order__content__table__product');
    const checkLength = listCart.length;


    if (checkLength> 0){
        if ( checkLength == 1){

        }
        else{
            const htmlCode = listCart.map(product => {
                return `
                <tr>
                    <td>
                        ${product.idProduct}
                    </td>
                    <td>${product.quanlity * product.price}</td>
                </tr>  
                `
            }).join('');

  

        //    htmlContent.innerHTML = htmlCode;


        }
    }

}

start();
