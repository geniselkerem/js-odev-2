let formDOM = document.querySelector("#userForm")
formDOM.addEventListener('submit', formSubmit)

const alertDOM = document.querySelector("#alert")
const alertFunction = (title, message, className) => `<div class="alert alert-${className} alert-dismissible fade show" role="alert">
<strong>${title}</strong> ${message}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`

function formSubmit(event) {
    event.preventDefault()
    const myInputDOM = document.querySelector('#myInput')
    if (myInputDOM.value) {
        addItem(myInputDOM.value)
        alertDOM.innerHTML = alertFunction(
            "BAŞARILI",
            "Bir liste öğesi girdiniz.",
            "success"
        )
        saveLocalTodos()
        myInputDOM.value = ""
    } else {
        alertDOM.innerHTML = alertFunction(
            "DİKKAT",
            "Lütfen bir liste öğesi giriniz.",
            "danger"
        )
    }
}

let myULDOM = document.querySelector('#myUL')

function addItem(myInput) {
    let liDOM = document.createElement('li');
    liDOM.innerHTML = `${myInput}<button type="button" class="close" onclick="remove(this)"><span aria-hidden="false">&times;</span></button>`
    liDOM.classList.add('list-group-item', 'border-0', 'mb-3', 'mt-3')
    myULDOM.appendChild(liDOM)
}

myULDOM.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
}, false);

function remove(closeButton) {
    const listItem = closeButton.closest('li');
    listItem.remove();
    saveLocalTodos()
}

function saveLocalTodos() {
    const todos = Array.from(myULDOM.children).map(li => li.textContent.trim());
    localStorage.setItem('todos', JSON.stringify(todos));
}


function loadLocalTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        const todos = JSON.parse(savedTodos);
        todos.forEach(todo => {
            addItem(todo);
        });
    }
}

loadLocalTodos();