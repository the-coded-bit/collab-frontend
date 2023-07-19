import React, { useEffect } from 'react'
import { useAuth } from '../../Contexts';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import AssignedTasks from '../AssignedTasks/AssignedTasks';

const Tasks = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    if(!user ){
      console.log('this ran');
      navigate('/auth/login')
    }
    else{
      console.log('user = ', user); 
    }
  return (
    <div>
    <Navbar />
    <AssignedTasks />
    </div>
  )
}

export default Tasks