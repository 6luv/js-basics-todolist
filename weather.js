const COORDS = 'coords';

function handleGeoSucces(position){                //위치 정보를 불러왔을 때
    const latitude = position.coords.latitude;     //위도 받아옴
    const longtitude = position.coords.longtitude; //경도 받아옴
    const coordsObj = {                            //오브젝트로 저장
        latitude,
        longtitude
    };
}

function handleGeoError(){                         //위치 정보를 불러오지 못 했을 때
    console.log("cant");
}

function askForCoords(){                           //navigator api로 위치 정보 가져옴
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);    
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS); 
    if(loadedCoords === null){               
        askForCoords();
    } else {
        //getWeather();
    }
}

function init(){
    loadCoords();

}

init();