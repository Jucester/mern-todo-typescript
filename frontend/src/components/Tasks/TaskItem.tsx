import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';
import { ITask } from './ITask';

export interface TaskItemProps {
    task: ITask    
}
 
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { auth, saveAuth } = useContext(AuthContext);

    const history = useHistory();

    const id = task._id || 'null';

    const handleDelete = async ( e: React.MouseEvent<HTMLButtonElement> ) => {
        const res = await clientAxios.delete(`/tasks/${id}`, {
                    headers: {
                        "x-auth-token": auth.token
                    }
                });
                
        console.log(res.data);

        Swal.fire({
            text: 'Task Deleted',
            icon: 'success',
        });
    }

    return ( 
        <div className="col-md-3 mb-4">
            <div className="card">
                <div className="card-header">
                       <h1> { task.title } </h1>
                </div>
                <div className="card-body">
                   
                     <p> { task.description } </p>
                </div>

                <div className="card-footer d-flex justify-content-between">
                    <button 
                        className="btn btn-success"
                        onClick={() => history.push(`/edit/${id}`) }
                    >
                        Editar
                    </button>
                    <button 
                        className="btn btn-danger"
                        onClick={handleDelete}     
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default TaskItem;