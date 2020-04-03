var trs = document.querySelectorAll('tr');
var tds = document.querySelectorAll('td');
var text = document.querySelector('div');

var line = []; //줄
var block = []; //칸
var k=0;
var turn = 'X';

for(var i=0; i<3; i++){
    line.push(trs[i]);
    block.push([]);
    for(var j=0; j<3; j++){
        block[i].push(tds[k]);
        k++;
    }
}

for(var i=0; i<9; i++){
    tds[i].addEventListener('click', function(e){
        text.textContent='';
        var lineNum = line.indexOf(e.target.parentNode); //몇줄
        var blockNum = block[lineNum].indexOf(e.target); //몇칸
        var turnNum = block[lineNum][blockNum];
        //칸이 이미 채워져 있나?
        if(turnNum.textContent === ''){
            turnNum.textContent=turn;
            //3칸인지 확인하기
            //가로줄
            if(block[lineNum][0].textContent===turn&&
                block[lineNum][1].textContent===turn&&
                block[lineNum][2].textContent===turn){
                    text.textContent=turn+' 승리';
                    restart();
                }
            //세로줄
            if(block[0][blockNum].textContent===turn&&
                block[1][blockNum].textContent===turn&&
                block[2][blockNum].textContent===turn){
                    text.textContent=turn+' 승리';
                    restart();
                }
            //대각선
            if(blockNum===lineNum){
                if(block[0][0].textContent===turn&&
                    block[1][1].textContent===turn&&
                    block[2][2].textContent===turn){
                        text.textContent=turn+' 승리';
                        restart();
                    }
            }
            if((blockNum+lineNum)===2){
                if(block[0][2].textContent===turn&&
                    block[1][1].textContent===turn&&
                    block[2][0].textContent===turn){
                        text.textContent=turn+' 승리';
                        restart();
                    }
            }
            //턴 넘김
            if(turn!=='X'){
                turn='X';
            } else{
                turn='O';
            }
        } 
    });
}

function restart(){
    turn='O';
    block.forEach(function(line){
        line.forEach(function(block){
           block.textContent=''; 
        });
    });
}