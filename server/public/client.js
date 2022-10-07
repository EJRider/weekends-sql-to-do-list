console.log('in javascript');

$(document).ready(onReady);

function onReady(){
    console.log('in onReady');
    $('#addBtn').on('click', addTask);
    $('#viewTasks').on('click','.dltBtn', dltTask);
    $('#viewTasks').on('click', '.mrkDoneBtn', markTaskDone);
    getTask();
};

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

function cleanUp(){
    $('#taskNameIn').val('');
    $('#taskIn').val('');
};

function render(tasks){
    console.log('in render');
    $('#viewTasks').empty()
    for(let task of tasks){
        if(task.taskDone === true){
            $('#viewTasks').append(`
                <tr>
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
                <td>${task.id}</td>
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