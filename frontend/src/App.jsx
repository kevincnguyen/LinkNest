import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import LinkNest from './pages/LinkNest'
import Edit from './pages/Edit'
import Account from './pages/Account'
import HomeLayout from './layouts/HomeLayout'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<Signup />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='account' element={<Account />} />
            <Route path='edit' element={<Edit />} />
        </Route>
        <Route path='/:username' element={<LinkNest />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
