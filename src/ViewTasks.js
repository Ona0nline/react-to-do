import React from "react";

export default function ViewTasks({ title, tasks }) {
  return (
    <div>
      <h3>{title}</h3>
      {tasks.length > 0 ? (
        <ol>
          {tasks.map((taskItem, index) => (
            // Check if taskItem is defined and has a task property
            taskItem && taskItem.task ? (
              <li key={index}>{taskItem.task} - {taskItem.description}</li>
            ) : null
          ))}
        </ol>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
}
