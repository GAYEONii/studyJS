var contents = document.body;
var form = document.getElementsByTagName('form');

var body = document.body;
var action = document.querySelector('.action');
var input = document.querySelector('input');
var text = document.querySelector('.result');
var chance = document.querySelector('#chance');
var restart = document.querySelector('#restart');

var count = 10;

function drawing(){
    var number = [1,2,3,4,5,6,7,8,9];
    var result = [];
    
    for(var i=0; i<4; i++){
        random = Math.floor(Math.random()*(9-i));
        var newNum = number.splice(random, 1);
        result.push(newNum[0]);
    }
    
    console.log(result);
    return result;    
}

//문자.split(구분자) -> 배열
//배열.join(구분자) -> 문자

//배열.indexof(값) -> 값의 위치를 알 수 있음 (없다면 -1)


var answer = drawing();

//숫자 입력 후 입력 버튼 클릭 시
action.addEventListener('submit',function (e){
    e.preventDefault();
    score(answer);
});

//strike, ball 판단
function score(answer){
    var word = input.value;
    if(word===answer.join('')){
        text.textContent='홈런!!';
    } else{
        var wordArray = word.split('');
        
        var strike = 0;
        var ball = 0;
        for(var i=0;i<4;i++){
            if(answer.indexOf(Number(wordArray[i]))!==-1){
                if(Number(wordArray[i])===answer[i]){
                    strike++;
                } else{
                    ball++;
                }
            }
        }
        text.textContent=strike+'스트라이크 '+ball+'볼';
        countFunc(count);
        count--;
    }
    input.value='';
}

//다시 시작 버튼 클릭 시
function button_click(){
    count = 10;
    input.value='';
    answer = drawing();
    score(answer);
}

//남은 기회 count
function countFunc(count){
    if(count>0){
        chance.textContent='남은 기회: '+count+'번';
        
    } else{
        chance.textContent='남은 기회: 0번';
        text.textContent='실패ㅠㅠ';
    }
}