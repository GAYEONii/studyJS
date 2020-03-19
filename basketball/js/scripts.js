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
    $textElem.fadeOut(300,function(){
        //textElem.innerHTML = s;
        $textElem.html(s); 
        $textElem.fadeIn(100);
    }); //--->콜백함수 사용 (fadeOut,fadeIn이 비동기 함수이기 때문에)
}

//컴퓨터 점수 등록 함수
function updateComputerScore(score){
    computer.score += score;

    //var comScoreElem = document.getElementById('computer-score');
    var $comScoreElem = $('#computer-score');
    //comScoreElem.innerHTML = computer.score;
    $comScoreElem.html(computer.score);

    $comScoreElem.animateNumber({ number: computer.score });
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
    var diff = computer.score - user.score;

    if(diff >= 10){
        computer.percent2 = 0.8;
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

$(function(){
    showText(3);

    //setTimeout: 타이머가 만료된 뒤 함수나 지정된 코드를 실행하는 타이머를 설정
    setTimeout(function(){
        showText(2);
        setTimeout(function(){
            showText(1);
            setTimeout(function(){
                showText('컴퓨터부터 시작합니다.');
                disableComputerButtons(false);
            }, 1000);
        }, 1000);
    }, 1000);
}); //$에 함수 형태를 넣어주면 제이쿼리는 그 함수를 'DOMContentLoaded 이벤트가 발생했을 때' 실행시켜 준다.


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
    $userScoreElem.animateNumber({
        number: user.score
    });
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
