import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import LinkNest from './pages/LinkNest';
import Dashboard from './pages/Dashboard';
import Appearance from './pages/Appearance';
import LinkBuilder from './pages/LinkBuilder';
import HomeLayout from './components/layouts/HomeLayout';
import AdminLayout from './components/layouts/AdminLayout';

function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="account" element={<Account />} />
        <Route path="appearance" element={<Appearance />} />
        <Route path="links" element={<LinkBuilder />} />
      </Route>
      <Route path="/:username" element={<LinkNest />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
