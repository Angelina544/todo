const form = document.querySelector('#todo-form');

const taskInput = document.querySelector('#task-input');

const tasksList = document.querySelector('.tasks-list');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', editTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', finishTask);

if (localStorage.getItem('tasks')) {
    tasksList.innerHTML = localStorage.getItem('tasks');
}

function addTask(e) {
    e.preventDefault();

    const inputValue = taskInput.value;

    const taskItem = `
    <li class="list-group-item mb-2 d-flex align-items-center justify-content-between shadow-sm">
        <div class="list-group-item__inner w-75 me-2 ps-2">${inputValue}</div>
        <div class="list-group-item__buttons">
            <button type="button" class="btn btn-success" data-action="done">
                <i class="bi bi-check2-square"></i>
            </button>

            <button type="button" class="btn btn-secondary" data-action="edit">
                <i class="bi bi-pencil"></i>
            </button>

            <button type="button" class="btn btn-danger" data-action="delete">
                <i class="bi bi-trash3-fill"></i>
            </button>
        </div>
    </li>
    `
    if (inputValue === "") {
        empty();
    }
    else {
        tasksList.insertAdjacentHTML('beforeend', taskItem);
        taskInput.value = "";
        taskInput.focus();
        saveHTMlStorage();
    }
};

function editTask(e) {
    if (e.target.dataset.action === 'edit') {
        const task = e.target.closest('.list-group-item');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.textContent;
        task.insertAdjacentElement('afterbegin', input);
    };
    saveHTMlStorage();
};

function deleteTask(e) {
    if (e.target.dataset.action === 'delete') {
        const alert = document.createElement('div');
        const button = document.createElement('button');
        const body = document.querySelector('body');
        alert.className = 'alert';
        button.setAttribute('id', 'btn');
        alert.textContent = 'Ваш запис зникне через 3c';
        button.textContent = 'Відмінити';
        body.insertAdjacentElement('afterbegin', alert);
        alert.insertAdjacentElement('afterbegin', button);
        timeCount(e);
    };
    saveHTMlStorage()
};

function finishTask(e) {
    if (e.target.dataset.action === 'done') {
        const task = e.target.closest('.list-group-item');
        task.classList.toggle('done');
    };
    saveHTMlStorage();
};

function empty() {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'Ви нічого не ввели';
    const body = document.querySelector('body');
    body.insertAdjacentElement('afterbegin', empty);
    setTimeout(removeEmpty, 4000);
};

function removeEmpty() {
    const empty = document.querySelector('.empty');
    const body = document.querySelector('body');
    body.removeChild(empty);
};

function saveHTMlStorage() {
    localStorage.setItem('tasks', tasksList.innerHTML);
};

function getHTMLStorage() {
    console.log(localStorage.getItem('tasks'));
};

function timeCount(e) {
    const alert = document.querySelector('div');
    const button = document.getElementById('btn');
    const task = e.target.closest('.list-group-item');
    const body = document.querySelector('body');

    function setTime() {
        let leftUntill = 3;

        let timeInterval = setInterval(function () {
            if (leftUntill <= 0) {
                clearInterval(timeInterval);
                task.remove();
                body.removeChild(alert);
            }
            else {
                alert.insertAdjacentElement('afterbegin', button);

                alert.textContent = `Ваш запис зникне через ${leftUntill}с`;
                leftUntill--;
            };
        }, 1000);
    };
    setTime();
};