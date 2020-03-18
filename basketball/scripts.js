var comScore = 0;
var userScore = 0;
var isComputerTurn = true; //누구의 차례인지 정하는 변수

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
}