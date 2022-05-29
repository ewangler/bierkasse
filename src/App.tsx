import React, { useState } from 'react';
import { Article } from './components/Articles';
import Cart from './components/Cart';
import Categories from './components/Categories';


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
      <h1>Bierkasse</h1>
      <div className='content-main'>
        <Categories purchase={purchase} setPurchase={setPurchase} />
        <Cart articles={purchase.articles}/>
      </div>
    </div>
  );
}

export default App;
