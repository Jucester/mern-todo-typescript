import React, { useContext, useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import Swal from "sweetalert2";
import clientAxios from "../../config/axios";
import { AuthContext } from "../../context/AuthContext";
import { ITask } from "./ITask";

export interface TaskFormProps {}

type TaskFormChange = HTMLInputElement | HTMLTextAreaElement;

interface Params {
  id: string;
}

const TaskForm: React.FC<TaskFormProps> = (props: any) => {

  const [task, setTask] = useState<ITask>({
    title: "",
    description: "",
  });

  const params = useParams<Params>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { auth, saveAuth } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<TaskFormChange>) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const statusCheck = (status : number, message : string) => {
    if (status === 201) {
              Swal.fire(
                  message,
                  'success'
            )
          } else {
              
            Swal.fire(
                {
                    icon: 'error',
                    title: 'Error',
                    text: "All field are required"
                }
            )
          }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        if (!params.id) {
          const res = await clientAxios.post("/tasks", task, {
            headers: {
              "x-auth-token": auth.token,
            },
          });

          statusCheck(res.status, res.data.message);

        props.history.push("/");
      } else {
          const res = await clientAxios.put(`/tasks/${params.id}`, task, {
            headers: {
              "x-auth-token": auth.token,
            },
          });

          console.log(res.data);

          statusCheck(res.status, res.data.message);
          
          props.history.push("/");
      } 

  
    } catch (error) {
        console.log(error)
        Swal.fire(
            {
                icon: 'error',
                title: 'Error',
                text: error
            }
        )
    }
  };

  // get task details
  const getTask = async (id: string) => {
    const res = await clientAxios.get(`/tasks/${id}`, {
        headers: {
          "x-auth-token": auth.token,
        },
      }
    );
    console.log(res.data);
    const { title, description } = res.data.task;
    setTask({ title, description });
  }

  useEffect(() => {
    if (params.id) {
      getTask(params.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!auth.auth) {
    props.history.push("/login");
  }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-title p-2 text-center">
            <h3> Create New Task </h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Write a title"
                  className="form-control"
                  autoFocus
                  onChange={handleChange}
                  value={task.title}
                />
              </div>

              <div className="mb-3">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="Write a description"
                  onChange={handleChange}
                  value={task.description}
                ></textarea>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-dark">
                  {
                    params.id ? 'Edit' : 'Add'
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TaskForm);
