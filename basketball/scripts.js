var comScore = 0;
var userScore = 0;
var isComputerTurn = true; //누구의 차례인지 정하는 변수
var shotsLeft = 15; //남은 횟수

function onComputerShoot(){
    if(!isComputerTurn) //컴퓨터 차례가 아니라면 return
        return;

    var textElem = document.getElementById('text');
    var comScoreElem = document.getElementById('computer-score');

    var shootType = Math.random() < 0.5 ? 2:3;
    if(shootType === 2){
        if(Math.random()<0.5){
            textElem.innerHTML = '컴퓨터가 2점슛을 성공시켰습니다.';
            comScore+=2;
            comScoreElem.innerHTML = comScore;
        }
        else{
            textElem.innerHTML = '컴퓨터가 2점슛을 실패했습니다.';
        }
    }
    else{
        if(Math.random()<0.33){
            textElem.innerHTML = '컴퓨터가 3점슛을 성공시켰습니다.';
            comScore+=3;
            comScoreElem.innerHTML = comScore;
        }
        else{
            textElem.innerHTML = '컴퓨터가 3점슛을 실패했습니다.';
        }
    }
    
    isComputerTurn = false;

    var computerButtons = document.getElementsByClassName('btn-computer');
    for(var i=0; i<computerButtons.length; i++){
        computerButtons[i].disabled = true;
    }

    var userButtons = document.getElementsByClassName('btn-user');
    for(var i=0; i<userButtons.length; i++){
        userButtons[i].disabled = false;
    }
}

function onUserShoot(shootType){

    if(isComputerTurn)
        return;

    var textElem = document.getElementById('text');
    var userScoreElem = document.getElementById('user-score');

    if(shootType === 2){
        if(Math.random()<0.5){
            textElem.innerHTML = '사용자가 2점슛을 성공시켰습니다.';
            userScore+=2;
            userScoreElem.innerHTML = userScore;
        }
        else{
            textElem.innerHTML = '사용자가 2점슛을 실패했습니다.';
        }
    }
    else{
        if(Math.random()<0.33){
            textElem.innerHTML = '사용자가 3점슛을 성공시켰습니다.';
            userScore+=3;
            userScoreElem.innerHTML = userScore;
        }
        else{
            textElem.innerHTML = '사용자가 3점슛을 실패했습니다.';
        }
    }

    isComputerTurn = true;

    var computerButtons = document.getElementsByClassName('btn-computer');
    for(var i=0; i<computerButtons.length; i++){
        computerButtons[i].disabled = false;
    }

    var userButtons = document.getElementsByClassName('btn-user');
    for(var i=0; i<userButtons.length; i++){
        userButtons[i].disabled = true;
    }

    shotsLeft--;

    var shotsLeftElem = document.getElementById('shots-left');
    shotsLeftElem.innerHTML = shotsLeft;

    if(shotsLeft===0){
        if(userScore > comScore){
            textElem.innerHTML = '승리했습니다^^';
        }
        else if(userScore < comScore){
            textElem.innerHTML = '졌습니다 ㅠㅠ';
        }
        else{
            textElem.innerHTML = '비겼습니다.';
        }

        for(var i=0; i<computerButtons.length; i++){
            computerButtons[i].disabled = true;
        }
        for(var i=0; i<userButtons.length; i++){
            userButtons[i].disabled = true;
        }
    }

}