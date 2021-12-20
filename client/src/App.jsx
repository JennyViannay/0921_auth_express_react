import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Fragment, useEffect, useState } from 'react';
import axios from "axios";

import { Home } from './components/Home.jsx';
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';
import { DashboardAdmin } from './components/DashboardAdmin.jsx';
import { AuthContext } from "./contexts/AuthContext.js";
import { UserContext } from "./contexts/UserContext.js";
import { ProtectedRoute } from "./protected/ProtectedRoute.js";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get('http://localhost:8000/security/user-is-auth', {
        headers: {
          "x-access-token": token
        }
      }).then(({ data }) => {
        if (data.auth) {
          setIsAuthenticated(true);
          setUser(JSON.parse(localStorage.getItem('user')));
        }
      }).catch(() => {
        console.log('user is not authenticated');
        localStorage.removeItem("token");
      });
    }
  }, [])

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser({});
    window.location.href = "/";
  }
  console.log(user)
  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <nav>
              <Link to="/" className="mx-3">Home</Link>
              {
                isAuthenticated ? 
                <>
                { user && user.role === 1 && <Link to="admin" className="mx-3">Dashboard Admin</Link>}
                <button className="float-end btn btn-danger" onClick={() => logout()}>Logout</button> 
                </>
                :
                  <>
                    <Link to="/login" className="mx-3">Login</Link>
                    <Link to="/register" className="mx-3">Register</Link>
                  </>
              }
            </nav>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<ProtectedRoute/>}>
                <Route path="/admin" element={<DashboardAdmin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
