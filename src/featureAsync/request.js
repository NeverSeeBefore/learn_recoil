
function getStorageData() {
    try {
        return JSON.parse(localStorage.getItem('TODO_LIST') || '[]');
    } catch (error) {
        return [];
    }
}

function setStorageData(data) {
    localStorage.setItem('TODO_LIST', JSON.stringify(data));
}


export function getTodoAll() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let todoList = getStorageData();
            resolve(todoList);
        }, 3000)
    })
}

export function getTodoById(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let todo = getStorageData().find(item => item.id === id);
            resolve(todo)
        }, 3000)
    })
}

export function removeTodoById(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const todoList = getStorageData().filter(item => item.id !== id)
            setStorageData(todoList);
            resolve(true)
        }, 3000)
    })
}


export function updateTodoById(id, todo) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const todoList = getStorageData().map(item => item.id === id ? todo : item)
            setStorageData(todoList);
            resolve(true)
        }, 3000)
    })
}



