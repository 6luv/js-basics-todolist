const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){                             //배경 이미지 불러오는 함수
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;              //Math.random함수가 0을 반환할 수 있기 때문에 +1
    image.classList.add("bgImage");
    body.prepend(image);

}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);  //floor는 버림, 이미지 개수만큼 랜덤으로 숫자 생성
    return number;
}

function init(){
    const randomNumber = genRandom();                      //number 저장
    paintImage(randomNumber);   
}

init();