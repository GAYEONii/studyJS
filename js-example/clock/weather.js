const COORDS = 'coords'

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//getCurrentPosotion Error
function handleGeoError(){
    console.log("cant handle geo location");
}

//getCurrentPosition Success
function handleGeoSucces(position){
    const longitude = position.coords.longitude
    const latitude = position.coords.latitude;
    //Tip! 객체 변수의 이름과 객체의 key의 이름을 같게 저장할 땐 
    //longitude = longitude, latitude = latitude를 다음과 같이 저장할 수 있음
    const coordsObj = {
        longitude,
        latitude
    };
    saveCoords(coordsObj);
}

//latitude:위도 longitude:경도
function askForCoords(){
    //나의 위치 정보 읽어오기
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

//localStorage에 위치정보가 있는지 확인
function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
    } else{
        // get weather
    }
}

function init(){
    loadCoords();
}

init();