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
  total: number
  customer: any
  customerId: number | undefined
  discount: number | undefined
}

function App() {

  const { token, setToken } = useToken();

  const [purchase, setPurchase] = useState<Purchase>({
    articles: new Array<Article>(),
    customer: undefined,
    customerId: undefined,
    discount: undefined,
    total: 0
  });

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<StartPage purchase={purchase} setPurchase={setPurchase} />} />
          <Route path="/checkout" element={<Checkout purchase={purchase} setPurchase={setPurchase} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
