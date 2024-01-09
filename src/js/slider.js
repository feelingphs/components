const slideContainer = document.querySelectorAll('.slide-container')[0];
const slideBox = document.querySelectorAll('.slide-box');
const nextBtn = document.querySelector('.slide-next');
const prevBtn = document.querySelector('.slide-prev');
const slideIdxDummy = document.querySelector('.slide-idx-button');
const idxBtn = slideIdxDummy.children;
        
let slideNumber = 0;

function slide(e) {
    slideContainer.style.width = slideBox.length * 100 + "vw";
    slideBox[0].classList.add('active');

    slideIdxDummy.innerHTML = "";
    for(let i = 0; i < slideBox.length; i++) {
        slideIdxDummy.innerHTML += `<button class="slide-idx" data-idx="${i}">${i}</button>`;
        slideBox[i].setAttribute("data-slide", i);
    }

    idxBtn[0].classList.add("on");

    nextBtn.addEventListener("click", function(e) {
        slideNext(e);
    });

    prevBtn.addEventListener("click", function(e) {
        slidePrev(e);
    });

    slideIdxDummy.addEventListener("click", function(e) {
        slideIdxButton(e);
    });

}

function slideIdxButton(e) {
    for(let i = 0; i < slideBox.length; i++) {
        if(e.target == idxBtn[i]){

            for(let j = 0; j < idxBtn.length; j++) {
                slideBox[j].classList.remove('active');
                idxBtn[j].classList.remove('on');
            }
            
            slideBox[i].classList.add('active');
            idxBtn[i].classList.add('on');

            slideNumber = i;

            slideContainer.style.transform = "translate(" + -slideNumber + "00vw" + ", 0)";
        }
    }
}

function slideNext(e) {
    const idxBtn = slideIdxDummy.children;
    if(e.target == nextBtn){
        slideNumber++;
        console.log(slideNumber);

        for(let i = 0; i < idxBtn.length; i++) {
            slideBox[i].classList.remove('active');
            idxBtn[i].classList.remove('on');
        }
        slideBox[slideNumber].classList.add('active');
        idxBtn[slideNumber].classList.add('on');

        slideContainer.style.transform = "translate(" + -slideNumber + "00vw" + ", 0)";
    }
}
function slidePrev(e) {
    const idxBtn = slideIdxDummy.children;
    if(e.target == prevBtn){
        slideNumber--;

        for(let i = 0; i < idxBtn.length; i++) {
            slideBox[i].classList.remove('active');
            idxBtn[i].classList.remove('on');
        }
        slideBox[slideNumber].classList.add('active');
        idxBtn[slideNumber].classList.add('on');
        
        slideContainer.style.transform = "translate(" + -slideNumber + "00vw" + ", 0)";
    }
}

// 슬라이드 루프 만들기