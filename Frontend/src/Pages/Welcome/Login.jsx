import React, { useState } from 'react'
import WatchIcon from "../../Components/WatchIcon"
import axios from "axios"
import apiUrl from '../../Utils/urlConfig'
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from 'react-router-dom';

function Login() {
  const signIn = useSignIn();

  const navigate = useNavigate()

  const inputDefaultState = {
    email: "",
    password: ""
  }

  const [inputFields, setInputFields] = useState(inputDefaultState)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputFields({
      ...inputFields,
      [name]: value
    })
  }

  const login = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${apiUrl}/api/Auth/login`, inputFields)
      if (response.data.token) {
        signIn({
          auth: {
            token: response.data.token,
            type: "Bearer"
          },
          userState: {
            username: response.data.user.username,
            email: response.data.user.email,
            role: response.data.user.role
          }
        });
        navigate("/Home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='no-nav-container'>
      <div className='login'>
        <WatchIcon />
        <form onSubmit={login}>
          <div className='input-container'>
            <label htmlFor="email">Email</label>
            <input name='email' type="text" value={inputFields.email} onChange={handleInputChange} />
          </div>
          <div className='input-container'>
            <label htmlFor="password">Password</label>
            <input name='password' type="password" value={inputFields.password} onChange={handleInputChange} />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login