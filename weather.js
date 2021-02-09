const weather = document.querySelector(".js-weather");

const API_KEY = "c129a670ca4964deb4fa7fbac763b0be";

const COORDS = 'coords';

function getWeather(lat, lon) {                    //위도와 경도를 통해 날씨 정보 받아옴
    fetch(                                         //위도, 경도, apiid 가져옴
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){                     //then : 데이터를 완전히 받아온 뒤 함수 실행
        return response.json();                    //response의 json을 반환함
    }).then(function(json){                        
        const temperature = json.main.temp;        //main안에 temp정보를 가져옴 (온도)
        const place = json.name;                   //json의 name정보를 가져옴 (위치)
        weather.innerText = `${temperature} @ ${place}`; 
    });                                            //텍스틑 형식으로 온도와 위치 출력
}

function saveCoords(coordsObj){                    //로컬저장소에 이도와 경도를 json형식으로 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){                //위치 정보를 불러왔을 때
    const latitude = position.coords.latitude;     //위도 받아옴
    const longitude = position.coords.longitude;   //경도 받아옴
    const coordsObj = {                            //오브젝트로 저장
        latitude,                                  //key == value
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){                         //위치 정보를 불러오지 못 했을 때
    console.log("Cant Access geo location");
}

function askForCoords(){                           //navigator api로 위치 정보 가져옴
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);    
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS); 
    if (loadedCoords === null){               
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();

}

init();