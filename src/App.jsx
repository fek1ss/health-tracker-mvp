import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Day from './pages/Day';
import Tip from './pages/Tip';


function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/' element={<Register />}  />
          <Route path='/login' element={<Login />}  />
          <Route path='/day' element={<Day />}  />
          <Route path='/tip' element={<Tip />}  />
        </Routes>
      </Router>
    </div>
      
  )
}

export default App
