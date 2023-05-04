import getBlog from '/module_Function/getBlog.js';

function start(){

    getBlog(renderRecentBlog);
    getBlog(renderContent);
}

function renderContent (data){
    const listBlog = data;
    const getIdCLick = localStorage.getItem('blog');
    const htmlContentTitle = document.querySelector('.title-blog')
    const htmlContent = document.querySelector('.content__text')

    const findBlog = listBlog.find(blog => {
        return blog.idBlog === getIdCLick;
    })
    
    document.title = findBlog.nameBlog;

    htmlContentTitle.innerHTML = `
        <span class="title-blog__text">
            ${findBlog.nameBlog}
        </span>
    `

    htmlContent.innerHTML = `

        <span>
            ${findBlog.p1}
        </span>
        <span>
           ${findBlog.p2}
        </span>

        <div class="content__text__main__text">
           ${findBlog.main}
        </div>
        <span>
            ${findBlog.p3}
        </span>
        <span>
            ${findBlog.p4}
        </span>
    
    `


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
                    <img src=".${blog.image}" alt="">
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