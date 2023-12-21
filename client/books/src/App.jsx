import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Books from './pages/Books'
import Add from './pages/Add'
import Update from './pages/Update'
const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books/>}/>
          <Route path='update/:id' element={<Update/>}/>
          <Route path='add' element={<Add/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
