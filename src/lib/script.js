'use strict';

var todoArray = [];
var todoListElementId = 'todoList';

function createListItem(json) {
    if (!json) {
        return;
    }

    if (!json.title) {
        throw 'Item has empty title';
    }

    if (todoArray.some((item) => item.title == json.title)) {
        throw 'Item already  exists';
    }

    // Append todo array with json
    todoArray.push(json);

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className += 'list-check';
    checkbox.checked = json.completed;

    // Create div
    const div = document.createElement('div');
    div.className += 'list-item';
    div.innerText = json.title;

    // Append div with checkbox
    div.appendChild(checkbox);

    // Create Item
    const item = document.createElement('li');

    // append item with div
    item.appendChild(div);

    return item;
}

function buildUserList(users) {
    const todoListElement = document.getElementById(todoListElementId);
    if (todoListElement) {
        // Remove all list children
        while (todoListElement.firstChild) {
            todoListElement.removeChild(todoListElement.firstChild);
        }

        // Get todo list
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                // Proceed todo list
                if (json && Array.isArray(json) && json.length > 0) {
                    for (let i = 0; i < Math.min(json.length, 10); i++) {
                        todoListElement.appendChild(createListItem(json[i]));
                    }
                }

                console.log('build list done');
            }).catch((response) => console.error(response));
    }
}

function addNewItem() {
    const newItemInput = document.getElementById('newItem');
    if (newItemInput) {
        const title = newItemInput.value;
        if (!title) {
            console.error('Empty new item value');
            return;
        }

        const todoListElement = document.getElementById(todoListElementId);
        if (todoListElement) {
            try {
                todoListElement.appendChild(createListItem({
                    title: title,
                    completed: false
                }));
            } catch (ex) {
                console.error(ex);
            }
        }
    }
}

function sendHttpRequest(event) {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((response) => console.error(response));
}

function init() {
    const name = document.createElement('p');
    name.textContent = 'Dynamic paragraph';
    name.setAttribute('class', 'font-red');
    document.body.appendChild(name);

    name.style.backgroundColor = 'green';
    name.style.color = 'yellow';

    buildUserList();

    const titleByTagArray = document.body.getElementsByTagName('h1');
    if (titleByTagArray && titleByTagArray.length > 0) {
        const firstTitleByTag = titleByTagArray[0];
        firstTitleByTag.textContent = 'Welcome to AngularJS CodeHub!';
        firstTitleByTag.style.color = 'blue';
    } else {
        console.warn('h1 not found');
    }

    const person = {
        name: 'John',
        age: 24
    };

    for (const key in person) {
        console.log(`key: ${key}`);
        console.log(`value: ${person[key]}`);
    }
}

init();