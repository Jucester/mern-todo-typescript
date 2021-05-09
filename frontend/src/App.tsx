import { useContext } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import TaskList from './components/Tasks/TaskList';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import TaskForm from './components/Tasks/TaskForm';

function App() {
    const { auth, saveAuth } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <AuthProvider value={[ auth, saveAuth ]}>
                
                <Navbar />

                <main className="container p-4">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route exact path="/" component={TaskList} />
                        <Route path="/add" component={TaskForm} />
                        <Route path="/edit/:id" component={TaskForm} />
                    </Switch>
                </main>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;