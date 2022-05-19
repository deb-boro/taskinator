var taskIdCounter = 0
var tasksToDoEl = document.querySelector('#tasks-to-do')
var formEl = document.querySelector('#task-form')
var pageContentEl = document.querySelector('#page-content')

var createTaskEl = function (testDataObj) {
  //create list item
  var listItemEl = document.createElement('li')
  listItemEl.className = 'task-item'

  //add task id as a custom attribute
  listItemEl.setAttribute('data-task-id', taskIdCounter)

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement('div')
  taskInfoEl.className = 'task-info'
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    testDataObj.name +
    '</h3>' +
    "<span class='task-type'>" +
    testDataObj.task +
    '</span>'
  listItemEl.appendChild(taskInfoEl)
  var taskActionEl = createTaskActions(taskIdCounter)
  listItemEl.appendChild(taskActionEl)

  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl)
  taskIdCounter++
}

var createTaskActions = function (taskId) {
  //create edit button
  var actionContainerEl = document.createElement('div')
  actionContainerEl.className = 'task-actions'
  //create edit button
  var editButtonEl = document.createElement('button')
  editButtonEl.textContent = 'Edit'
  editButtonEl.className = 'btn edit-btn'
  editButtonEl.setAttribute('data-task-id', taskId)
  actionContainerEl.appendChild(editButtonEl)

  //create delete button
  var deleteButtonEl = document.createElement('button')
  deleteButtonEl.textContent = 'Delete'
  deleteButtonEl.className = 'btn delete-btn'
  deleteButtonEl.setAttribute('data-task-id', taskId)
  actionContainerEl.appendChild(deleteButtonEl)

  //create select dropdown
  var statusSelectEl = document.createElement('select')
  statusSelectEl.className = 'select-status'
  statusSelectEl.setAttribute('name', 'status-change')
  actionContainerEl.appendChild(statusSelectEl)

  //creating the dropdown values
  var statusChoices = ['To Do', 'In Progress', 'Completed']
  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    var statusOptionEl = document.createElement('option')
    statusOptionEl.textContent = statusChoices[i]
    statusOptionEl.setAttribute('value', statusChoices[i])
    //append to select
    statusSelectEl.appendChild(statusOptionEl)
  }

  return actionContainerEl
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

var taskButtonHandler = function (event) {
  console.log(event.target)
}

formEl.addEventListener('submit', taskFormHandler)
pageContentEl.addEventListener('click', taskButtonHandler)
