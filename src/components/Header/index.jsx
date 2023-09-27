import styles from "./header.module.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

const Header = ({ onAddTask }) => {
  const {
    resetField,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value) => {
    const { todo } = value;
    onAddTask(todo);
    resetField("todo");
  };

  return (
    <header className={styles.container}>
      <div className={styles.logoBox}>
        <FormatListBulletedIcon fontSize="large" />
        <h1>Todo List</h1>
      </div>
      <form className={styles.newTaskForm} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          placeholder="add new task"
          helperText={
            errors.todo && (
              <span style={{ fontSize: "14px", color: "red", marginLeft: 0 }}>
                This field is required
              </span>
            )
          }
          {...register("todo", { required: true })}
        />

        <Button variant="contained" endIcon={<AddIcon />} type="submit">
          Create Task
        </Button>
      </form>
    </header>
  );
};

Header.propTypes = {
  onAddTask: PropTypes.func,
};

export default Header;
