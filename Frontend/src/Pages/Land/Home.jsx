import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

function Home() {
  const user = useAuthUser()
  console.log(user);

  return (
    <div className='container'>Home</div>
  )
}

export default Home