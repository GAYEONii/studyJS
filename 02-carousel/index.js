const view_slide = document.querySelector('.view_slide');
const slide_item = document.querySelectorAll('.slide');
const first = document.querySelector('.slide_item_1:first-child');
const first_slide = first.parentElement;
const check_btn = document.querySelectorAll('.check_btn');

const ACTIVE_CLASS = 'active';
const ACTIVE_BTN = 'active_btn';
const SLIDE_LEN = slide_item.length - 2; //슬라이드 개수 5
const SIZE = first.clientWidth; //한 슬라이드 사이즈 1000px

let count = 0;

//처음 => 슬라이드 1이 표시
function first_setting(){
  count = 1;
  first_slide.classList.add(`${ACTIVE_CLASS}`);
  check_btn[count-1].classList.add(`${ACTIVE_BTN}`);
}

//다음슬라이드
function next_target(count){
  const current_slide = document.querySelector(`.${ACTIVE_CLASS}`);
  count++;
  current_slide.classList.remove(`${ACTIVE_CLASS}`);
  
  //check_btn[count-1].classList.add(`${ACTIVE_BTN}`);
  slide_event(count);
  
  if(count > SLIDE_LEN){
    first_setting();
    setTimeout(function () {
      //first_slide.classList.add(`${ACTIVE_CLASS}`);
      view_slide.style.removeProperty('transition');
      view_slide.style.transform = 'translateX(' + -(SIZE * count) + 'px)';
    }, 600);
  }
  const next_slide = slide_item[count];
  next_slide.classList.add(`${ACTIVE_CLASS}`);
  
  return count;
}

function next_event(){
  
  //check_btn[count-1].classList.remove(`${ACTIVE_BTN}`);
  count = next_target(count);
  console.log(count);
}

function prev_target(count){
  const current_slide = document.querySelector(`.${ACTIVE_CLASS}`);
  const prev_slide = current_slide.previousElementSibling;
  current_slide.classList.remove(`${ACTIVE_CLASS}`);
  check_btn[count].classList.remove(`${ACTIVE_BTN}`);

  count--;
  return count;
}



function prev_event(){
  count = prev_target(count);
  slide_event(count);
}

function slide_event(count){
  view_slide.style.transition = 'transform 0.6s';
  view_slide.style.transform = 'translateX(' + -(SIZE*count) + 'px)';
}


function init(){
  first_setting();
  setInterval(next_event, 2000);
}

init();