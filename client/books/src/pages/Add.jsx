import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Add = () => {

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    // Using the setBook function to update the state based on the previous state
    setBook((prev) => ({
      // Spread operator to keep the existing state
      ...prev,
      // Using computed property names to dynamically set the state property
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:2000/books", book)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  console.log(book)
  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input type="text" placeholder="title" name="title" onChange={handleChange}/>
      <input type="text" placeholder="description" name="desc" onChange={handleChange}/>
      <input type="text" placeholder="cover" name="cover" onChange={handleChange}/>
      <input type="number" placeholder="price" name="price" onChange={handleChange}/>

      <button className="formBtn" onClick={handleSubmit}>Add</button>
    </div>
  )
}

export default Add
