function renderValueCartIcon(){
    const value = (JSON.parse(localStorage.getItem('cart'))).length;
    
    const htmlContent = document.querySelectorAll('.product-pc__list__cart-value__content');

    htmlContent.forEach(html => {
        html.innerText = value;
    })
}

export default renderValueCartIcon;