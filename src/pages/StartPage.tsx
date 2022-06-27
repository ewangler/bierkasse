import React from "react";
import Grid from '@mui/material/Grid';
import { Article } from "../components/Articles";
import Categories from "../components/Categories";
import Cart from "../components/Cart";
import { Purchase } from "../App";

type Props = {
  purchase: Purchase | undefined
  setPurchase: any
}

function StartPage(props: Props) {
  const deleteItem = (article: Article) => {
    if (!props.purchase) return
    
    const filteredArticles = props.purchase.articles.filter((a: Article) => {
      return a !== article
    })

    props.setPurchase({ ...props.purchase, articles: filteredArticles })
  }

  if (!props.purchase) return <></>
  
  return <div className="start-page">
    <h1>Bierkasse</h1>
        <div className='content-main'>
          <Grid container spacing={2}>
            <Grid item xs={6} md={9}>
              <Categories purchase={props.purchase} setPurchase={props.setPurchase} />
            </Grid>
            <Grid item xs={3} md={3}>
              <Cart purchase={props.purchase} setPurchase={props.setPurchase} deleteItem={deleteItem} />
            </Grid>
          </Grid>
        </div>
  </div>;
};

export default StartPage;
