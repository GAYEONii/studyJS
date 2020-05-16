const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greeting');

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

//이름이 localStoarge에 존재할 경우
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `hello ${text}`;
}

//이름을 localStoarge에 저장
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

//이름 입력 시 발생하는 event
function handleSubmit(e){
    e.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

//이름 입력
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', handleSubmit);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //currentUser가 존재하지 않을 경우
        askForName();    
    } else{
        //currentUser가 존재할 경우
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();