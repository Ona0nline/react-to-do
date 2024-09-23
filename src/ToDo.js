import React, {useState} from "react"
import ViewTasks from "./ViewTasks"
// import PenICon from "./PenICon"
import Remove from "./RemoveIcon"
import Check from "./Check"
import "./ToDo.css"

export default function ToDo(){
  const[task,setTask] = useState("")
  const[description,setDescription] = useState('')
  // Need to have a seperate variable to store my tasks
  const[taskList,setTaskList] = useState([])
  const[descriptionList,setDescriptionList] = useState([])
  const[could,setCould] = useState([])
  const[should,setShould] = useState([])
  const[must,setMust] = useState([])
  const[showCategory, setShowCategory] = useState(false)



  function handleSubmit(event){
    event.preventDefault();
     if (task.trim() !== "") {
      // Remember the trailing ellipsis allow you to append a list
      // Placed task and description into a single object
      setTaskList([...taskList, { task, description,completed:false }]);
      setTask(""); // Clear the input field
      setDescriptionList([...descriptionList,description])
      setDescription("")
    } else {
      alert("Please enter a task");
    }
  }

  function handleNewTask(event){
    setTask(event.target.value)
  }

  function handleNewDescription(event){
    setDescription(event.target.value)
  }

  function getHandleRemove(index) {
  return function () {
    handleRemove(index);
  };
}


  function handleRemove(index) {
  // Create a new array that does not include the task at the given index.
  const updatedTasks = taskList.filter(function (taskItem, i) {
    // Keep only tasks whose index is not equal to the provided index.
    return i !== index;
  });

  // Update the taskList state with the new array.
  setTaskList(updatedTasks);
}

function toggleComplete(index) {
  // Create a new array based on taskList, where we modify only the task at 'index'
  const updatedTasks = taskList.map((taskItem, i) => {
    if (i === index) {
      // We found the task to update, so we return a new object with completed toggled
      return { ...taskItem, completed: !taskItem.completed };
    } else {
      // No change for other tasks, return the task as is
      return taskItem;
    }
  });

  // Update the state with the new array
  setTaskList(updatedTasks);
}
// -----------------------------------------------------------------------------------------------

  function handleSelect(event, index){
    const selectedValue = event.target.value
    const selectedTask = taskList[index] 

    if (!selectedTask) return;

    if (selectedValue === "could"){
      setCould([...could,selectedTask])
    }else if (selectedValue === "should"){
      setShould([...should,selectedTask])
    }else if (selectedValue === "must"){
      setMust([...must,selectedTask])
    }
  }

  function handleShowCategory(){
    // Setting show category to opppose whatver state show category is in
    setShowCategory(!showCategory)
  }


  return (<div>
    <h1>DoodleDo</h1>
    
    <h3>Your favourite To-do list app</h3>
    <form onSubmit={handleSubmit}>
      <input className="taskInput" onChange={handleNewTask} value={task} type="text" placeholder="Task" />
      <input className="descriptionInput" onChange={handleNewDescription} type="text" value={description} placeholder="Description"/>
      <input  className="taskSubmit" type="submit" value="Add task"/>
    </form>
    
    <ol>
    {taskList.map(function(taskItem,index){
      return <div key={index}>
        <li className="list" key={index}  style={{
                textDecoration: taskItem.completed ? "line-through" : "none",
                color: taskItem.completed ? "gray" : "black",
              }}>
          {/* Note that there is a .something because we passed in an object into the taskList List. */}
                <strong>{taskItem.task}</strong> - {taskItem.description}

                
                <div className="buttonsDiv">
                  {/* <button className="editBtn"><PenICon/></button> */}
        {/* Update the select element to pass the index */}
        {/* The arrow function (event) => handleSelect(event, index) creates a function that can then be used as the onChange handler. */}
          <select onChange={(event) => handleSelect(event, index)} defaultValue="Select">
            <option value="Select" disabled>Select Category</option>
            <option value="could">I Could</option>
            <option value="should">I Should</option>
            <option value="must">I Must</option>
          </select>
        <button onClick={getHandleRemove(index)} className="removeBtn"><Remove/></button>
        <button onClick={() => toggleComplete(index)} className="completeBtn"><Check/></button>
                </div>
        
              </li>

        </div>
    })}
    </ol>

    <button className="viewCategory" onClick={handleShowCategory}> {showCategory ? "Hide Categories" : "View Tasks by Category"}</button>

 {/* Conditionally render the categories based on the state */}
      {showCategory && (
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ViewTasks title="I Could" tasks={could || []} />
            </div>
            <div className="col-md-3">
              <ViewTasks title="I Should" tasks={should || []} />
            </div>
            <div className="col-md-3">
               <ViewTasks title="I Must" tasks={must || []} />
            </div>
          </div>
         
        </div>
      )}
  </div>)
}