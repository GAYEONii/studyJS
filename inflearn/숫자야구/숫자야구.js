var 바디 = document.body;

var 숫자후보 = [1,2,3,4,5,6,7,8,9];
var 숫자배열 = [];

var strike=0;
var ball=0;
var count=5;
//Math.floor() :주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환
for(var i = 0; i<4; i++){
    ran=Math.floor(Math.random()*(9-i));
    var 뽑은것 = 숫자후보.splice(ran,1)[0];
    숫자배열.push(뽑은것);
}
console.log(숫자배열);
var 결과 = document.createElement('h3');
바디.append(결과);
결과.textContent='';
var 폼 = document.createElement('form');
바디.append(폼);
var 입력창 = document.createElement('input');
폼.append(입력창);
var 버튼 = document.createElement('button');
폼.append(버튼);
var 남은기회 = document.createElement('h5');
폼.append(남은기회);
남은기회.textContent=count+'번 남았습니다.';
버튼.textContent='입력!';

폼.addEventListener('submit', function(e){
    e.preventDefault();
    var 답 = 입력창.value;

    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(Number(답[i])===숫자배열[j]){
                if(i===j){
                    strike++;
                }
                else{
                    ball++;
                }
            }
        }
    }
    if(strike===4){
        남은기회.textContent=' ';
        결과.textContent='정답입니다.';
        
        
    }
    else{
        결과.textContent=strike+' 스트라이크 '+ball+' 볼 ';
        count--;
        if(count===0){
            남은기회.textContent='실패!!ㅠㅠ 답은: '+숫자배열.join('')+'였습니다.';
            count=5;
        }
        else{
            남은기회.textContent=count+'번 남았습니다.';
        }
    }
    

    
});

/*폼.addEventListener('submit',function(e){
    e.preventDefault();
    var 답 = 입력창.value;
    if(답===숫자배열.join('')){
        결과.textContent('홈런!!');
        var 숫자후보 = [1,2,3,4,5,6,7,8,9];
        var 숫자배열 = [];

        var strike=0;
        var ball=0;
        var count=5;

        for(var i = 0; i<4; i++){
            ran=Math.floor(Math.random()*(9-i));
            var 뽑은것 = 숫자후보.splice(ran,1)[0];
            숫자배열.push(뽑은것);
        }
    } else{
        var 답배열 = 답.split("");
        for(i=0;i<4;i++){
            if(답배열[i]===숫자배열[i]){
                strike+=1;
            } else if(숫자배열[i].indexof(답배열[i])>-1){
                ball+=1;
            }
        }
    }
    결과.textContent=strike+' 스트라이크 '+ball+' 볼 ';
});
*/


//push: 마지막에 추가
//pop: 마지막 것 뽑기
//unshift: 처움에 추가
//shift: 처음 것 뽑기
//splice(위치, 개수) : 위치로부터 개수만큼 배열에서 뽑기


//위에서부터 실행되는거: 동기
//언제실행될지 모르는거: 비동기

//문자.split(구분자) -> 배열
//배열.join(구분자) -> 문자

//배열.indexof(값) -> 값의 위치를 알 수 있음 (없다면 -1)