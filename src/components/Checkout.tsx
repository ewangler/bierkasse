import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Purchase } from '../App';
import client from '../client';
import * as constants from '../service/constants'
import CartArticleItem from './CartArticleItem';
import CartArticleList from './CartArticleList';

type Props = {
  purchase: Purchase | undefined
  setPurchase: any
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Checkout(props: Props) {

  const [success, setSuccess] = useState<boolean>()
  const [creditSuccess, setCreditSuccess] = useState<boolean>()
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>()

  const invoice = (e: any) => {
    e.preventDefault();
    window.print()
  }

  const addCredit = (e: any) => {
    e.preventDefault();
    setModalIsOpen(true)
  }

  const handleAddCreditSubmit = (e: any) => {
    e.preventDefault();

    console.log(props.purchase)
    const totalAmount = (amount || 0) + parseInt((props.purchase?.customer.properties.Bierkredit) || 0)
    console.log(amount, props.purchase?.customer.properties.Bierkredit, totalAmount)
    const amountData = {
      "properties":
        { "Bierkredit": totalAmount }
    }
    client.put(`/member/${props.purchase?.customerId}`, amountData).then((response) => {
      client.get(`/member/${props.purchase?.customerId}`).then((memberResponse) => {
        const member = memberResponse.data
        props.setPurchase({ ...props.purchase, customer: member })
      })
    }).catch(() => {
      setCreditSuccess(false)
    })

    const entry = {
      "properties": {
        "amount": amount,
        "title": `Kredit aufladen - ${props.purchase?.customerId}`,
        "receipt": props.purchase?.customerId
      },
      "links": {
        "debit": [constants.DEBIT_ACCOUNT],
        "credit": [constants.BEER_CREDIT]
      }
    }
    const data = {
      "properties": {
        "date": new Date().toISOString().slice(0, 10),
        "title": `Kredit aufladen - ${props.purchase?.customerId}`
      },
      "children": {
        "entry": [entry]
      },
      "parents": [
        constants.ACCOUNT_PARENT
      ]
    }
    client.post(`/entrygroup`, data).then(() => {
      setCreditSuccess(true)
      setModalIsOpen(false)
    }).catch(() => {
      setCreditSuccess(false)
    })
  }

  const checkout = (e: any) => {
    e.preventDefault();

    props.purchase?.articles.forEach((article) => {
      const title = `${article.properties.count} - ${article.properties.title} - ${article.properties.description}`
      const receipt = ''
      const entry = {
        "properties": {
          "amount": article.properties.price,
          "title": title,
          "receipt": receipt
        },
        "links": {
          "debit": [constants.BEER_CREDIT],
          "credit": [constants.CREDIT_ACCOUNT]
        }
      }
      const data = {
        "properties": {
          "date": new Date().toISOString().slice(0, 10),
          "title": title
        },
        "children": {
          "entry": [entry]
        },
        "parents": [
          constants.ACCOUNT_PARENT
        ]
      }
      client.post(`/entrygroup`, data).then((response) => {
        // const responseData = response.data
        // props.setMember(responseData)
        const totalAmount = props.purchase?.customer.properties.Bierkredit - article.properties.price
        const amountData = {
          "properties":
            { "Bierkredit": totalAmount }
        }
        client.put(`/member/${props.purchase?.customerId}`, amountData).then(() => {
          client.get(`/member/${props.purchase?.customerId}`).then((memberResponse) => {
            const member = memberResponse.data
            props.setPurchase({ ...props.purchase, customer: member })
            setSuccess(true)
          }).catch(() => {
            setSuccess(false)
          })
        }).catch(() => {
          setSuccess(false)
        })
      }).catch(() => {
        setSuccess(false)
      })
    })
  }

  if (!props.purchase) return <></>

  const articles = props.purchase.articles.map((article) => {
    return <CartArticleItem article={article} deleteItem={false} />
  })
  const member = props.purchase.customer

  return <div className='checkout'>
    <img src={require('../data/images/logo.png')} alt="bild" /> <br />
    <h1>Checkout</h1>
    {member && <>
      {member?.properties.Vorname} {member?.properties.Name}, ({member?.properties.Strasse}, {member?.properties.PLZ} {member?.properties.Ort}), Bierkredit: {member?.properties.Bierkredit} CHF
      <Button onClick={addCredit}>aufladen</Button>
      {creditSuccess === true ? <Alert severity="success">Aufladen erfolgreich</Alert> : <></> }
      <hr />
    </>
    }
    <List>
      {articles}
    </List>
    <CartArticleList articles={props.purchase.articles} discount={props.purchase.discount} />

    <br />
    <br />
    {success === true ?
      <Alert severity="success">Checkout erfolgreich</Alert> : (success === false) ?
        <Alert severity="error">Checkout fehlgeschlagen</Alert> : <></>
    }
    <Button onClick={checkout} variant='contained'>checkout</Button>
    <Button onClick={invoice}>Quittung</Button>
    <br />
    <Link to='/'>zurück</Link>

    <Modal
      open={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        Kredit aufladen für: {member?.properties.Vorname} {member?.properties.Name}
        <form onSubmit={handleAddCreditSubmit}>
          <br />
          <TextField label='Betrag' required size="small" type="number" id="amount" name="amount" value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
          <Button variant="outlined" type="submit">aufladen</Button>

          {success === false ?
              <Alert severity="error">Aufladen fehlgeschlagen</Alert> : <></>
          }
        </form>
      </Box>
    </Modal>
  </div>
}
export default Checkout
