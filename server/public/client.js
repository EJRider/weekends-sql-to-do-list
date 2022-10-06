console.log('in javascript');

$(document).ready(onReady);

function onReady(){
    console.log('in onReady');
    $('#addBtn').on('click', addTask);
    getTask();
};

function addTask(){
    console.log('in addTask');
}

function getTask(){
    console.log('in getTask');
}

function dltTask(){
    console.log('in dltTask');
}

function markTaskDone(){
    console.log('in markTaskDone');
}

function render(){
    console.log('in render');
}