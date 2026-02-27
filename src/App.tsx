import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Auth from './pages/Auth';
import IndustryAuth from './pages/IndustryAuth';
import MunicipalAuth from './pages/MunicipalAuth';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Rewards from './pages/Rewards';
import Industry from './pages/Industry';
import MunicipalDashboard from './pages/MunicipalDashboard';
import Installation from './pages/Installation';
import Contact from './pages/Contact';
import Insights from './pages/Insights';
import { useUserStore } from './store/userStore';

const App = () => {
  const user = useUserStore((state) => state.user);
  const role = useUserStore((state) => state.role);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/industry" element={<IndustryAuth />} />
        <Route path="/auth/gov" element={<MunicipalAuth />} />

        <Route element={<Layout />}>
          <Route path="/" element={
            user ? (
              role === 'industry' ? <Industry /> :
                role === 'government' ? <MunicipalDashboard /> :
                  <Home />
            ) : <Navigate to="/auth" />
          } />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/scanner" element={user ? <Scanner /> : <Navigate to="/auth" />} />
          <Route path="/rewards" element={user ? <Rewards /> : <Navigate to="/auth" />} />
          <Route path="/industry" element={user ? <Industry /> : <Navigate to="/auth" />} />
          <Route path="/municipal" element={user ? <MunicipalDashboard /> : <Navigate to="/auth" />} />
          <Route path="/setup" element={user ? <Installation /> : <Navigate to="/auth" />} />
          <Route path="/contact" element={user ? <Contact /> : <Navigate to="/auth" />} />
          <Route path="/insights" element={user ? <Insights /> : <Navigate to="/auth" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
