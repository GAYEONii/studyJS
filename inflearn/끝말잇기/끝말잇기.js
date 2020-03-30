var 바디 = document.body;
var 단어 = document.createElement('div');
//createElement: HTML의 div태그 만들기
단어.textContent = '제로초'; //태그 안에 들어가는 글자
document.body.append(단어); //body안에 추가

var 폼 = document.createElement('form');
document.body.append(폼);
var 입력창 = document.createElement('input');
폼.append(입력창);
var 버튼 = document.createElement('button');
버튼.textContent = '입력!!';
폼.append(버튼);
var 결과창 = document.createElement('div');
document.body.append(결과창);


//submit: enter치면 새로고침됨
//preventDefault()로 새로고침 막아줌
//매개변수 e <-브라우저가 알아서
폼.addEventListener('submit', function 콜백함수(e){
    e.preventDefault();
    if(단어.textContent[단어.textContent.length -1]===입력창.value[0]){
        결과창.textContent='딩동댕';
        단어.textContent=입력창.value;
        입력창.value='';
        입력창.focus();
    }else{
        결과창.textContent='땡';
        입력창.value='';
        입력창.focus();
    }
});


/*var word = '제로초'

while(true){
    var answer = prompt(word);
    if(word[word.length -1]===answer[0]){
        alert('딩동댕');
        word = answer;
    } else{
        alert('땡');
    }
}*/