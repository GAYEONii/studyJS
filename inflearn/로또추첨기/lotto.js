/*var lotto = [];
for(var i=0; i<45; i++){
    lotto[i] = i+1;
} */
var lottoNum = document.querySelectorAll('div');
var lotto = Array(45).fill().map(function(e,index){
    return index+1;
});

var shuffle = [];
//splice(위치, 개수) : 위치로부터 개수만큼 배열에서 뽑기

//랜덤으로 배열 저장하기
while(lotto.length>0){
   var num = lotto.splice(Math.floor(Math.random()*lotto.length),1)[0];
   shuffle.push(num);
}
console.log(shuffle);

for(var i=0; i<6; i++){
    lottoNum[i].textContent = shuffle[i];
    var colorNum = Number(lottoNum[i].textContent);

    if(color(colorNum)===1){
        lottoNum[i].style.backgroundColor='red';
    }else if(color(colorNum)===2){
        lottoNum[i].style.backgroundColor='orange';
    }else if(color(colorNum)===3){
        lottoNum[i].style.backgroundColor='yellow';
    }
    else if(color(colorNum)===4){
        lottoNum[i].style.backgroundColor='blue';
    }
    else if(color(colorNum)===5){
        lottoNum[i].style.backgroundColor='green';
    }
}

//숫자 색
function color(element){
    if(element<=10){
        return 1;
    }else if(element>=11 && element<=20){
        return 2;
    }
    else if(element>=21 && element<=30){
        return 3;
    }
    else if(element>=31 && element<=40){
        return 4;
    }else{
        return 5;
    }
}