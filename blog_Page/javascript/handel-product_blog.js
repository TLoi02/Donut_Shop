import getBlog from '/module_Function/getBlog.js';

function start(){

    getBlog(renderBlog);
    getBlog(renderRecentBlog);
}

function renderBlog(data){
    const listBlog = data;
    const hmtlContent = document.querySelector('.blog-content__list');

    const htmlCode = listBlog.map(blog => {
        return `
        <div class="container">
            <div class="blog-content__item">
                <a href="../detail-blog_Page/index_detail-blog.html">
                    <div class="blog-content__item__image" onclick="handelBlog(${blog.idBlog})">
                        <img src="${blog.image}" alt="">
                    </div>
                </a>
                <div class="blog-content__item__text">
                    <div class="blog-content__item__text__author">
                        ${blog.author}
                    </div>
                    <a href="../detail-blog_Page/index_detail-blog.html">
                        <div class="blog-content__item__text__title" onclick="handelBlog(${blog.idBlog})">
                            ${blog.nameBlog}
                        </div>
                    </a>
                    <div class="blog-content__item__text__paragraph">
                        ${blog.p1}
                    </div>
                    <div class="blog-content__item__text__link">
                        <div class="blog-content__item__text__link__social">
                            <div class="blog-content__item__text__link__social__icon">
                                <i class="ti-facebook"></i>
                            </div>
                            <div class="blog-content__item__text__link__social__icon">
                                <i class="ti-twitter-alt"></i>
                            </div>
                            <div class="blog-content__item__text__link__social__icon">
                                <i class="ti-linkedin"></i>
                            </div>
                        </div>
                        <a href="../detail-blog_Page/index_detail-blog.html">
                            <div class="blog-content__item__text__link__content" onclick="handelBlog(${blog.idBlog})">
                                <div class="blog-content__item__text__link__content__text">
                                    READ MORE
                                </div>
                                <div class="blog-content__item__text__link__content__icon">
                                    <i class="ti-arrow-circle-right"></i>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `
    }).join('');

    hmtlContent.innerHTML = htmlCode;
}

function renderRecentBlog(data) {
    const listBlog = data;
    const hmtlContent = document.querySelector('.recent-post__content');

    const filterBlog = listBlog.filter(item =>{
        return item.new === 1;
    })

    const htmlCode = filterBlog.map(blog => {
        return `
        <div class="recent-post__content__item">
            <div class="recent-post__content__item__image" onclick="handelBlog(${blog.idBlog})">
                <a href="../detail-blog_Page/index_detail-blog.html">
                    <img src="${blog.image}" alt="">
                </a>
            </div>
            <div class="recent-post__content__item__text">
                <div class="recent-post__content__item__text__author">
                    ${blog.author}
                </div>
                <a href="../detail-blog_Page/index_detail-blog.html">
                    <div class="recent-post__content__item__text__title" onclick="handelBlog(${blog.idBlog})">
                        ${blog.nameBlog}
                    </div>
                </a>
            </div>
        </div>
        `
    }).join('');

    hmtlContent.innerHTML = htmlCode;
    handelLoading();
}


start();