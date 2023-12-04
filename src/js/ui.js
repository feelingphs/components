document.addEventListener("DOMContentLoaded", function(){
    rangeBar();
    rangeSlider();

    layerOpen();
    layerClose();

    quickTop();

    fileUpload();

    stickyTab();
    
});

const anchor = document.querySelector(".anchor_tab_area");
const anchorItem = document.querySelectorAll(".anchor_item");
const anchorCont = document.querySelector(".tabpanel_wrap").children;
const anchorHeight = anchor.clientHeight;

function stickyTab() {
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

function scrollAction() {
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