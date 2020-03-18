var lotto= [];
var result = [];

for(var i=1; i<=45; i++){
    lotto.push(i);
}

//var index = Math.floor(Math.random()*lotto.length); //1~45 중 랜덤 값

//6개의 랜덤 숫자 뽑기
for(var i=0;i<6;i++){
    var index = Math.floor(Math.random()*lotto.length); 

    result[i] = lotto[index];
    lotto.splice(index,1);

}

//오름차순 정렬
/*result.sort(compare);
function compare(a,b){
    return a-b;
} */

//익명함수 사용하기
result.sort(function(a,b){
    return a-b;
});
for(var i=0;i<6;i++){
    document.write('<span class="ball">'+result[i]+'</span>');
}
