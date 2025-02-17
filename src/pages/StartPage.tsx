import React from "react";
import Grid from '@mui/material/Grid';
import Categories from "../components/Categories";
import Cart from "../components/Cart";

function StartPage() {
  
  return <div className="start-page">
    <h1>Bierkasse</h1>
        <div className='content-main'>
          <Grid container spacing={2}>
            <Grid item xs={6} md={9}>
              <Categories />
            </Grid>
            <Grid item xs={3} md={3}>
              <Cart />
            </Grid>
          </Grid>
        </div>
      <p className="version">Feb. 25</p>
  </div>;
};

export default StartPage;
