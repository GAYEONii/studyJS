var comScore = 0;
var userScore = 0;
var isComputerTurn = true; //누구의 차례인지 정하는 변수
var shotsLeft = 15; //남은 횟수

//사용자 차례인지, 성공인지 실패인지 알려주는 텍스트 함수
function showText(s){
    var textElem = document.getElementById('text');
    textElem.innerHTML = ('- '+s+' -');
}

//컴퓨터 점수 등록 함수
function updateComputerScore(score){
    comScore += score;

    var comScoreElem = document.getElementById('computer-score');
    comScoreElem.innerHTML = comScore;
}

//컴퓨터 버튼 활성화 or 비활성화
function disableComputerButons(flag){
    var computerButtons = document.getElementsByClassName('btn-computer');

    for(var i=0; i<computerButtons.length; i++){
        computerButtons[i].disabled = flag;
    }
}

//사용자 버튼 활성화 or 비활성화
function disableUserButtons(flag){
    var userButtons = document.getElementsByClassName('btn-user');

    for(var i=0; i<userButtons.length; i++){
        userButtons[i].disabled = flag;
    }
}

function onComputerShoot(){
    if(!isComputerTurn) //컴퓨터 차례가 아니라면 return
        return;

    var shootType = Math.random() < 0.5 ? 2:3;
    if(shootType === 2){
        if(Math.random()<0.5){
            showText('컴퓨터가 2점슛을 성공시켰습니다.');
            updateComputerScore(2);
        }
        else{
            showText('컴퓨터가 2점슛을 실패했습니다.');
        }
    }
    else{
        if(Math.random()<0.33){
            showText('컴퓨터가 3점슛을 성공시켰습니다.');
            updateComputerScore(3);
        }
        else{
            showText('컴퓨터가 3점슛을 실패했습니다.');
        }
    }
    
    isComputerTurn = false;

    disableComputerButons(true);
    disableUserButtons(false);
}

//사용자 점수 등록 함수
function updateUserScore(score){
    userScore += score;

    var comScoreElem = document.getElementById('user-score');
    comScoreElem.innerHTML = userScore;
}

function onUserShoot(shootType){

    if(isComputerTurn)
        return;

    if(shootType === 2){
        if(Math.random()<0.5){
            showText('사용자가 2점슛을 성공시켰습니다.');
            updateUserScore(2);
        }
        else{
           showText('사용자가 2점슛을 실패했습니다.');
        }
    }
    else{
        if(Math.random()<0.33){
            showText('사용자가 3점슛을 성공시켰습니다.');
            updateUserScore(3);
        }
        else{
            showText('사용자가 3점슛을 실패했습니다.');
        }
    }

    isComputerTurn = true;

    disableComputerButons(false);
    disableUserButtons(true);

    shotsLeft--;

    var shotsLeftElem = document.getElementById('shots-left');
    shotsLeftElem.innerHTML = shotsLeft;

    if(shotsLeft===0){
        if(userScore > comScore){
            showText('승리했습니다^^');
        }
        else if(userScore < comScore){
            showText('졌습니다 ㅠㅠ');
        }
        else{
            showText('비겼습니다.');
        }

        disableComputerButons(true);
        disableUserButtons(true);
    }

}