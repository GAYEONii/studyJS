var tds = document.querySelectorAll('td');

for(var i=0; i<9; i++){
    tds[i].addEventListener('click', function(e){
        console.log(e.target);
        console.log(e.target.parentNode);

        var line = tds.indexOf(e.target.parentNode);
        console.log(line);
    });
}