import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Navigate } from 'react-router-dom';
import Error from "../Pages/Errors/Error"

function RequireAdmin({ children }) {
  const user = useAuthUser()

  if (user.role !== 'admin') {
    return <Error code={404} />
  }

  if (user && user.role === 'admin') {
    return children;
  }

  return <Navigate to='/' replace />
}


export default RequireAdmin