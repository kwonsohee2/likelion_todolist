const todoInputElem = document.querySelector('.todo-input');
const todoListElem = document.querySelector('.todo-list');
const completeAllBtnElem = document.querySelector('.complete-all-btn');
const clockContainer = document.querySelector(".todo-title"); // 시계 구현 
const clockTitle = clockContainer.querySelector("h1"); //시계 구현

const leftItemsElem = document.querySelector('.left-items')


function getTime() { //시간을 구현하기 위한 함수
  const date = new Date(); // 시간을 나타내주는 객체
  const minutes = date.getMinutes(); //분
  const hours = date.getHours(); // 시
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`; //10미만이면 앞에 0
}

const getActiveTodos = () => {
    return todos.filter(todo => todo.isCompleted === false);
}

const setLeftItems = () => { //남은 할 일
    const leftTodos = getActiveTodos()
    leftItemsElem.innerHTML = `🥕 오늘 할 일이 ${leftTodos.length} 개 남았습니다 🥕`
}

let todos = [];
let id = 0;

const setTodos = (newTodos) => {
    todos = newTodos;
}

const getAllTodos = () => {
    return todos;
}

const getCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted === true );
}

let isAllCompleted = ''; // 전체 todos 체크 여부

const setIsAllCompleted = (bool) => { isAllCompleted = bool};

const completeAll = () => {
    completeAllBtnElem.classList.add('checked');
    const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: true }) )
    setTodos(newTodos)
}

const incompleteAll = () => {
    completeAllBtnElem.classList.remove('checked');
    const newTodos =  getAllTodos().map(todo => ({...todo, isCompleted: false }) );
    setTodos(newTodos)
}

// 전체 todos의 check 여부 (isCompleted)
const checkIsAllCompleted = () => {
    if(getAllTodos().length === getCompletedTodos().length ){ //할 일 개수와 한 일의 개수가 같다면
        setIsAllCompleted(true); 
        completeAllBtnElem.classList.add('checked'); //체크 
    }else { //아니면 
        setIsAllCompleted(false);
        completeAllBtnElem.classList.remove('checked'); //체크 없애기
    }
}

const onClickCompleteAll = () => {
    if(!getAllTodos().length) return; 

    if(isAllCompleted) incompleteAll(); // isAllCompleted가 true이면 todos를 전체 미완료 처리 
    else completeAll(); 
    setIsAllCompleted(!isAllCompleted); 
    paintTodos(); 
    setLeftItems()
}

const appendTodos = (text) => {
    const newId = id++;
    const newTodos = getAllTodos().concat({id: newId, isCompleted: false, content: text })
    // const newTodos = [...getAllTodos(), {id: newId, isCompleted: false, content: text }]
    setTodos(newTodos)
    setLeftItems()
    checkIsAllCompleted();
    paintTodos();
}

const deleteTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId );
    setTodos(newTodos);
    setLeftItems()
    paintTodos()
}

const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo,  isCompleted: !todo.isCompleted} : todo )
    setTodos(newTodos);
    paintTodos();
    setLeftItems()
    checkIsAllCompleted();
}

const updateTodo = (text, todoId) => {
    const currentTodos = getAllTodos();
    const newTodos = currentTodos.map(todo => todo.id === todoId ? ({...todo, content: text}) : todo);
    setTodos(newTodos);
    paintTodos();
}

const onDbclickTodo = (e, todoId) => {
    const todoElem = e.target;
    const inputText = e.target.innerText;
    const todoItemElem = todoElem.parentNode;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('edit-input');
    inputElem.addEventListener('keypress', (e)=>{
        if(e.key === 'Enter') {
            updateTodo(e.target.value, todoId);
            document.body.removeEventListener('click', onClickBody );
        }
    })

    const onClickBody = (e) => {
        if(e.target !== inputElem)  {
            todoItemElem.removeChild(inputElem);
            document.body.removeEventListener('click', onClickBody );
        }
    }
    
    document.body.addEventListener('click', onClickBody)
    todoItemElem.appendChild(inputElem);
}

const paintTodos = () => {
    todoListElem.innerHTML = null; //todoListElem 요소 안의 HTML 초기화
   const allTodos = getAllTodos() // todos 배열 가져오기

    allTodos.forEach(todo => { 
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item');

        todoItemElem.setAttribute('data-id', todo.id );

        const checkboxElem = document.createElement('div');
        checkboxElem.classList.add('checkbox');
        checkboxElem.addEventListener('click', () => completeTodo(todo.id))
    
        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.addEventListener('dblclick', (event) => onDbclickTodo(event, todo.id))
        todoElem.innerText = todo.content;
    
        const delBtnElem = document.createElement('button');
        delBtnElem.classList.add('delBtn');
        delBtnElem.addEventListener('click', () =>  deleteTodo(todo.id))
        delBtnElem.innerHTML = 'X';

        if(todo.isCompleted) {
            todoItemElem.classList.add('checked');
            checkboxElem.innerText = '✔︎';
        }

        todoItemElem.appendChild(checkboxElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);

        todoListElem.appendChild(todoItemElem);
    })
}

const init = () => {
    todoInputElem.addEventListener('keypress', (e) =>{
        if( e.key === 'Enter' ){
            appendTodos(e.target.value); todoInputElem.value ='';
        }

    })

    completeAllBtnElem.addEventListener('click',  onClickCompleteAll)

    setLeftItems()
    getTime();
    setInterval(getTime, 1000); 

}
init()
