import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import WatchIcon from "../../Components/WatchIcon"
import "./Welcome.css"

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className='no-nav-container'>
      <div className='welcome'>
        <WatchIcon />
        <p>Enjoy your newest movies</p>
        <button onClick={() => navigate("/Login")} className='Login'>Login</button>
        <p>No account ? <Link to="/Signup">Sign up</Link> </p>
      </div>
    </div>
  )
}

export default Welcome