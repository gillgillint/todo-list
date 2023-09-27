import Task from "../Task";
import styles from "./tasks.module.css";
import PropTypes from "prop-types";

const Tasks = ({ tasks, onComplete, onDelete, onEdit }) => {
  const unCompletedTask = tasks.filter((item) => item.isCompleted === false);
  const completedTask = tasks.filter((item) => item.isCompleted === true);

  return (
    <section className={styles.container}>
      <div className={styles.tasks}>
        <header className={styles.header}>
          <p>Created tasks</p>
          <span>{unCompletedTask.length}</span>
        </header>
        <div className={styles.list}>
          {unCompletedTask.map((item) => (
            <Task
              onEdit={onEdit}
              onDelete={onDelete}
              onComplete={onComplete}
              key={item.id}
              task={item}
            />
          ))}
        </div>
      </div>
      <div className={styles.tasks}>
        <header className={styles.header}>
          <p style={{ color: "green" }}>Done</p>
          <span>{completedTask.length}</span>
        </header>
        <div className={styles.list}>
          {completedTask.map((item) => (
            <Task
              onEdit={onEdit}
              onDelete={onDelete}
              onComplete={onComplete}
              key={item.id}
              task={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array,
  onComplete: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Tasks;
