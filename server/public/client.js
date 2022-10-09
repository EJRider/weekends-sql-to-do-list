console.log('in javascript');

$(document).ready(onReady);

function onReady(){
    console.log('in onReady');
    $('#addBtn').on('click', addTask);
    $('#viewTasks').on('click','.dltBtn', dltTask);
    $('#viewTasks').on('click', '.mrkDoneBtn', markTaskDone);
    getTask();
};

/*
This function takes in the task name and what the task is and ships it, as well as
a false boolean that shows the task has not been finished, to the database.
It then calls the cleanUp and getTask functions.
*/
function addTask(){
    console.log('in addTask');
    let newTask = {
        taskName: $('#taskNameIn').val(),
        task: $('#taskIn').val(),
        taskDone: false
    }
    $.ajax({
        url: '/to-do',
        method: 'POST',
        data: newTask
    })
        .then(response=>{
            console.log('sent task');
            cleanUp();
            getTask();
        })
        .catch(err=>{
            console.log('error in addTask', err);
        });
};
/*
This function asks for all the tasks from the database and send them to the 
render function 
*/
function getTask(){
    console.log('in getTask');
    $.ajax({
        url: '/to-do',
        method: 'GET'
    })
        .then(response=>{
            console.log('getting tasks');
            render(response);
        })
        .catch(err=>{
            console.log('error in getTask', err);
        });
};

/*
This task waits for the delete button to be clicked, once it is clicked it 
sends a delete request to the database and removes it from the database before
calling the getTask function
*/
function dltTask(){
    console.log('in dltTask', $(this).data('id'));
    let taskId = $(this).data('id');
    $.ajax({
        url:`/to-do/${taskId}`,
        method: 'DELETE'
    })
        .then(response=>{
            console.log('deleting task')
            getTask();
        })
        .catch(err=>{
            console.log('error in dltTask', err);
        })
}

/*
This function waits for the Mark Tasks Done (MTD) button to be clicked.
It then sends a PUT request to the database to change the boolean in the 
"taskDone" row from false to true. Once that is done it calls the getTask function/
*/
function markTaskDone(){
    console.log('in markTaskDone', $(this).data('id'));
    let taskId = $(this).data('id');
    $.ajax({
        url: `/to-do/${taskId}`,
        method: 'PUT'
    })
        .then(response=>{
            console.log('marking task done');
            getTask();
        })
        .catch(err=>{
            console.log('error in MTD', err);
        });
};

/* 
This function empties the taskName and task inputs after a task has been
submitted to the database.
*/
function cleanUp(){
    $('#taskNameIn').val('');
    $('#taskIn').val('');
};

/*
This function  empties the viewTasks table and then appends in everything from
the database
*/
function render(tasks){
    console.log('in render');
    $('#viewTasks').empty()
    for(let task of tasks){
        if(task.taskDone === true){
            $('#viewTasks').append(`
                <tr class="finishedTask">
                    <td>${task.taskName}</td>
                    <td>${task.task}</td>
                    <td>✅</td>
                    <td> <button data-id='${task.id}' class="dltBtn">Delete Task</button> </td>
                </tr>
            `)
        }
        else{
            $('#viewTasks').append(`
            <tr>
                <td>${task.taskName}</td>
                <td>${task.task}</td>
                <td>❌</td>
                <td> 
                <button data-id='${task.id}' class="mrkDoneBtn">Mark Task Done</button>
                <button data-id='${task.id}' class="dltBtn">Delete Task</button> 
                </td>
            </tr>
        `)
        }     
    }
};