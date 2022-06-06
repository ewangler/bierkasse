import React, { useState } from 'react';
import { Article } from './components/Articles';
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Checkout from './components/Checkout';
import StartPage from './pages/StartPage';


export type Purchase = {
  articles: Article[]
  customer: any
}

function App() {

  // const [sections, setSections] = React.useState(null);
  // React.useEffect(() => {
  //   client.get('/member/626').then((response) => {
  //     //@ts-ignore
  //    setSections(response.data)
  //   })
  // }, [])

  // if (!sections) return null;
  // console.log(sections)

  // const properties = sections['properties']

  const [purchase, setPurchase] = useState<Purchase>({ articles: new Array<Article>(), customer: {} });

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
