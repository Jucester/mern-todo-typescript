/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { withRouter } from 'react-router';
import clientAxios from '../../config/axios';
import {AuthContext} from '../../context/AuthContext';
import { ITask } from './ITask';
import TaskItem from './TaskItem';

export interface TaskListProps {
    
}

const TaskList: React.FC<TaskListProps> = (props : any ) => {

    const { auth, saveAuth } = useContext(AuthContext);
    const [ tasks, setTasks ] = useState<ITask[]>([]);

    const getTasks = async () => {
        if(auth.token !== "") {
            try {
                const res = await clientAxios.get('/tasks', {
                    headers: {
                        "x-auth-token": auth.token
                    }
                });

                setTasks(res.data.tasks);
            } catch (error) {
                if(error.response.status === 500) {
                    props.history.push('/login');
                }
            }
        }
    }

    useEffect(() => {
        getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!auth.auth) {
        props.history.push('/login');
    }
    
    return ( 
        <Fragment>
            <p> TaskList </p>

            <div className="row">
                {tasks.map((task, i) => (
                    <TaskItem key={i} task={task} />
                ))}
            </div>
        </Fragment>
     );
}
 
export default withRouter(TaskList);