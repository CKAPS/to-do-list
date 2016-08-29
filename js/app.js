//Problem - User interaction doent provide desired results.
//Solution - Provide interactivity.


var taskInput = document.getElementById("new-task");//new-task
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks");//incomplete-tasks
var completedTaskHolder = document.getElementById("completed-tasks");//completed-tasks


//New Task List Item
var createNewTaskElement = function(taskString){
  //Create list item
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkBox = document.createElement("input");//checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input");//text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");  
  
  //Each elements needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;
  
  
  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



//Add a new task
//function addTask() {
//
//}
//Above is another way to write the below function.
var addTask = function() {
  //When the button is pressed
  console.log("Add task..");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
  taskInput.value = "";
}

//Edit an existing task
var editTask = function() {
  //When the edit button is pressed
  console.log("Edit task..");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  
    //If the class of the parent is .editMode
  if(containsClass){
      //Switch from .editMode
      //label text becomes the input's value
      label.innerText = editInput.value;
  }else{//else
      //Switch to .editMode
      //input value becomes the label's text
      editInput.value = label.innerText;
  }
    //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function() {
  //When the Delete button is pressed 
  console.log("Delete task..");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul 
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  //When the checkbox is checked 
  console.log("Task complete..");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
  //When the checkbox is unchecked 
  console.log("Task incomplete..");
  //Append the task list item to the #incompleted-tasks
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}


//Create a function to plug out the repetitive tasks in cycling over the incompleteTaskHolder and completedTaskHolder ul list items
var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    console.log("Bind list item events");
    //select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button
    editButton.onclick = editTask;
    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function(){
  console.log("AJAX Request");
}

////Set the click handler to addTask function
//addButton.onclick = addTask;
//addButton.onclick = ajaxRequest;

addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


//cycle over incompleteTaskHolder ul list items
for(var i = 0; i < incompleteTaskHolder.children.length; i++){
   //for each list item 
    //Bind event to list item's children (taskCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}
 


//cycle over completedTaskHolder ul list items
for(var i = 0; i < completedTaskHolder.children.length; i++){
  //for each list item 
    //Bind event to list item's children (taskIncomplete)
    bindTaskEvents(completedTaskHolder.children[i],taskIncomplete);
}






















