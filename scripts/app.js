const button = document.querySelector('#button');
const modal = document.querySelector('#modal');
const backBtn = document.querySelector('#back-btn');
const list = document.querySelector('#lists');
const form = document.querySelector('form');
const flag = document.querySelector('#flag');

button.addEventListener('click', () => {
  modal.style.transform = 'scale(1)';
})

backBtn.addEventListener('click', () => {
  modal.style.transform = 'scale(0)';
})



class createText {
  constructor(text) {
    this.text = text;
    UI.addText(this.text);
    Store.addTodos(this.text);
    
  }
}

class UI {
  static displayTodos() {
    const todos = Store.getTodos();

    todos.forEach((todo) => UI.addText(todo));
  }

  static addText(text) {
    let todo = document.createElement('div');
    todo.id = 'todo';

    let input = document.createElement('input');
    input.type = 'text';
    input.disabled = true;
    input.id = 'input';
    input.value = text;

    let editBtn = document.createElement('span');
    editBtn.id = 'edit';
    editBtn.style.margin = '1rem';
    editBtn.innerHTML = '<i class="far fa-edit"></i>';
    editBtn.addEventListener('click', () => {
      UI.editText(input);
      //editBtn.innerHTML = '<i class="far fa-check-circle"></i>';
    })

    let updateBtn = document.createElement('button');
    updateBtn.id = 'update-btn';
    updateBtn.textContent = 'Update';

    let deleteBtn = document.createElement('span');
    deleteBtn.id = 'delete';
    deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    deleteBtn.addEventListener('click', () => {
      UI.deleteText(todo);
      UI.flag('Removed');
      Store.removeTodos(input.value);
    })

    let checkBox = document.createElement('input');
    checkBox.id = 'checkbox';
    checkBox.style.marginLeft = '0.5rem';
    checkBox.type = 'checkbox';
    checkBox.addEventListener('click', () => {
      UI.flag('completed');
    })


    list.appendChild(todo);
    todo.appendChild(input);
    todo.appendChild(editBtn);
    todo.appendChild(deleteBtn);
    todo.appendChild(checkBox);

  }

  static editText(input) {
    let update = document.querySelector('#edit');
    if(!input.disabled) {
      input.disabled = true;
      input.id = 'input';
      Store.addTodos(input.value);
      UI.flag('updated');
      update.innerHTML = '<i class="far fa-edit"></i>';

    } else {
      input.disabled = false;
      input.id = 'newinput';
      Store.removeTodos(input.value);
      update.innerHTML = '<i class="far fa-check-circle"></i>';
      update.style.color = 'green';
    }
  }

  static deleteText(todo) {
    list.removeChild(todo)
  }

  static clearFeild() {
    document.querySelector('#textinput').value = '';
    modal.style.transform = 'scale(0)';
  }

  static flag(mssg) {
    flag.innerHTML = mssg;
    flag.style.display = 'block';

    setTimeout(() => {
      flag.style.display = 'none';
    }, 1500);
  }
}

class Store {
  static getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
  }

  static addTodos(todo) {
    const todos = Store.getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  static removeTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos'));

    for (let i = 0; i <= todos.length; i++) {
      if (todos[i] == todo) {
        todos.splice(i, 1);
      }
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  UI.displayTodos();
  const date = new Date();

  let day = date.getDate();
  let year = date.getFullYear();
  let fullDay = date.getDay();
  let month = date.getMonth();
  document.querySelector('#day').innerHTML = day;
  document.querySelector('#year').innerHTML = year;

  function displayDay(day) {
    return ['SUNDAY','MONDAY','TUESDAY','WEDNESSDAY','THURDAY','FRIDAY','SATURDAY'][day];
  }

  function displayMonth(month) {
    return ['January','February','March','April','May','June','July','August','September','October','November','December'][month];
  }

  document.querySelector('#days').innerHTML = displayDay(fullDay);
  document.querySelector('#month').innerHTML = displayMonth(month);

});

form.addEventListener('submit', (ev) => {
  if(ev.preventDefault())ev.preventDefault();
  let inputText = document.querySelector('#textinput').value;
  
  if(inputText === '') {
    UI.flag('enter text');
  } else {
    let todo = new createText(inputText);
    UI.clearFeild();
    UI.flag('new todo')
  }
})


