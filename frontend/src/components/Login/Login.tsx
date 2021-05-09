import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import {AuthContext} from '../../context/AuthContext';

export interface LoginProps {
    
}
 
const Login: React.FC<LoginProps> = (props : any) => {

    const { auth, saveAuth } = useContext(AuthContext);
    const [ credentials, setCredentials ] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await clientAxios.post('/auth/signIn', credentials);
            console.log(res.data);

            const { token } = res.data;

            localStorage.setItem('token', token);

            saveAuth({
                token,
                auth: true,
                authenticatedUser: res.data.user
            })

            if(res.status === 200) {
                Swal.fire({
                    text: 'You have logged in',
                    icon: 'success',
                });

                props.history.push("/");
            } 

        } catch (error) {
            console.log(error);
            Swal.fire({
				icon: 'error',
				title: 'Error',
				text: error.response.data.message	
			})
        }
    }

    return ( 
        <div className="col-md-4 mx-auto mt-4 p-4">
          <div className="card">
              <div className="card-header font-weight-bold text-center">
                     <h2> Please, Log in </h2>
              </div>
              <div className="card-body">
                 
                    <form
                        onSubmit={handleLogin}
                    >
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Email address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                aria-describedby="emailHelp"
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-dark" >Submit</button>    
                        </div> 
                    </form>
                </div>
              </div>
          </div>
     );
}
 
export default withRouter(Login);