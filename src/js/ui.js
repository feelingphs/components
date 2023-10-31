document.addEventListener("DOMContentLoaded", function(){
    rangeBar();
    rangeSlider();

    layerOpen();
    layerClose();

    quickTop();

    fileUpload()
});





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