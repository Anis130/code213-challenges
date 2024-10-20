import React, { useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

function MovieManagement() {
  const defaultState = {
    title: "",
    releaseDate: "",
    duration: "",
    description: "",
    category: "",
    rating: {
      average: "",
      votes: ""
    },
    poster: ""
  }
  const [inputField, setInputField] = useState(defaultState)
  const [editMode, setEditMove] = useState()

  const authHeader = useAuthHeader()

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'average' || name === 'votes') {
      setInputField(prevState => ({
        ...prevState,
        rating: {
          ...prevState.rating,
          [name]: value
        }
      }));
    } else {
      setInputField(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputField(prevState => ({
      ...prevState,
      poster: file
    }));
  };

  const addMovie = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:3000/api/Movie", inputField, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "multipart/form-data"
        }
      })
      if (response) {
        console.log(response.data);

        toast.success("movie added!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <button onClick={() => console.log(inputField)}>log</button>
      <div className='form-container'>
        <form onSubmit={addMovie} encType="multipart/form-data">
          <input type="text" name="title" value={inputField.title} onChange={handleChange} placeholder='title' />
          <input type="date" name="releaseDate" value={inputField.releaseDate} onChange={handleChange} placeholder='releaseDate' />
          <input type="number" name="duration" value={inputField.duration} onChange={handleChange} placeholder='duration' />
          <input type="text" name="description" value={inputField.description} onChange={handleChange} placeholder='description' />
          <input type="text" name="category" value={inputField.category} onChange={handleChange} placeholder='category' />
          <input type="text" name="average" value={inputField.average} onChange={handleChange} placeholder='average' />
          <input type="text" name="votes" value={inputField.votes} onChange={handleChange} placeholder='votes' />
          <input type="file" name="poster" onChange={handleFileChange} placeholder='poster' />
          <button className='btn' type='submit'>Add movie</button>
        </form>
      </div>
    </div>
  )
}

export default MovieManagement