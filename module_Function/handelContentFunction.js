const modalContent = document.querySelector('.modal-nav');
const contentNav = document.querySelector('.nav__content');

function handelDeleteCart(id){
    const listProduct = JSON.parse(localStorage.getItem('cart'));
    const checkDeleted = JSON.parse(localStorage.getItem('deleted'));

    const findIndexProduct = listProduct.findIndex(product => {
        return product.idProduct === id;
    })

    //Handel product deleted
    let deletedProduct; 
    deletedProduct = (checkDeleted === null) ? [] : checkDeleted;
    if (deletedProduct.length > 1){
        const checkDeleted = deletedProduct.findIndex(item => {
            return item.idProduct === id;
        })

        if (checkDeleted === -1){
            const sliceProduct = listProduct.find(product => {
                return product.idProduct === id;
            })
            deletedProduct.push(sliceProduct);
            localStorage.setItem('deleted',JSON.stringify(deletedProduct));
        }
        else{
            const sliceProduct = listProduct.find(product => {
                return product.idProduct === id;
            })
            
            deletedProduct.splice(checkDeleted,1, sliceProduct)
            localStorage.setItem('deleted',JSON.stringify(deletedProduct));
        }
    }
    else{ 
        const sliceProduct = listProduct.find(product => {
            return product.idProduct === id;
        })
        deletedProduct.push(sliceProduct);
        localStorage.setItem('deleted',JSON.stringify(deletedProduct));
    }


    //Handel array product after delete
    listProduct.splice(findIndexProduct,1);
    localStorage.setItem('cart',JSON.stringify(listProduct));
    location.reload();

}

function handelCartLayout(){
    const htmlContent = document.querySelector('.cart-pc__layout');

    htmlContent.classList.toggle('active')
}

function handelNavMobile(){
    modalContent.classList.add('active');
    contentNav.style.left = 0;
}

function handelCloseNavMobile(){
    contentNav.style.left = '-100%';
    modalContent.classList.remove('active');
}

function handelSubmitSubcribe(){
    const inputValue = (document.querySelector('.submit-form__input')).value;
    const htmlContent = document.querySelector('.submit__form__type')
    const regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (inputValue.trim() === ''){
        htmlContent.innerText = 'The field is required.'
    }
    else{
        if (regexMail.test(inputValue.trim())){
            htmlContent.innerText = 'You have successfully subscribed !';
            document.querySelector('.submit-form__input').value = '';
        }
        else{
            htmlContent.innerText = 'The e-mail address entered is invalid.'
        }

    }
}

