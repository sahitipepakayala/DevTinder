
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './Components/Body'
import Signin from './Pages/Signin'
import Logout from './Pages/Logout'
import Login from './Pages/Login'
import MainBody from './Pages/MainBody'
import { Provider} from 'react-redux'
import userStore from './Store/userStore'
import Profile from './Pages/Profile'
import Edit from './Pages/Edit'
import Connections from './Components/Connections'
import Requests from './Components/Requests'

function App() {
  return (
    <>
    <Provider store={userStore}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>}>
      <Route path='/' element={<MainBody/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/edit' element={<h1><Edit/></h1>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path="/connections" element={<Connections/>}/>
        <Route path="/requests" element={<Requests/>}/>
        
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
