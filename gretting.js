const form = document.querySelector(".js-form"),        //처음으로 찾은 정보 가져옴
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");


const USER_LS = "currentUser";
    SHOWING_CN = "showing";

function saveName(text){                               //입력한 내용을 저장
    localStorage.setItem(USER_LS, text);               //입력 값을 USER_LS로 저장
}

function handleSubmit(event){                          
    event.preventDefault();                            //제출을 하면 정보는 어딘가로 보내지고 새로고침 되는데 그걸 방지
    const currentValue = input.value;                  //폼에 입력한 값을 저장함
    paintGreeting(currentValue);                       //함수를 불러와서 화면에 출력
    saveName(currentValue);
}   

function askForName(){                                 //이름을 물어보는 함수
    form.classList.add(SHOWING_CN);                    //폼을 보여줌
    form.addEventListener("submit", handleSubmit);     //이벤트 타입, 이벤트리스너
}

function paintGreeting(text){                          
    form.classList.remove(SHOWING_CN);                 //이름이 색칠되면 폼 숨김
    greeting.classList.add(SHOWING_CN);                //클래스명에 showing추가해서 css 속성값 가져옴
    greeting.innerText = `Hello ${text}`;              //Hello 뒤에 이름을 붙여 출력
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS); //로컬저장소에 유저이름을 가져와서 currentUser에 저장
    if (currentUser === null){                         //유저가 없는 경우
        askForName()                                   //함수 실행
    } else {                                           //유저가 있는 경우
        paintGreeting(currentUser);                    //함수 실행
    }
}

function init(){
    loadName();
}

init();
