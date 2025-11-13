# React To-Do List

This project is a feature-rich To-Do list application built with React. It demonstrates essential React concepts including state management with hooks (`useState`, `useEffect`), handling user events, and persisting data to the browser's Local Storage.

## Features

* **Create Tasks:** Add new tasks to the list.
* **Edit Tasks:** Update the text of existing tasks inline.
* **Delete Tasks:** Remove tasks from the list with a fade-out animation.
* **Local Storage Persistence:** All tasks are saved to the browser's Local Storage, so your list is preserved even after closing the tab or browser.
* **Keyboard Support:** Press "Enter" to add a new task or save an edit.

## How It Works

The entire application logic is contained within the `src/App.jsx` component.

### State Management

The component uses several `useState` hooks to manage the application's state:

* `tasks`: An array of task objects (e.g., `{ id: 123, text: "My task" }`). This is the main source of truth for the to-do list.
* `inputValue`: A string that tracks the value of the "Add Task" input field.
* `editingTaskId`: Stores the `id` of the task currently being edited. It is `null` if no task is in edit mode.
* `editText`: A string that tracks the value of the input field for the task being edited.
* `exitingTaskIds`: An array of task IDs that are currently undergoing the "delete" animation. This state is used to apply a CSS class for the animation before the task is fully removed from the `tasks` state.

### Local Storage Persistence

The application uses the `useEffect` hook to automatically save and load tasks from Local Storage.

1.  **Loading Tasks:** The `tasks` state is initialized by a function passed to `useState`. This function runs once on component mount. It tries to get and parse an item from Local Storage with the key `react-todo-list-tasks`. If no data is found, it returns an empty array.
2.  **Saving Tasks:** A `useEffect` hook is set up to run *after* every render, but only if the `tasks` array has changed (specified by the `[tasks]` dependency array). This effect takes the current `tasks` array, converts it to a JSON string, and saves it to Local Storage under the same key.

### Core Functions

* **`handleAddTask()`**: Creates a new task object with a unique `id` (using `Date.now()`) and the text from `inputValue`. It then adds this new object to the `tasks` state and clears the input.
* **`handleDeleteTask(idToDelete)`**: This function enables the exit animation.
    1.  It first adds the `idToDelete` to the `exitingTaskIds` state array. This triggers the CSS animation.
    2.  It then uses `setTimeout` (set to 300ms, matching the animation duration) to delay the next step.
    3.  After the timeout, it updates the `tasks` state by filtering out the task with the matching ID, and it also cleans up the `exitingTaskIds` array.
* **`handleEditClick(task)`**: This is called when the "Edit" button is clicked. It sets `editingTaskId` to the `task.id` and `editText` to the `task.text`, which conditionally renders the edit view for that specific task.
* **`handleSaveClick()`**: This is called when the "Save" button is clicked. It maps over the `tasks` array to create a new array. If a task's ID matches the `editingTaskId`, it returns a new task object with the updated text from the `editText` state. All other tasks are returned unchanged. Finally, it updates the `tasks` state and resets the editing state variables (`editingTaskId` and `editText`) to `null` and `""`.

### Event Handling

* `onKeyDown` event handlers are added to the "Add Task" and "Edit Task" input fields.
* These handlers check if the pressed key is "Enter". If it is, they call the appropriate function (`handleAddTask` or `handleSaveClick`) to submit the form, improving usability.

## Setup and Installation

1.  Clone the repository:
    ```sh
    git clone <your-repo-url>
    ```
2.  Navigate to the project directory:
    ```sh
    cd <project-directory>
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

## Available Scripts

In the project directory, you can run:

* `npm run dev`: Runs the app in development mode.
* `npm run build`: Builds the app for production.
* `npm run preview`: Serves the production build locally.
