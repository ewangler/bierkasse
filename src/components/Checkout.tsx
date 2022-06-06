import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Purchase } from '../App';
import client from '../client';

type Props = {
  purchase: Purchase | undefined
}

function Checkout(props: Props) {
  console.log(props.purchase)

  const [success, setSuccess] = useState<boolean>()

  const invoice = (e: any) => {
    e.preventDefault();
    window.print()
  }

  const checkout = (e: any) => {
    e.preventDefault();

    const entry = {
      "properties": {
        "amount": 0,
        "title": 'bla',
        "receipt": 'baa'
      },
      "links" : {
        "debit": 123,
        "credit": 123
      }
    }

    const data = {
      "properties": {
        "date": '',
        "title": ''
      },
      "children": {
        "entry": entry
      },
      "parents": [
        13563
      ]
    }

    client.post(`/entrygroup`, data).then((response) => {
      // const responseData = response.data
      // props.setMember(responseData)
      setSuccess(true)
    }).catch(() => {
      setSuccess(false)
    })
  }

  if (!props.purchase) return <></>

  return <div className='checkout'>
    <h1>Checkout</h1>
    <ul>
      {props.purchase.articles[0].properties.title}
    </ul>
    {success === true ?
      <Alert severity="success">Checkout erfolgreich</Alert> : (success === false) ? 
      <Alert severity="error">Checkout fehlgeschlagen</Alert> : <></>
    }
    <Button onClick={checkout}>checkout</Button>
    <Button onClick={invoice}>Quittung</Button>
    <Link to='/'>zurück</Link>
  </div>
}
export default Checkout
