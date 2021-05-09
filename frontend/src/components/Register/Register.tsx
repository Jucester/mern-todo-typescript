import React, { useState } from 'react'
import { withRouter } from 'react-router';
import clientAxios from '../../config/axios';

export interface RegisterProps {
    
}
 
const Register: React.FC<RegisterProps> = ( props : any) => {

    const [ data, setData ] = useState({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleRegister = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await clientAxios.post('/auth/signUp', data);
            console.log(res.data);

        
            props.history.push("/login");

        } catch (error) {
            console.log(error);
        }
    }


    return (  
        <div className="col-md-4 mx-auto mt-4 p-4">
      

        <div className="card">

            <div className="card-header font-weight-bold text-center">
                  <h2> Register </h2>
            </div>

            <div className="card-body">
                <form
            onSubmit={handleRegister}
        >
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Username</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    name="username" 
                    onChange={handleChange} 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Email address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
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
 
export default withRouter(Register);