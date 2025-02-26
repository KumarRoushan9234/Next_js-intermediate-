import { motion } from "framer-motion";
import { AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";
import styles from "../styles/TaskItem.module.css";

const TaskItem = ({ task, provided }) => {
  return (
    <motion.li
      className={`${styles.taskItem} ${task.completed ? styles.completedTask : ""}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
    >
      <div>
        <strong>{task.text}</strong>  
        <br />
        <small>⏳ {task.deadline}</small>
        <br />
        <span>{task.priority} Priority</span>
      </div>
      <AiOutlineCheckCircle onClick={() => {}} />
      <AiOutlineDelete onClick={() => {}} />
    </motion.li>
  );
};

export default TaskItem;
