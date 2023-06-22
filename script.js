document.addEventListener('DOMContentLoaded',()=>{
  const inputtdl = document.querySelector('.textarea')
  const buttontdl = document.querySelector('.buttoninput')
  const listtdl = document.querySelector('.todolist')
  const container = document.querySelector('.inputcol')
  let tareas = [];


  function init(){
    tareas = localStorage.getItem('TAREAS') !== null ? JSON.parse(localStorage.getItem('TAREAS')): [];
    for (const tarea of tareas) {
      addTodo(tarea); 
    }
  }
  init();


  function clickButton(e) {
      e.preventDefault()
      construir();
  }    
  
  // adding todoList
  function addTodo(task) {
      const itemall = document.createElement('div')
      itemall.classList.add('itemall')
      itemall.setAttribute('id', task.id);
  
      const item = document.createElement('p')
      item.classList.add('item')
      item.innerText = task.titulo;
      itemall.appendChild(item)
  
      const checkbutton = document.createElement("button")
      checkbutton.innerHTML = '<i class="fa-solid fa-check"></i>'
      checkbutton.classList.add("check-button")
      itemall.appendChild(checkbutton)
  
      const trashbutton = document.createElement("button")
      trashbutton.innerHTML = '<i class="fa-solid fa-trash"></i>'
      trashbutton.classList.add("trash-button")
      itemall.appendChild(trashbutton)
  
      listtdl.appendChild(itemall)
    
  
  }
  
  // checking and delete todoList 
  function okdel(e) {
      const item = e.target
      // check
      if (item.classList[0] === 'check-button') {
          const todolist = item.parentElement
          todolist.classList.toggle('checklist')
      }
  
      // delete
      if (item.classList[0] === 'trash-button') {
        const todolist = item.parentElement;
        const idActual = todolist.id
        todolist.remove();
        const tareasLocales = localStorage.getItem('TAREAS');
        if(tareasLocales !== null){
          tareas = JSON.parse(tareasLocales);
          tareas = tareas.filter((tarea)=> +tarea.id !== +idActual);
          localStorage.setItem('TAREAS', JSON.stringify(tareas));
        }
       

      }
    
  }
  
  buttontdl.addEventListener('click', clickButton)
  listtdl.addEventListener('click', okdel)
  
  function construir(){
    const textValor = inputtdl.value
    if (textValor === '') return
  
    const tareaLocal = localStorage.getItem('TAREAS');
    let listadoDeTareas = [];
    let id = 1
    if(tareaLocal !== null){
      listadoDeTareas = JSON.parse(tareaLocal);
      if(listadoDeTareas > 0 ){
        id = listadoDeTareas[listadoDeTareas.length-1].id+1;
      }
      
    }
    const task = { titulo:textValor, id};
  
    addTodo(task);
    listadoDeTareas.push(task);
    inputtdl.value = '';
    localStorage.setItem('TAREAS', JSON.stringify(listadoDeTareas));
  }


});
