import React, { useState } from 'react';
import { Article } from './components/Articles';
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Checkout from './components/Checkout';
import StartPage from './pages/StartPage';
import Login from './components/Login';
import useToken from './components/useToken';


export type Purchase = {
  articles: Article[]
  customer: any
}

function App() {

  const { token, setToken } = useToken();

  const [purchase, setPurchase] = useState<Purchase>({ articles: new Array<Article>(), customer: {} });

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<StartPage purchase={purchase} setPurchase={setPurchase} />}/>
          <Route path="/checkout" element={<Checkout purchase={purchase}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
