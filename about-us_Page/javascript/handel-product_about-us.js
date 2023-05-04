import getBlog from '/module_Function/getBlog.js';
import getProduct from '/module_Function/getProduct.js';
import handelFunction from '/module_Function/handelContentModule.js';


function start(){

    getBlog(renderBlog);
    getProduct(handelFunction.renderCartLayout);
    handelFunction.renderValueCartIcon();
}

function renderBlog(data){
    const listBlog = data;
    const newBlog = listBlog.filter(blog => {
        return blog.new === 1;
    })

    const htmlContent = document.querySelector('.blog__content__list');
    const htmlCode  = newBlog.map(item => {
        return `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="blog__item">
                    <div class="blog__item__image" onclick="handelBlog(${item.idBlog})">
                        <a href="../detail-blog_Page/index_detail-blog.html">
                            <img src="${item.image}" alt="">
                        </a>
                    </div>
                    <div class="blog__item__content">
                        <div class="blog__item__content__author">
                            ${item.author}
                        </div>
                        <a href="../detail-blog_Page/index_detail-blog.html">
                            <div class="blog__item__content__title" onclick="handelBlog(${item.idBlog})">
                                ${item.nameBlog}
                            </div>
                        </a>
                        <a href="../detail-blog_Page/index_detail-blog.html">
                            <div class="blog__item__content__link" onclick="handelBlog(${item.idBlog})">
                                <div class="blog__item__content__link__text">
                                    READ MORE
                                </div>
                                <div class="blog__item__content__link__icon">
                                    <i class="ti-arrow-circle-right"></i>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `
    }).join('');

    htmlContent.innerHTML = htmlCode;

    handelLoading();
}

start();