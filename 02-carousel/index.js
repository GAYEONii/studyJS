const slide_element = document.querySelectorAll('.slide_item');
const first = document.querySelector('.slide:first-child');
const last = document.querySelector('.slide:last-child');
const slide_list = document.querySelector('.slide_list');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const first_slide = first.nextElementSibling;
const last_slide = last.previousElementSibling;

const check_btn = document.querySelectorAll('.check_btn');

const ACTIVE_CLASS = 'active';
const SIZE = slide_element[0].clientWidth;
const S_LENGTH = slide_element.length - 2;

let count = 1;
check_btn[count-1].style.backgroundColor = 'gray';

//prev,next,자동슬라이드 하나의 함수로 구현하기
function slide_event_action(count){
    const current_child = document.querySelector(`.${ACTIVE_CLASS}`);
    const next_slide = current_child.nextElementSibling;
    if(count < 6){
        check_btn[count-1].style.backgroundColor = 'lightgray';
    }else{
        check_btn[check_btn.length-1].style.backgroundColor = 'lightgray';
    }

    count++;

    if(count < 6){
        check_btn[count-1].style.backgroundColor = 'gray';
    } else{
        check_btn[0].style.backgroundColor = 'gray';
    }
   
    slide_list.style.transition = "transform 0.6s";
    slide_list.style.transform = 'translateX(' + -(SIZE*count) + 'px)';

    current_child.classList.remove(`${ACTIVE_CLASS}`);
    
    if(count === S_LENGTH+1){
        setTimeout(function (){
            first_slide.classList.add(`${ACTIVE_CLASS}`);
            count = 1;
            
            slide_list.style.removeProperty('transition');
            slide_list.style.transform = 'translateX(' + -(SIZE*count) + 'px)';
        },600);
        
    } 
    else{
        next_slide.classList.add(`${ACTIVE_CLASS}`);
    }
}

/*//자동 슬라이드
function slide_event(){
    
    const current_child = document.querySelector(`.${ACTIVE_CLASS}`);
    const next_slide = current_child.nextElementSibling;
    if(count < 6){
        check_btn[count-1].style.backgroundColor = 'lightgray';
    }else{
        check_btn[check_btn.length-1].style.backgroundColor = 'lightgray';
    }

    count++;
    if(count < 6){
        check_btn[count-1].style.backgroundColor = 'gray';
    } else{
        check_btn[0].style.backgroundColor = 'gray';
    }
   
    slide_list.style.transition = "transform 0.6s";
    slide_list.style.transform = 'translateX(' + -(SIZE*count) + 'px)';

    current_child.classList.remove(`${ACTIVE_CLASS}`);
    
    if(count === S_LENGTH+1){
        setTimeout(function (){
            first_slide.classList.add(`${ACTIVE_CLASS}`);
            count = 1;
            
            slide_list.style.removeProperty('transition');
            slide_list.style.transform = 'translateX(' + -(SIZE*count) + 'px)';
        },600);
        
    } 
    else{
        next_slide.classList.add(`${ACTIVE_CLASS}`);
    }
    
}
*/

//prevBtn 클릭
function prevBtn_event(e){
    count --;
    
    const current_child = document.querySelector(`.${ACTIVE_CLASS}`);
    current_child.classList.remove(`${ACTIVE_CLASS}`);

    slide_list.style.transition = "transform 0.6s";
    slide_list.style.transform = 'translateX(' + -(SIZE*count) + 'px)';
    
    if(count === -1){
        last_slide.classList.add(`${ACTIVE_CLASS}`);
        count = S_LENGTH;
        slide_list.style.removeProperty('transition');
        slide_list.style.transform = 'translateX(' + -(SIZE*count) + 'px)';
    }
    else{
        const prev_slide = current_child.previousElementSibling;
        prev_slide.classList.add(`${ACTIVE_CLASS}`);
    }
}
/*
//nextBtn 클릭
function nextBtn_event(e){
    count ++;

    const current_child = document.querySelector(`.${ACTIVE_CLASS}`);
    current_child.classList.remove(`${ACTIVE_CLASS}`);

    slide_list.style.transition = "transform 0.6s";
    slide_list.style.transform = 'translateX(' + -(SIZE*count) + 'px)';

    if(count === 6){
        first_slide.classList.add(`${ACTIVE_CLASS}`);
        count = 0;
        slide_list.style.removeProperty('transition');
        slide_list.style.transform = 'translateX(' + -(SIZE*count) + 'px)';
    }
    else{
        const next_slide = current_child.nextElementSibling;
        next_slide.classList.add(`${ACTIVE_CLASS}`);
    }
    
}*/

function slide_event(){
    slide_event_action(count);
}
function nextBtn_event(){
    slide_event_action(count);
}
//실행
function slide(){
    first_slide.classList.add(`${ACTIVE_CLASS}`);
    setInterval(slide_event, 2000);
    prevBtn.addEventListener('click', prevBtn_event);
    nextBtn.addEventListener('click', nextBtn_event);
}

slide();

//함수 만들어서 코드 리펙토링하기