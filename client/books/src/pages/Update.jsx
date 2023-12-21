import { useState } from "react"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate()
  const location = useLocation()
  const bookId = location.pathname.split("/")[2]
 
  const handleChange = (e) => {
    // Using the setBook function to update the state based on the previous state
    setBook((prev) => ({
      // Spread operator to keep the existing state
      ...prev,
      // Using computed property names to dynamically set the state property
      [e.target.name]: e.target.value
    }));
  }

// handle update function
const handleUpdate = async () => {
  try {
    await axios.put(`http://localhost:2000/books/${bookId}`, book);
    navigate('/');
  } catch (error) {
    console.log(error);
  }
}
  console.log(book)
  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input type="text" placeholder="title" name="title" onChange={handleChange}/>
      <input type="text" placeholder="description" name="desc" onChange={handleChange}/>
      <input type="text" placeholder="cover" name="cover" onChange={handleChange}/>
      <input type="number" placeholder="price" name="price" onChange={handleChange}/>

      <button className="formBtn" onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default Update
