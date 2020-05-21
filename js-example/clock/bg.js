const body = document.querySelector('body');

const IMG_NUMBER = 5;

function paintImg(imgNumber){
    const image = new Image();
    image.src = `./img/${imgNumber}.jpg`;
    image.classList.add('bgimage');
    body.appendChild(image);
}

//이미지 이름 랜덤으로 불러오기 (1~5)
function genRandom(){
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImg(randomNumber);
}

init();