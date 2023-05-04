import handelFunction from '/module_Function/handelContentModule.js'

function start(){
    handelFunction.handelScrollHeader();
}

start();

function handelAnswer(id){
    const icon = document.getElementById(`icon-${id}`);
    const quesition = document.getElementById(`quesion-${id}`);
    const answer = document.getElementById(`answer-${id}`);
    
    icon.classList.toggle('active');
    quesition.classList.toggle('active');
    answer.classList.toggle('active');

}