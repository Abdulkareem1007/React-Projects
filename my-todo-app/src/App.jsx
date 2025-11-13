// // import './index.css'

// import { useEffect, useState } from "react";

// export default function App() {
//   const [tasks, setTask] = useState([]);
//   const [inputValue, setInputValue] = useState("");

//   function clickhandle() {
//     if (inputValue.trim() === "") {
//       return;
//     }
//     setTask((prevTask) => [...prevTask, inputValue]);

//     setInputValue("");
//   }

//   return (
//   <div>
//       <h3>My To-Do List</h3>
      
//       {/* This is a "Controlled Component" */}
//       <input
//         type="text"
//         placeholder="Enter a new task"
//         // 1. The input's value is "controlled" by our state.
//         value={inputValue}
//         // 2. On every key press, we update the state.
//         onChange={(e) => setInputValue(e.target.value)}
//       />

//       {/* The button calls our logic function on click */}
//       <button onClick={clickhandle}>Add Task</button>

//       {/* We render the list of tasks so we can see them */}
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index}>{task}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


/////////////////////////////////////////////////

// import { useState } from "react";

// export default function App() {
//   // Our state is now an array of objects
//   const [tasks, setTasks] = useState([
//     // { id: 1, text: "Learn React state" },
//     // { id: 2, text: "Add tasks to a list" }
//   ]);
//   const [inputValue, setInputValue] = useState("");

//   // --- 1. MODIFIED ADD FUNCTION ---
//   function handleAddTask() {
//     if (inputValue.trim() === "") return;

//     // Create a new task OBJECT with a unique ID
//     const newTask = {
//       id: Date.now(), // Using timestamp as a simple unique ID
//       text: inputValue
//     };

//     // Add the new object to the array
//     setTasks(prevTasks => [...prevTasks, newTask]);
//     setInputValue("");
//   }

//   // --- 2. NEW DELETE FUNCTION ---
//   // This function will be called by the delete button
//   // It needs to know WHICH task to delete, so we pass the 'id'
//   function handleDeleteTask(idToDelete) {
//     // We use the functional update form of 'setTasks'
//     setTasks(prevTasks => {
//       // We create a new array by filtering out the task with the matching ID
//       const newTasks = prevTasks.filter(task => task.id !== idToDelete);
//       return newTasks;
//     });
//   }

//   // console.log("Current tasks:", tasks);

//   return (
//     <div>
//       <h3>My To-Do List</h3>

//       <input
//         type="text"
//         placeholder="Enter a new task"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <button onClick={handleAddTask}>Add Task</button>

//       <ul>
//         {/*
//          * --- 3. UPDATED LIST RENDERING ---
//          * We now use 'task.id' for the key (which is much better!)
//          * We display 'task.text'
//          * We add a delete button with an onClick handler
//          */}
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.text}
//             {/*
//              * This button calls 'handleDeleteTask' and passes the ID
//              * of the specific task this 'li' represents.
//              */}
//             <button 
//               onClick={() => handleDeleteTask(task.id)} 
//               style={{ marginLeft: '10px' }}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


////////////////////////////////////////////


// import { useState } from "react";

// export default function App() {
//   const [tasks, setTasks] = useState([]);
//   const [inputValue, setInputValue] = useState("");

//   // --- 1. NEW STATE FOR EDITING ---
//   // Will hold the ID of the task we are currently editing, or 'null'
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   // Will hold the text for the task we are editing
//   const [editText, setEditText] = useState("");

//   function handleAddTask() {
//     if (inputValue.trim() === "") return;
//     const newTask = { id: Date.now(), text: inputValue };
//     setTasks(prevTasks => [...prevTasks, newTask]);
//     setInputValue("");
//   }

//   function handleDeleteTask(idToDelete) {
//     setTasks(prevTasks => prevTasks.filter(task => task.id !== idToDelete));
//   }

//   // --- 2. NEW: FUNCTION TO START EDITING ---
//   // This is called when the user clicks the "Edit" button
//   function handleEditClick(task) {

//     setEditingTaskId(task.id); // Set which task is being edited
//     setEditText(task.text);    // Fill the edit input with the task's current text
//   }

//   // --- 3. NEW: FUNCTION TO SAVE THE UPDATE ---
//   // This is called when the user clicks the "Save" button
//   function handleSaveClick() {
//     // We use .map() to create a new array
//     const updatedTasks = tasks.map(task => {
//       // Find the task with the matching ID
//       if (task.id === editingTaskId) {
//         // This is the one we're editing!
//         // Return a *new* object with the updated text
//         return { ...task, text: editText };
//       }
//       // For all other tasks, return them unchanged
//       return task;
//     });

//     // Update the tasks state with the new array
//     setTasks(updatedTasks);

//     // Clear the editing state
//     setEditingTaskId(null);
//     setEditText("");
//   }

//   return (
//   // Main container to center the app on the page
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      
//       {/* The main app card */}
//       <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-2xl">

//         {/* Header */}
//         <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
//           My To-Do List
//         </h3>

//         {/* Add Task Form */}
//         <div className="flex gap-2 mb-4">
//           <input
//             type="text"
//             placeholder="Enter a new task"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="flex-grow border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//           />
//           <button
//             onClick={handleAddTask}
//             className="bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//           >
//             Add
//           </button>
//         </div>

//         {/* Task List */}
//         <ul className="list-none p-0 space-y-3">
//           {tasks.map((task) => (
//             <li
//               key={task.id}
//               className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm transition-all"
//             >
//               {editingTaskId === task.id ? (
//                 // --- EDITING VIEW ---
//                 <>
//                   <input
//                     type="text"
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                     className="flex-grow border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   />
//                   <button
//                     onClick={handleSaveClick}
//                     className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg ml-2 hover:bg-green-600 transition-colors"
//                   >
//                     Save
//                   </button>
//                 </>
//               ) : (
//                 // --- DEFAULT VIEW ---
//                 <>
//                   <span className="text-lg text-gray-800">
//                     {task.text}
//                   </span>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEditClick(task)}
//                       className="bg-yellow-500 text-white font-semibold py-1 px-3 rounded-md text-sm hover:bg-yellow-600 transition-colors"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTask(task.id)}
//                       className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md text-sm hover:bg-red-600 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }




////////////////////////////////////////////////////////


//localstorage verson

// --- 1. Make sure to import useEffect! ---
import { useState, useEffect } from "react";
import './App.css'; // Import the new CSS file for animations

// --- This is our "key" for localStorage. We can use any string. ---
const LOCAL_STORAGE_KEY = "react-todo-list-tasks";

export default function App() {
  
  // --- 2. MODIFIED: Read initial state from localStorage ---
  const [tasks, setTasks] = useState(() => {
    // This function now runs *only once* on initial load
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    if (savedTasks) {
      // If we found saved tasks, parse the string back into an array
      return JSON.parse(savedTasks);
    } else {
      // Otherwise, return the default empty array (or your hard-coded tasks)
      return []; 
    }
  });

  const [inputValue, setInputValue] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [exitingTaskIds, setExitingTaskIds] = useState([]); // State for exit animations

  // --- 3. NEW: Save state to localStorage whenever 'tasks' changes ---
  useEffect(() => {
    // This effect runs *after* every render, IF 'tasks' has changed
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]); // The "dependency array": this effect depends on 'tasks'

  
  // --- All our other functions remain exactly the same ---
  
  function handleAddTask() {
    if (inputValue.trim() === "") return;
    const newTask = { id: Date.now(), text: inputValue };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setInputValue("");
  }

  function handleAddInputKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    }
  }

  function handleDeleteTask(idToDelete) {
    // Add the task's ID to the exiting list to trigger the animation
    setExitingTaskIds(prev => [...prev, idToDelete]);

    // Wait for the animation to complete before removing the task from state
    setTimeout(() => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== idToDelete));
      // Clean up the exitingTaskIds array
      setExitingTaskIds(prev => prev.filter(id => id !== idToDelete));
    }, 300); // This duration must match the CSS transition duration
  }

  function handleEditClick(task) {
    setEditingTaskId(task.id);
    setEditText(task.text);
  }

  function handleSaveClick() {
    const updatedTasks = tasks.map(task =>
      task.id === editingTaskId ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditText("");
  }

  // --- The JSX (Tailwind styling) is also exactly the same ---
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
          My To-Do List
        </h3>
        
        {/* Add Task Form */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a new task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddInputKeyDown}
            className="flex-grow border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="list-none p-0 space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${exitingTaskIds.includes(task.id) ? "task-exit-active" : ""} flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm transition-shadow duration-200 ease-out`}
            >
              {editingTaskId === task.id ? (
                // --- EDITING VIEW ---
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSaveClick();
                      }
                    }}
                    className="flex-grow border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-150 ease-out"
                  />
                  <button
                    onClick={handleSaveClick}
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg ml-2 hover:bg-green-600 transition-colors duration-150 ease-out"
                  >
                    Save
                  </button>
                </>
              ) : (
                // --- DEFAULT VIEW ---
                <>
                  <span className="text-lg text-gray-800">
                    {task.text}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="bg-yellow-500 text-white font-semibold py-1 px-3 rounded-md text-sm hover:bg-yellow-600 transition-colors duration-150 ease-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md text-sm hover:bg-red-600 transition-colors duration-150 ease-out"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
     
    </div>
    
  );
}
