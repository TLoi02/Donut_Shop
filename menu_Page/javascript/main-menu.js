function start(){

    handelScrollHeader();

}

function handelScrollHeader(){
    const headerScroll = document.querySelector('.header-scroll');

    window.onscroll=()=>{
        const offset = window.pageYOffset;
        if (offset >= 300)
            headerScroll.classList.add('active');
        else
            headerScroll.classList.remove('active');

    }
}

function handelMenuButton(){
    const productContent = document.querySelector('.product');

    productContent.scrollIntoView({behavior: "smooth"});
}


start();