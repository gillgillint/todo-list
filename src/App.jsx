import { useEffect, useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { v4 as uuid } from "uuid";

const LOCAL_STORAGE_KEY = "todo";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const loadSaveTasks = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadSaveTasks();
  }, []);

  const setTasksAndSave = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  };

  const addTask = (newTask) => {
    setTasksAndSave([
      ...tasks,
      { id: uuid(), title: newTask, isCompleted: false },
    ]);
  };

  const toggleTaskCompletedById = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });

    setTasksAndSave(newTasks);
  };

  const deleteTaskById = (taskId) => {
    const newTasks = tasks.filter((item) => item.id !== taskId);
    setTasksAndSave(newTasks);
  };

  const editTaskById = (taskId, title) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title,
        };
      }
      return task;
    });

    setTasksAndSave(newTasks);
  };

  console.log(tasks,'=-')

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks
        onEdit={editTaskById}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        tasks={tasks}
      />
    </>
  );
};

export default App;
