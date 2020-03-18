function onComputerShoot(){
    var comScore = 0;
    var textElem = document.getElementById('text');
    var comScoreElem = document.getElementById('computer-score');

    var shootType = Math.random() < 0.5 ? 2:3;
    if(shootType === 2){
        if(Math.random()<0.5){
            textElem.innerHTML = '컴퓨터가 2점슛을 성공시켰습니다.';
            comScore+=2;
        }
        else{
            textElem.innerHTML = '컴퓨터가 2점슛을 실패했습니다.';
        }
    }
    else{
        if(Math.random()<0.33){
            textElem.innerHTML = '컴퓨터가 3점슛을 성공시켰습니다.';
            comScore+=3;
        }
        else{
            textElem.innerHTML = '컴퓨터가 3점슛을 실패했습니다.';
        }
    }
    comScoreElem.innerHTML = comScore;
}

