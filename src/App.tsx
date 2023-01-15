import React from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Checkout from './components/Checkout';
import StartPage from './pages/StartPage';
import Login from './components/Login';
import useToken from './components/useToken';

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
