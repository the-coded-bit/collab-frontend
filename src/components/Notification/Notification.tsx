import { Card, Divider, Stack, Text } from "@mantine/core";
import React from "react";

interface NotificationProps {
  notif: any;
}

const Notification: React.FC<NotificationProps> = ({ notif }) => {
  return (
    <Stack>
      <div>
        <Text fw={700}>Task Description:</Text>
        <Text c="dimmed">{notif.task_des}</Text>
      </div>
      <div>
        <Text fw={700}>Assigned To:</Text>
        <Text c="dimmed">{notif.assigned_to}</Text>
      </div>
      <Divider />
    </Stack>
  );
};

export default Notification;
