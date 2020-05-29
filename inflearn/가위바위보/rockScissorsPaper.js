let left = 0;
let computer = {
    주먹: '0',
    가위: '-240px',
    보: '-460px'
};
console.log(Object.entries(computer));
//Object.entries(객체) : 객체를 배열로 바꾸어주는 함수
//배열.find() : 원하는 값 찾아주는 함수, 반복문이지만 원하는 것을 찾으면 return=true하며 멈춤

setInterval(() => {
    if(left === computer.주먹){
        left = computer.가위;
    } else if(left === computer.가위){
        left = computer.보;
    } else{
        left = computer.주먹;
    }
    document.querySelector('#computer').style.background = 
    'url(img/rock-paper-scissors.jpg)' + left + ' 0';
}, 100);

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        console.log(this.textContent, Object.keys(computer));
    });
});