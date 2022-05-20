var taskIdCounter = 0
var tasksToDoEl = document.querySelector('#tasks-to-do')
var formEl = document.querySelector('#task-form')
var pageContentEl = document.querySelector('#page-content')
var tasksInProgressEl = document.querySelector('#tasks-in-progress')
var tasksCompletedEl = document.querySelector('#tasks-completed')
var tasks = []

var createTaskEl = function (taskDataObj) {
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
    taskDataObj.name +
    '</h3>' +
    "<span class='task-type'>" +
    taskDataObj.type +
    '</span>'
  listItemEl.appendChild(taskInfoEl)

  var taskActionEl = createTaskActions(taskIdCounter)
  listItemEl.appendChild(taskActionEl)

  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl)

  taskDataObj.id = taskIdCounter
  tasks.push(taskDataObj)
  saveTasks()

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
  statusSelectEl.setAttribute('data-task-id', taskId)
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

  var isEdit = formEl.hasAttribute('data-task-id')

  if (isEdit) {
    var taskId = formEl.getAttribute('data-task-id')
    completeEditTask(taskNameInput, taskTypeInput, taskId)
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: 'to do',
    }
  }

  createTaskEl(taskDataObj)
}

var taskButtonHandler = function (event) {
  var targetEl = event.target

  //edit button was clicked
  if (targetEl.matches('.edit-btn')) {
    var taskId = targetEl.getAttribute('data-task-id')
    editTask(taskId)
  }

  //delete button was clicked
  if (targetEl.matches('.delete-btn')) {
    //get the element's task id
    var taskId = targetEl.getAttribute('data-task-id')
    deleteTask(taskId)
  }
}

var completeEditTask = function (taskName, taskType, taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']",
  )
  //set new values
  taskSelected.querySelector('h3.task-name').textContent = taskName
  taskSelected.querySelector('span.task-type').textContent = taskType

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName
      tasks[i].type = taskType
    }
  }
  saveTasks()

  alert('Task Updated')

  formEl.removeAttribute('data-task-id')
  document.querySelector('#save-task').textContent = 'Add Task'
}

var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']",
  )
  taskSelected.remove()
  //create new array to hold updated list of tasks
  var updatedTaskArr = []
  //loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id != parseInt(taskId)) {
      updatedTaskArr.push(tasks[i])
    }
  }
  tasks = updatedTaskArr
  saveTasks()
}

var editTask = function (taskId) {
  console.log('editing task #' + taskId)

  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']",
  )

  //get content from li element and put it in the text boxes
  var taskName = taskSelected.querySelector('h3.task-name').textContent
  document.querySelector("input[name='task-name']").value = taskName

  var taskType = taskSelected.querySelector('span.task-type').textContent
  document.querySelector("select[name='task-type']").value = taskType

  document.querySelector('#save-task').textContent = 'Save Task'

  formEl.setAttribute('data-task-id', taskId)
}

var taskStatusChangeHandler = function (event) {
  //get task item's id
  var taskId = event.target.getAttribute('data-task-id')
  //get the currently selected options's value and convert it to lowercase
  var statusValue = event.target.value.toLowerCase()
  //find the parent task element with the id
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']",
  )

  if (statusValue === 'to do') {
    tasksToDoEl.appendChild(taskSelected)
  } else if (statusValue === 'in progress') {
    tasksInProgressEl.appendChild(taskSelected)
  } else if (statusValue === 'completed') {
    tasksCompletedEl.appendChild(taskSelected)
  }

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue
    }
    saveTasks()
  }
}

var saveTasks = function () {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
var loadTasks = function () {
  var saveTasks = localStorage.getItem('tasks')

  if (!saveTasks) {
    return false
  }
  saveTasks = JSON.parse(saveTasks)

  for (var i = 0; i < saveTasks.length; i++) {
    createTaskEl(saveTasks[i])
  }
}

pageContentEl.addEventListener('click', taskButtonHandler)
formEl.addEventListener('submit', taskFormHandler)
pageContentEl.addEventListener('change', taskStatusChangeHandler)

loadTasks()
