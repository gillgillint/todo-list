import { Checkbox, IconButton, Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./task.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Task = ({ task, onComplete, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitEdit = (value) => {
    const { todo } = value;
    onEdit(task.id, todo);
    setIsEdit(false);
  };

  return (
    <div className={styles.task}>
      <Checkbox
        checked={task.isCompleted}
        onChange={() => onComplete(task.id)}
        {...label}
        size="small"
      />

      {!isEdit ? (
        <p className={task.isCompleted ? styles.textCompleted : ""}>
          {task.title}
        </p>
      ) : (
        <form
          style={{ display: "flex", width: "100%" }}
          onSubmit={handleSubmit(onSubmitEdit)}
        >
          <Input
            error={!!errors.todo}
            fullWidth
            style={{ marginRight: " auto" }}
            placeholder="edit task"
            defaultValue={task.title}
            {...register("todo", { required: true })}
          />
          <IconButton type="submit" aria-label="delete" size="small">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        </form>
      )}
      {!isEdit ? (
        <>
          {" "}
          <IconButton
            onClick={() => {
              setIsEdit(true);
            }}
            aria-label="delete"
            size="small"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={() => onDelete(task.id)}
            aria-label="delete"
            size="small"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </>
      ) : null}
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object,
  onComplete: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Task;
