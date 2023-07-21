import React, { useEffect, useState } from "react";
import { Textarea, NativeSelect, Stack, Button } from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Contexts";

interface UserData {
  id: string;
  username: string;
  email: string;
}

const AddTask = () => {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [selectedid, setselectedid] = useState("");
  const [taskDes, setTaskDes] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    const init = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/auth/get-all-users`;
        const res = await axios.get(apiUrl, { withCredentials: true });
        const users_list: [] = res.data;
        const all_users: any = users_list.map((user: UserData) => {
          return { value: user.id, label: user.username };
        });
        setAllUsers(all_users);
        console.log(all_users);
      } catch (err) {
        toast.error("could not retrieve users");
      }
    };
    init();
  }, []);

  const handleAddTask = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/task/add-task`;
      const csrftoken = document.cookie.split("csrftoken=")[1];
      const data = {
        task_des: taskDes,
        assignee: user?.id,
        assigned_to: selectedid,
      };
      const apiResponsePromise = axios.post(apiUrl, data, {
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      });

      toast.promise(apiResponsePromise, {
        loading: "Assigning task...",
        success: "Task Assigned!!",
        error: "could not assign task !!",
      });
    } catch (err) {
        toast.error('error while assigning!!')
    }
  };
  return (
    <Stack>
      <Textarea
        placeholder="Description"
        label="Task Description"
        onChange={(e) => setTaskDes(e.target.value)}
        withAsterisk
      />
      <NativeSelect
        label="Assign to"
        data={allUsers}
        onChange={(event) => setselectedid(event.currentTarget.value)}
        withAsterisk
      />

      <Button onClick={handleAddTask}>Assign Task</Button>
    </Stack>
  );
};

export default AddTask;
