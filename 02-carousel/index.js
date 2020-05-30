const slide_item = document.querySelector('.slide:first-child');
const slide_list = document.querySelector('.slide_list');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slide_element = document.querySelectorAll('.slide_item');

const ACTIVE_CLASS = 'active';
const SIZE = slide_element[0].clientWidth;
let count = 0;

//자동 슬라이드
function slide_event(){
    const current_child = document.querySelector(`.${ACTIVE_CLASS}`);
    current_child.classList.remove(`${ACTIVE_CLASS}`);
    if(count === 4){
        slide_item.classList.add(`${ACTIVE_CLASS}`);
        count = 0;
    }
    else{
        const next_slide = current_child.nextElementSibling;
        next_slide.classList.add(`${ACTIVE_CLASS}`);
        count++;
    }
    slide_list.style.transition = "transform 0.7s";
    slide_list.style.transform = 'translate3d(' + -(SIZE*count) + 'px, 0, 0)';
}

//이전버튼, 다음버튼 가리기
function btnDisplay(){
    if(count === 0){
        prevBtn.style.display = 'none';
    }
    else if(count === 4){
        nextBtn.style.display = 'none';
    }
    else{
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
}

//prevBtn 클릭
function prevBtn_event(e){
    if(count !== 0){
        const current_child = document.querySelector(`.${ACTIVE_CLASS}`);
        current_child.classList.remove(`${ACTIVE_CLASS}`);

        const prev_slide = current_child.previousElementSibling;
        prev_slide.classList.add(`${ACTIVE_CLASS}`);
        count --;
        slide_list.style.transition = "transform 0.7s";
        slide_list.style.transform = 'translate3d(' + -(SIZE*count) + 'px, 0, 0)';
    }
}
//nextBtn 클릭
function nextBtn_event(e){
    if(count !== 4){
        const current_child = document.querySelector(`.${ACTIVE_CLASS}`);
        current_child.classList.remove(`${ACTIVE_CLASS}`);

        const next_slide = current_child.nextElementSibling;
        next_slide.classList.add(`${ACTIVE_CLASS}`);

        count ++;
        slide_list.style.transition = "transform 0.7s";
        slide_list.style.transform = 'translate3d(' + -(SIZE*count) + 'px, 0, 0)';
    }
}

//실행
function slide(){
    slide_item.classList.add('active');
    setInterval(slide_event, 2000);

    prevBtn.addEventListener('click', prevBtn_event);
    nextBtn.addEventListener('click', nextBtn_event);
}

slide();
