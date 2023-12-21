import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Books = () => {

  const [books, setBooks] = useState([])

  // Fetching all books with axios
  useEffect(()=>{
    const fetchAllBooks = async ()=> {
      try {
        const res = await axios.get("http://localhost:2000/books")
        setBooks(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllBooks()
  }, [])

// handling delete function
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:2000/books/${id}`)
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div>
      <h1>Lama Book Shop</h1>
      <div className='books'>
        {
          books.map(book=>(
           <div key={book.id} className='book'>
            {book.cover && <img src={book.cover} alt=''/>}
            <h2>{book.title}</h2>
            <p className='des'>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={()=> handleDelete(book.id)}>delete</button>
            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
           </div>
          ))
        }
      </div>
      <button><Link to='/add'>Add new book</Link></button>
    </div>
  )
}

export default Books
