import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js'
import handelFunction from '/module_Function/handelContentModule.js'


function start(){

    handelFunction.handelScrollHeader();

}

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    autoplay: {
        delay: 2500,
    },
    
    speed: 1000,
});

start();