document.addEventListener("DOMContentLoaded", function(){
    stickyTab();
    tabActive();


})

document.addEventListener("scroll", function(){
    
})

const anchor = document.querySelector(".yp-anchor-tab");
const anchorItem = document.querySelectorAll(".yp-tab-item");
const anchorCont = document.querySelector(".yp-content-wrap").children;
const anchorHeight = anchor.clientHeight;

function stickyTab() {

    anchorItem.forEach(function(e, i) {
        anchorItem[i].addEventListener("click", function(e){
            e.preventDefault();

            const anchorBox = anchorCont[i].offsetTop - anchorHeight;
            window.scrollTo({top:anchorBox, left:0, behavior: 'smooth'});

            anchorItem.forEach(function(e, i) {
                anchorItem[i].classList.remove("on");
            })
            anchorItem[i].classList.add("on");
        })
    })
}

function tabActive() {

    window.addEventListener("scroll", function(){
        console.log(window.scrollY);
        console.log(anchorCont[0].offsetTop);

        // if(window.scrollY = anchorCont[0].offsetTop) {
        //     console.log('t');
        // } else {
        //     console.log('f');
        // }

    })

    
}


const slide = ['.yp-yphaus-slide', '.yp-vrtour-slide01', 'yp-vrtour-slide02'];
for(let i = 0; i < slide.length; i++){
    const swiper = new Swiper(slide[i], {
        direction: 'horizontal',
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        a11y: {
            prevSlideMessage: '이전',
            nextSlideMessage: '다음',
            slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다. ',
        },
    });
}

const serialContainer = document.querySelector(".yp-yphaus-serials");
const serialObject = document.querySelectorAll(".object-serials");

