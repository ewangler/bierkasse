import Grid from '@mui/material/Grid';
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

  const deleteItem = (article: Article) => {
    const filteredArticles = purchase.articles.filter((a) => {
      return a !== article
    })

    setPurchase({ ...purchase, articles: filteredArticles })
  }

  const [purchase, setPurchase] = useState<Purchase>({ articles: new Array<Article>(), customer: {} });

  return (
    <div className="App">
      <h1>Bierkasse</h1>
      <div className='content-main'>
        <Grid container spacing={2}>
          <Grid item xs={6} md={9}>
            <Categories purchase={purchase} setPurchase={setPurchase} />
          </Grid>
          <Grid item xs={3} md={3}>
            <Cart articles={purchase.articles} deleteItem={deleteItem} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
