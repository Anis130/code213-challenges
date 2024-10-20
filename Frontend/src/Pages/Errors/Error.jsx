import React from 'react'

function Error({ code }) {
  return (
    <div className='container'>
      {`Can't load page \n Error ${code}`}
    </div>
  )
}

export default Error