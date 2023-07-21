import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AssignedTasks from "../AssignedTasks/AssignedTasks";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { AddTask } from "..";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Notification } from "..";

const Tasks = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedNotif, { open: openNotif, close: closeNotif }] =
    useDisclosure(false);
  const [notification, setNotification] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  useEffect(() => {
    const init1 = async () => {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/task/notify-completed-task`;
      try {
        const res = await axios.get(apiUrl, { withCredentials: true });
        if (res.data.count > 0) {
          toast("you got notification, make sure to look into notifications!!");
          setNotification(true);
          setNotificationList(res.data.response);
        }
      } catch (err) {}
    };
    init1();
  }, []);
  const { user } = useAuth();
  if (!user) {
    console.log("this ran");
    navigate("/auth/login");
  } else {
    console.log("user = ", user);
  }
  return (
    <div>
      <Navbar
        open={open}
        openNotif={openNotif}
        showNotification={notification}
      />
      <AssignedTasks />
      <Modal opened={opened} onClose={close} title="Add task" centered>
        {/* Add task component */}
        <AddTask />
      </Modal>
      <Modal
        opened={openedNotif}
        onClose={closeNotif}
        title="Completed Tasks"
        centered
      >
        {/* Notification component */}
        {
          notificationList.map(notif => {
            return <Notification notif={notif}/>
          })
        }
      </Modal>
    </div>
  );
};

export default Tasks;
