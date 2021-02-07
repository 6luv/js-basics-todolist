//javascript는 localstorage에 있는 모든 데이터를 string으로 저장
//object를 string이 되도록 만들어야 됨(JSON.stringify)
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';

let toDos = [];                                       //빈 리스트 만듦

function deleteToDo(event){                             //li지우는 함수
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){     //조건에 해당하는 아이템들로 새로운 배열을 만듦
        return toDo.id !== parseInt(li.id); 
    });  
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){                                   //toDos를 로컬에 저장하는 함수
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");            //li를 만듦
    const delBtn = document.createElement("button");    //delete 버튼을 만듦
    const span = document.createElement("span");        //span 만듦
    const newId = toDos.length + 1;                     //id가 1씩 증가하도록 함
    delBtn.innerText = "X";                             //delete 값으로 X를 줌
    delBtn.addEventListener("click", deleteToDo);       //X버튼을 누르면 실행
    span.innerText = text;                              //span에 받아온 텍스트 저장
    li.appendChild(delBtn);                             //li에 추가
    li.appendChild(span);                               //li에 추가
    li.id = newId;                                      //li에 id 할당
    toDoList.appendChild(li);                           //ul에 li 추가
    const toDoObj = {                                   //object로 저장
        text: text,
        id: newId             
    };
    toDos.push(toDoObj);                                //배열에 추가
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();                             //제출을 하면 정보는 어딘가로 보내지고 새로고침 되는데 그걸 방지
    const currentValue = toDoInput.value;               //받아온 값을 현재 값에 저장
    paintToDo(currentValue);                            //함수 실행
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS); //로컬저장소에서 값을 받아옴
    if (loadedToDos !== null){                          //값이 존재하지 않을 경우
        const parsedToDos = JSON.parse(loadedToDos);    //JSON.parse가 string을 object로 바꿔줌 
        parsedToDos.forEach(function(toDo){             //배열에 담겨있는 것들 각각 한번씩 함수 실행
            paintToDo(toDo.text);
        })                           
    }
}

function init(){
    loadToDos();                                        //리스트 받아오는 함수
    toDoForm.addEventListener("submit", handleSubmit);  //이벤트 타입, 이벤트리스너
}

init();