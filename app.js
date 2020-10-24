//Selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(e){
    e.preventDefault();
   //Todo div
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");

   // create LI
   const  newTodo=document.createElement("li");
   newTodo.innerText=todoInput.value;   
   newTodo.classList.add("todo-item");
   todoDiv.appendChild(newTodo);
    // ADD todo to localStorage
    saveLocalTodos(todoInput.value);
   //CHECK MARK BUTTON
   const completedButton=document.createElement("button");
   completedButton.innerHTML='<i class="fas fa-check"></i>';
   completedButton.classList.add("complete-btn");
   todoDiv.appendChild(completedButton);

   //TRASH BUTTON
   const trashButton=document.createElement("button");
   trashButton.innerHTML='<i class="fas fa-trash"></i>';
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);

   //APPEND TO LIST
   todoList.appendChild(todoDiv);

   //Clear todo input value
    todoInput.value="";
}

function deleteCheck(e){
    const item=e.target;

    //DELETE TODO
    if(item.classList[0]==="trash-btn"){
        const todo=item.parentElement;
        todo.classList.add("fall");
        removeLocalStorageTodos(todo);
         //kada se animaccija zavrsi da izbrisemo i item iz liste 
         todo.addEventListener('transitionend',function(){
            todo.remove();
         });        
    }

    //CHECK MARK
    if(item.classList[0]==="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){    
const todos = todoList.childNodes;
todos.forEach(function(todo){
    console.log(todo);
    switch(e.target.value){        
        case "all":
            todo.style.display='flex';
            break;
        case "completed":
            if(todo.classList.contains('completed')){
                todo.style.display='flex';                
            } else {
                todo.style.display='none';
            }      
            break;
        case "uncompleted":
            if(!todo.classList.contains('completed')){
                todo.style.display='flex';                
            } else {
                todo.style.display='none';
            }  
            break;
        }
    });
}

function saveLocalTodos(todo){
//proveravamo da li vec imamo todo-ds u nasem localStorage
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    } else {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    // Check --- HEY do I already have thing in there?
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
     
        // create LI
        const  newTodo=document.createElement("li");
        newTodo.innerText=todo;   
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //CHECK MARK BUTTON
        const completedButton=document.createElement("button");
        completedButton.innerHTML='<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
     
        //TRASH BUTTON
        const trashButton=document.createElement("button");
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
     
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    })
}

function removeLocalStorageTodos(todo){
    // Check --- HEY do I already have thing in there?
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}