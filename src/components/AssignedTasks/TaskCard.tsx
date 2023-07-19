import React from "react";
import { Task } from "./AssignedTasks";
import "./tasks.css";
import axios from "axios";
import { toast } from "react-hot-toast";

type TaskCardProp = Task & {
    settaskcomplete : React.Dispatch<React.SetStateAction<boolean>>;
    taskcompletetoggle: boolean;
}

const TaskCard: React.FC<TaskCardProp> = ({ assignee, task_des, isCompleted, settaskcomplete, taskcompletetoggle, id }) => {
    const handleComplete = async () => {
        try {
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/task/complete-task?id=${id}`;
            const responsePrm = axios.get(apiUrl, { withCredentials: true });
            const resprm = toast.promise(responsePrm, {
              loading: "completing task..",
              success: "Task marked as completed",
              error: "error while completing",
            });
            const res = await resprm;
            console.log(res.data.message);
            settaskcomplete(!taskcompletetoggle);
          } catch (err) {
          }
        
    }
  return (
    <div className="task-card">
      <div className="task-title">Task Description</div>
      <div className="task-description">{task_des}</div>
      <div className="assigned-by">
        Assigned by: <span>{assignee.username}</span>
      </div>

      {isCompleted ? (
        <button disabled style={{ margin: "0" }}>
          Completed
        </button>
      ) : (
        <button style={{ margin: "0" }} onClick={handleComplete}>Mark as Complete</button>
      )}
    </div>
  );
};

export default TaskCard;
