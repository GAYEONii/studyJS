/*var lotto = [];
for(var i=0; i<45; i++){
    lotto[i] = i+1;
} */
var lottoNum = document.querySelectorAll('div');
var lotto = Array(45).fill().map(function(e,index){
    return index+1;
});

var input = document.querySelectorAll('input');
var inputNum = [];
for(i=0; i<6; i++){
    inputNum[i] = input[i].value;
}
console.log(inputNum);


var shuffle = [];
//splice(위치, 개수) : 위치로부터 개수만큼 배열에서 뽑기

//랜덤으로 배열 저장하기
while(lotto.length>0){
   var num = lotto.splice(Math.floor(Math.random()*lotto.length),1)[0];
   shuffle.push(num);
}


//cf) slice() 함수 이용해서 6개 숫자 가져오는 방법
/*var test = shuffle.slice(0,6);
console.log(test);
console.log(test.sort());*/


//로또 6개 가져와서 숫자에 색 입히기
function resultNum(i){
    lottoNum[i].textContent = shuffle[i];
    var colorNum = lottoNum[i].textContent;
    color(colorNum, lottoNum[i]);
}

for(var i=0; i<6; i++){
    lottoNum[i].textContent = shuffle[i];
    var colorNum = lottoNum[i].textContent;
    color(colorNum, lottoNum[i]);
}

//숫자 색 정하는 함수
function color(element, lottoNum){
    if(element<=10){
        lottoNum.style.backgroundColor='red';
    }else if(element<=20){
        lottoNum.style.backgroundColor='orange';
    }
    else if(element<=30){
        lottoNum.style.backgroundColor='yellow';
    }
    else if(element<=40){
        lottoNum.style.backgroundColor='blue';
    }else{
        lottoNum.style.backgroundColor='green';
    }
}

//보너스 볼 추첨
var bonusBall = shuffle[shuffle.length-1];
lottoNum[lottoNum.length-1].textContent = bonusBall;
color(bonusBall, lottoNum[lottoNum.length-1]);

