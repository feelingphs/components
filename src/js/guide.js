document.addEventListener("DOMContentLoaded", function(){
    
    rangeBar();
    rangeSlider();

    layerOpen();
    layerClose();

    quickTop();

    fileUpload();

    stickyTab();

    tab();
    
});

document.addEventListener("click", function(e){
    dropdown(e);
    
});

// tab
function tab() {
    const tabGroups = document.querySelectorAll('[data-role="tab"]');

    if(!!tabGroups){
        tabGroups.forEach(function(el, i){
            const tabs = el.querySelectorAll('[role="tablist"]');
            const tabContWrap = el.querySelectorAll('.tabcont_wrap');
    
            for(let i = 0 ; i < tabs.length; i++){
                const tab = tabs[i].querySelectorAll('.tab_item');
                const tabCont = tabContWrap[i].children;
    
                for(let j = 0; j < tab.length; j++){
                    tab[j].addEventListener('click', function(){
                        for(let k= 0; k < tab.length; k++){
                            tab[k].classList.remove('active');
                            tabCont[k].classList.remove('active');
                        }
                        tab[j].classList.add('active');
                        tabCont[j].classList.add('active');
                    });
                }
            }
        });
    }
}

// anchor tab
const anchor = document.querySelector(".anchor_tab_area");
const anchorItem = document.querySelectorAll(".anchor_item");
const anchorCont = document.querySelector(".tabpanel_wrap").children;
const anchorHeight = anchor.clientHeight;

function stickyTab() {
    if(!!anchor){
        anchorItem.forEach(function(e, i) {
            anchorItem[i].addEventListener("click", function(e){
                e.preventDefault();
                const anchorBox = anchorCont[i].offsetTop - anchorHeight;
                window.scrollTo({top:anchorBox, left:0, behavior: 'smooth'});
            })
        })
    
        window.addEventListener("scroll", function(){
            scrollAction();
        })
    }
}

function scrollAction() {
    if(!!anchor){
        anchorItem.forEach(function(e, i) {
            anchorItem[i].classList.remove("on");
            if(i == anchorItem.length - 1) {
                if(window.scrollY >= anchorCont[i].offsetTop - anchorHeight) {
                    anchorItem[i].classList.add("on");
                }
            } else {
                if(window.scrollY >= anchorCont[i].offsetTop - anchorHeight && window.scrollY < anchorCont[i + 1].offsetTop - anchorHeight) {
                    anchorItem[i].classList.add("on");
                }
            }
        })
    }
}

// slide(normal)
const slide = ['.yp-yphaus-slide'];
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

// toggle
const slideUp = (target, duration = 300) => {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;

    window.setTimeout(() => {
        target.style.display = "none";
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
    }, duration);
};
  
const slideDown = (target, duration = 300) => {
    target.style.removeProperty("display");
    const computedDisplay = window.getComputedStyle(target).display;
    const display = computedDisplay === "none" ? "block" : computedDisplay;
    target.style.display = display;

    const height = target.offsetHeight;

    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = "border-box";
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");

    window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
    }, duration);
};
  
const slideToggle = (target, duration = 300) => {
    if (window.getComputedStyle(target).display === "none") {
        return slideDown(target, duration);
    }

    return slideUp(target, duration);
};

// dropdown
function dropdown(e) {
    const optGroup = e.target.nextElementSibling;
    if(e.target.classList.contains('select')){
        slideToggle(optGroup);
    }
    
    const option = document.querySelectorAll('.select_option');
    for (let i = 0; i < option.length; i++) {
        const optionList = option[i].querySelectorAll('li');
        for (let j = 0; j < option.length; j++) {
            if(e.target == optionList[j]){
                const select = optionList[j].parentElement.previousElementSibling;
                select.textContent = '';
                select.textContent += optionList[j].textContent;
                slideUp(option[i]);
            }
        }
    }
}




// range bar
function rangeBar(){
    const rangeRail = document.querySelector(".range_rail");
    const rangeThumb = document.querySelector(".range_thumb");
    const currentValue = rangeRail.dataset.current;
    const maxValue = rangeRail.dataset.max;

    rangeThumb.innerHTML = currentValue;
    rangeThumb.style.left = "calc((100% - 30px) *" + currentValue / maxValue + ")";
    rangeRail.style.width = "calc(100% *" + currentValue / maxValue + ")";
}

// range slider
document.addEventListener("input", function() {
    rangeSlider();
});

let isDragging = null;
let originLeft = null;
let originTop = null;
let originX = null;
let originY = null;

function rangeSlider(){
    const rangeTrack = document.querySelector(".range_track");
    const rangeInput = document.querySelector(".range_input");
    const rangeSliderThumb = document.querySelector(".range_slider_thumb");
    const sliderCurrentValue = rangeInput.value;
    const sliderMaxValue = rangeInput.max;

    const {width:rangeTrackWidth, height: rangeTrackHeight} = rangeTrack.getBoundingClientRect();
    const {width:rangeSliderThumbWidth, height:rangeSliderThumbHeight} = rangeSliderThumb.getBoundingClientRect();

    rangeSliderThumb.innerHTML = sliderCurrentValue;
    rangeSliderThumb.style.left = "calc((100% - 30px) * " + sliderCurrentValue / sliderMaxValue + ")";

    rangeSliderThumb.addEventListener("mousedown", (e) => {
        isDragging = true;
        originX = e.clientX;
        originY = e.clientY;
        originLeft = rangeSliderThumb.offsetLeft;
        originTop = rangeSliderThumb.offsetTop;
    });
    rangeSliderThumb.addEventListener("mousemove", (e) => {
        if(isDragging){
            const diffX = e.clientX - originX;
            const endOfXPoint = rangeTrackWidth - rangeSliderThumbWidth;

            rangeSliderThumb.style.left = `${Math.min(Math.max(0, originLeft + diffX), endOfXPoint)}px`;
        }
    });
    rangeSliderThumb.addEventListener("mouseup", (e) => {
        isDragging = false;
    });

}

//quick btn
function quickTop () {
    const quickOpenBtn = document.getElementById("quickBtn");
    const quickLayer = document.querySelector(".quick_layer");
    quickOpenBtn.addEventListener("click", () => {
        quickLayer.classList.add("open");
    })
}

//file upload
function fileUpload() {
    for(let i = 0; i < 3; i++){
        const fileInput = document.querySelectorAll(".upload")[i];
        const fileName = document.querySelectorAll(".file_name")[i];
        fileInput.addEventListener("change", function(){
            fileName.innerHTML = fileInput.files[0].name;
        });
    }
}

//layer popup
const layerOpenBtn = document.getElementById("layerOpenBtn");
const layerCloseBtn = document.getElementById("layerCloseBtn");
const layerPopup = document.getElementById("layerPopup");
const dim = document.getElementById("dim");

function layerOpen() {
    layerOpenBtn.addEventListener("click", () => {
        layerPopup.style.display = "block";
        dim.style.display = "block";
    });
}
function layerClose() {
    layerCloseBtn.addEventListener("click", () => {
        layerPopup.style.display = "none";
        dim.style.display = "none";
    })
}

// 최상단 이동
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', function(){
    if(scrollY > 100){
        topBtn.style.display = 'block';
    }else {
        topBtn.style.display = 'none';
    }
});

topBtn.addEventListener('click', function(){
    window.scrollTo({left:0, top:0, behavior: 'smooth'});
});