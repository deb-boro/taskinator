var tasksToDoEl = document.querySelector('#tasks-to-do')
var formEl = document.querySelector('#task-form')

var createTaskEl = function (testDataObj) {
  //create list item
  var listItemEl = document.createElement('li')
  listItemEl.className = 'task-item'

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement('div')
  taskInfoEl.className = 'task-info'

  //add html content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    testDataObj.name +
    '</h3>' +
    "<span class='task-type'>" +
    testDataObj.task +
    '</span>'
  listItemEl.appendChild(taskInfoEl)

  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl)
}

var taskFormHandler = function (event) {
  event.preventDefault()
  var taskNameInput = document.querySelector("input[name='task-name']").value
  var taskTypeInput = document.querySelector("select[name='task-type']").value

  if (!taskNameInput || !taskTypeInput) {
    alert('Please provide an input')
  }

  formEl.reset()

  //data as object
  var taskDataObj = {
    name: taskNameInput,
    task: taskTypeInput,
  }
  createTaskEl(taskDataObj)
}

formEl.addEventListener('submit', taskFormHandler)
