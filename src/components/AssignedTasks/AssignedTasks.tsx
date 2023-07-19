import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../Contexts/AuthContext";
import TaskCard from "./TaskCard";
import './tasks.css';

export interface Task {
  id: number;
  task_des: string;
  assignee: UserData;
  assigned_to: UserData;
  notify_status: boolean;
  isCompleted: boolean;
}

const AssignedTasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [taskCompleteToggle, setTaskCompleteToggle] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/task/get-tasks`;
        const responsePrm = axios.get(apiUrl, { withCredentials: true });
        const resprm = toast.promise(responsePrm, {
          loading: "Fetching tasks...",
          success: "Tasks fetched",
          error: "error fetching tasks",
        });
        const res = await resprm;
        console.log(res.data.response);
        setTasks(res.data.response);
      } catch (err) {
        navigate("/auth/login");
      }
    };
    init();
  }, [taskCompleteToggle]);
  return (
    <main style={{margin: '0 2rem'}}>
      <div className="login-title assigned-task" style={{paddingBottom: '2rem'}}>Assigned Tasks</div>
      <div className="task-container">
        {tasks?.map((task) => {
          return (
            <TaskCard
            key={task.id}
              isCompleted={task.isCompleted}
              task_des={task.task_des}
              assignee={task.assignee}
              id={task.id}
              notify_status={task.notify_status}
              assigned_to={task.assigned_to}
              settaskcomplete = {setTaskCompleteToggle}
              taskcompletetoggle = {taskCompleteToggle}
            />
          );
        })}
      </div>
    </main>
  );
};

export default AssignedTasks;
