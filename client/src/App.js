import './App.css';
import Dashback from './pages/Dashback';
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashback/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </BrowserRouter>                          
    </div>
  );                            
}

export default App;
