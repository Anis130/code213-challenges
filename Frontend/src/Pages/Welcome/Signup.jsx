import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import WatchIcon from "../../Components/WatchIcon"
import axios from "axios"
import apiUrl from "../../Utils/urlConfig"
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate()

  const inputDefaultState = {
    username: "",
    email: "",
    password: ""
  }

  const [inputFields, setInputFields] = useState(inputDefaultState)
  const [password2, setPassword2] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputFields({
      ...inputFields,
      [name]: value
    })
  }

  const signup = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${apiUrl}/api/Auth/register`, inputFields)
      if (response) {
        navigate('/login')
        toast.success("Signup success!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='no-nav-container'>
      <div className='signup'>
        <WatchIcon />
        <form onSubmit={signup}>
          <div className='input-container'>
            <label htmlFor="username">Username</label>
            <input name='username' type="text" value={inputFields.username} onChange={handleInputChange} />
          </div>
          <div className='input-container'>
            <label htmlFor="email">Email</label>
            <input name='email' type="text" value={inputFields.email} onChange={handleInputChange} />
          </div>
          <div className='input-container'>
            <label htmlFor="password">Password</label>
            <input name='password' type="password" value={inputFields.password} onChange={handleInputChange} />
          </div>
          <div className='input-container'>
            <label htmlFor="password2">Reapeat password</label>
            <input name='password2' type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
          </div>
          <button type='submit'>Signup</button>
        </form>

        <p>Own an account ? <Link to="/Login">JUMP RIGHT IN</Link></p>
      </div>
    </div>
  )
}

export default Signup