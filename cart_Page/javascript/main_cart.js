function start(){

    handelShippingLayout();
    handelLoading();
}

function handelLoading(){
    const loadingContent = document.querySelector('.loading');

    window.onload = loadingContent.classList.remove('active');

}

function handelShippingLayout(){
    const htmlContentEmpty = document.querySelector('.shipping__content__empty__wrapper');
    const htmlContentPrice = document.querySelector('.shipping__price')
    const htmlContentLocation = document.querySelector('.shipping__loaction');
    const htmlPriceShipping = document.querySelector('.shipping__priece__value');
    const check = JSON.parse(localStorage.getItem('shipping'));
    var localShipping; 

    localShipping = (check === null) ? [] : check;

    //console.log(localShipping)

    if (check === null){
        htmlContentEmpty.classList.add('active');
    }
    else{
        htmlContentLocation.innerText = check.valueAddress;
        htmlPriceShipping.innerText = check.price;


        htmlContentPrice.classList.add('active');
    }
    

}

function handelShippingChild(){
    const shippingContent = document.querySelector('.shipping');

    shippingContent.classList.toggle('active');
}

function handelChoices(){
    const htmlContentEmpty = document.querySelector('.shipping__content__empty__wrapper');
    const htmlContentPrice = document.querySelector('.shipping__price')

    htmlContentEmpty.classList.add('active');
    htmlContentPrice.classList.remove('active');
}

function handelChangeAddress(){
    const e = document.querySelector('.shipping__select');
    //console.log(value);
    const value = parseInt(e.value);
    let priceShipping;
        switch (value){
            case 1:
                priceShipping = 0
                break;
            case 2: 
                priceShipping = 1
                break;
            case 3: 
                priceShipping = 2
                break;
        }
    const content = e.options[e.selectedIndex].text;
    const objectSelect = {
        valueAddress: content,
        price: priceShipping
    }

    localStorage.setItem('shipping', JSON.stringify(objectSelect));
    location.reload();
}


start();