// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const Navbar = () => {
  const signOut = useSignOut()
  const user = useAuthUser()

  const logout = () => {
    signOut()
    toast.success("Loged out!")
  }

  return (
    <nav>
      <ul>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/Favorites">Favorites</Link></li>
        <li><Link to="/Trending">Trending</Link></li>
        <li><Link to="/ComingSoon">Coming Soon</Link></li>
        <li>Community</li>
        <li>Social</li>
        <li>Settings</li>
        {
          user.role === 'admin' ? <li><Link to="/MovieManagement">Movies</Link></li> : ""
        }
        <li onClick={() => logout()}><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
