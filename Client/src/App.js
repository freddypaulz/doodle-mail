import React from 'react';
import './App.css';
import Login from './Containers/Login/Login';
import NewUser from './Containers/NewUser/NewUser';
import Home from './Containers/Home/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './Components/Auth/ProtectedRoute';

function App() {
   return (
      <div className='App'>
         <BrowserRouter>
            <Route path='/' exact component={Login} />
            <Route path='/new' exact component={NewUser} />
            <ProtectedRoute path='/home' component={Home} />
         </BrowserRouter>
      </div>
   );
}

export default App;
