const formCreate = document.querySelector('#formCreate')
const formEdit = document.querySelector('#formEdit')
const listGroupTodo = document.querySelector('#listGroupTodo')
const showMessage =document.querySelector('#message')
const messageEdit = document.querySelector('#messageEdit')
const icon = document.querySelector('#icon')
const overlay = document.querySelector('#overlay')


let changeTodoIndex = 0
const List = 'list'
//local storage
const todos = JSON.parse(localStorage.getItem(List)) ? JSON.parse(localStorage.getItem(List)) :[]

if(todos.length)showTodos()
//setTodos
function setTodos(){
    localStorage.setItem(List,JSON.stringify(todos))
}
//showTodos
function showTodos(){
    const todos = JSON.parse(localStorage.getItem(List))
    listGroupTodo.innerHTML = ''
    todos.forEach((todo,i)=>{
        listGroupTodo.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">${todo}
                <div class="todo-icons">
                    <img onclick="editTodo(${i})" src="./images/edit.svg" alt=" edit image" width="25" height="25">
                    <img onclick="deleteTodo(${i})" src="./images/delete.svg" alt="delete images" width="25" height="25">
                </div>
            </li>

        `
    })

}



//create form todo
formCreate.addEventListener('submit',(e)=>{
    e.preventDefault()
    const todoText = formCreate['input-create'].value.trim()
    if(todoText.length){
        todos.push(todoText)
        setTodos()
        showTodos()
        formCreate['input-create'].value = ''
    }else{
        showMessage.textContent = 'Please,enter  any todos'
        setTimeout(()=>{
        showMessage.textContent = ''
        },3000)
}
})

// deleteTodo
function deleteTodo(id){
    todos.splice(id,1)
    setTodos()
    showTodos()
}
//editTodo
function editTodo(id){
    changeTodoIndex = id
    document.querySelector('#modal').classList.remove('hidden')
    overlay.classList.remove('hidden')
    
}

// edit todo form

formEdit.addEventListener('submit',(e)=>{
    e.preventDefault()
    const todoEdit = formEdit['input-edit'].value.trim()
    if(todoEdit.length){
        todos.push(changeTodoIndex,1,todoEdit)
        setTodos()
        showTodos()
        formEdit['input-edit'].value = ''
        document.querySelector('#modal').classList.add('hidden')
        overlay.classList.add('hidden')
    }else{
        messageEdit.textContent = 'Please,change anything before submitting'
        setTimeout(()=>{
        messageEdit.textContent = ''
        },3000)
}
})
icon.addEventListener('click',()=>{
    document.querySelector('#modal').classList.add('hidden')
    document.querySelector('#overlay').classList.add('hidden')
})
document.addEventListener('keydown',(e)=>{
    if(e.code = 'Escape'){
        document.querySelector('#modal').classList.add('hidden')
    document.querySelector('#overlay').classList.add('hidden')
    }
})
