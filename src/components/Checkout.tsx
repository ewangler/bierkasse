import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Purchase } from '../App';
import client from '../client';
import * as constants from '../service/constants'
import CartArticleItem from './CartArticleItem';

type Props = {
  purchase: Purchase | undefined
}

function Checkout(props: Props) {

  const [success, setSuccess] = useState<boolean>()

  const invoice = (e: any) => {
    e.preventDefault();
    window.print()
  }

  const checkout = (e: any) => {
    e.preventDefault();

    props.purchase?.articles.forEach((article) => {
      const title = `${article.properties.count} - ${article.properties.title} - ${article.properties.description}`
      const receipt = ''
      const entry = {
        "properties": {
          "amount": 0,
          "title": title,
          "receipt": receipt
        },
        "links" : {
          "debit": constants.BEER_CREDIT,
          "credit": constants.CREDIT_ACCOUNT
        }
      }
      const data = {
        "properties": {
          "date": new Date().toLocaleDateString('de'),
          "title": title
        },
        "children": {
          "entry": entry
        },
        "parents": [
          constants.ACCOUNT_PARENT
        ]
      }
      client.post(`/entrygroup`, data).then((response) => {
        // const responseData = response.data
        // props.setMember(responseData)
        setSuccess(true)
      }).catch(() => {
        setSuccess(false)
      })
    })
  }

  if (!props.purchase) return <></>

  const articles = props.purchase.articles.map((article) => {
    return <CartArticleItem article={article} deleteItem={false} />
  })

  return <div className='checkout'>
    <h1>Checkout</h1>
    <List>
      {articles}
    </List>
    {success === true ?
      <Alert severity="success">Checkout erfolgreich</Alert> : (success === false) ? 
      <Alert severity="error">Checkout fehlgeschlagen</Alert> : <></>
    }
    <Button onClick={checkout} variant='contained'>checkout</Button>
    <Button onClick={invoice}>Quittung</Button>
    <br/>
    <Link to='/'>zurück</Link>
  </div>
}
export default Checkout
