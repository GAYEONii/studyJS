const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

const TODO_LS = "toDos";
let todos = [];

//지우기 버튼 클릭시
function deleteToDo(e){
    const btn = e.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDo = todos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    console.log(cleanToDo);
    todos = cleanToDo;
    saveToDos();
}

//localStorage에 저장
function saveToDos(){
    localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

//toDo event 발생 시 toDoList 생성
function printToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = todos.length + 1;

    delBtn.innerText = 'X';
    span.innerText = text;
    delBtn.addEventListener("click",deleteToDo);

    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);

    li.id = newId;
    const todosObj = {
        text: text,
        id: newId
    }
    todos.push(todosObj);
    saveToDos();
}

//todoForm event
function handleSubmitToDo(e){
    e.preventDefault();
    const currentValue = toDoInput.value;
    printToDo(currentValue);
    toDoInput.value = '';
}

//localStorage에 있는 Todolist를 불러오기
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo){
            printToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmitToDo);
}

init();