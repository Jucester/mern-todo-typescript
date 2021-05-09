import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";

export interface NavbarProps {
    
}
 
const Navbar: React.FC<NavbarProps> = () => {

    const { auth, saveAuth } = useContext(AuthContext);

    return (  
        <nav className="navbar navbar-inverse navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-header">
                     <Link className="navbar-brand" to="/"> TO-DO </Link>
                </div>
              
                <div className="d-flex" id="navbarNav">
                 
                      { auth.auth ? 
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/"> Task List </Link>
                                    </li>
                                        
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/add"> Add Task </Link>
                                    </li>
                                </ul>
                            : 
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login"> Login </Link>
                                    </li>
                                            
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register"> Register </Link>
                                    </li>
                                    
                                </ul>
                      }

                </div>

            </div>
            </nav>

    );
}
 
export default Navbar;