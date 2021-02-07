const clockContainer = document.querySelector(".js-clock"), //가장 처음 요소를 가져옴 없으면 null
    clockTitle = clockContainer.querySelector("h1");

function getTime() {                                        //시계 구현 함수
    const date = new Date();                                //객체를 생성하는 함수
    const minutes = date.getMinutes();                      //date의 분을 리턴
    const hours = date.getHours();                          //date의 시를 리턴
    const seconds = date.getSeconds();                      //date의 초를 리턴
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;                                                     //삼항연산자를 사용하여 10보다 작으면 앞에 0을 붙여 출력
}                                                           //innerText는 불필요한 공백 제거하고 텍스트로 추가

function init() {
    getTime();
    setInterval(getTime, 1000);                             //1초마다 코드를 실행함 (실시간 출력)
}

init();