import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";
import styles from "../styles/TaskList.module.css";

const TaskList = ({ tasks, setTasks }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul className={styles.taskList} {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                {(provided) => (
                  <TaskItem task={task} provided={provided} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
