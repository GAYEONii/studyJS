var computer = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

var user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

var game = {
    //누구의 차례인지 정하는 변수
    isComputerTurn: true, 
    //남은 횟수
    shotsLeft: 15 
};

//사용자 차례인지, 성공인지 실패인지 알려주는 텍스트 함수
function showText(s){
    //var textElem = document.getElementById('text');
    var $textElem = $('#text');
    //textElem.innerHTML = s;
    $textElem.html(s); 
}

//컴퓨터 점수 등록 함수
function updateComputerScore(score){
    computer.score += score;

    //var comScoreElem = document.getElementById('computer-score');
    var $comScoreElem = $('#computer-score');
    //comScoreElem.innerHTML = computer.score;
    $comScoreElem.html(computer.score);
}

//컴퓨터 버튼 활성화 or 비활성화
function disableComputerButtons(flag){
    /*var computerButtons = document.getElementsByClassName('btn-computer');

    for(var i=0; i<computerButtons.length; i++){
        computerButtons[i].disabled = flag;
    }*/
    $('.btn-computer').prop('disabled',flag);
}

//사용자 버튼 활성화 or 비활성화
function disableUserButtons(flag){
    /*var userButtons = document.getElementsByClassName('btn-user');

    for(var i=0; i<userButtons.length; i++){
        userButtons[i].disabled = flag;
    }*/
    $('.btn-user').prop('disabled',flag);
}
function updateAI(){
    var diff = user.score - computer.score;

    if(diff >= 10){
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    }
    else if(diff >= 6){
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    }
    
    else if(diff <= - 10){
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    }
    else if(diff <= -6){
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    }
}

//컴퓨터
function onComputerShoot(){
    if(!game.isComputerTurn) 
        return; //컴퓨터 차례가 아니라면 return

    updateAI();

    var shootType = Math.random() < 0.5 ? 2:3;
    if(Math.random()<computer['percent'+shootType]){
        showText('컴퓨터가 '+shootType+'점슛을 성공시켰습니다.');
        updateComputerScore(shootType);
    }
    else{
        showText('컴퓨터가 '+shootType+'점슛을 실패했습니다.');
    }
    
    game.isComputerTurn = false;

    disableComputerButtons(true);
    disableUserButtons(false);
}

//사용자 점수 등록 함수
function updateUserScore(score){
    user.score += score;

    //var userScoreElem = document.getElementById('user-score');
    var $userScoreElem = $('#user-score');
    //userScoreElem.innerHTML = user.score;
    $userScoreElem.html(user.score);
}

//사용자
function onUserShoot(shootType){

    if(game.isComputerTurn)
        return;

    if(Math.random()<user['percent'+shootType]){
        showText(shootType+'점슛이 성공했습니다.');
        updateUserScore(shootType);
    }
    else{
        showText(shootType+'점슛이 실패했습니다.');
    }

    game.isComputerTurn = true;

    disableComputerButtons(false);
    disableUserButtons(true);

    game.shotsLeft--;

    //var shotsLeftElem = document.getElementById('shots-left');
    var $shotsLeftElem = $('#shots-left');
    //shotsLeftElem.innerHTML = game.shotsLeft;
    $shotsLeftElem.html(game.shotsLeft);

    if(game.shotsLeft===0){
        if(user.score > computer.score){
            showText('승리했습니다^^');
        }
        else if(user.score < computer.score){
            showText('졌습니다 ㅠㅠ');
        }
        else{
            showText('비겼습니다.');
        }

        disableComputerButtons(true);
        disableUserButtons(true);
    }

}