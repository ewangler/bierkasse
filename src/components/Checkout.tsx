import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import client from '../client';
import { useCartContext } from '../contexts/CartContextProvider';
import useCart from '../contexts/useCart';
import { Member } from '../models';
import * as constants from '../service/constants'
import CartArticleItem from './CartArticleItem';
import CartArticleList from './CartArticleList';

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

function Checkout() {

  const [success, setSuccess] = useState<boolean>()
  const [creditSuccess, setCreditSuccess] = useState<boolean>()
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>()

  const { customer, setCustomer, setArticles, setTotal } = useCartContext();
  const { articles, total } = useCart();
  const customerId = customer?.customerId

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

    if (customer) {
      const totalAmount = (amount || 0) + parseFloat((customer.properties.Bierkredit) || '0')
      const amountData = {
        "properties":
          { "Bierkredit": totalAmount }
      }
      client.put(`/member/${customerId}`, amountData).then((response) => {
        client.get(`/member/${customerId}`).then((memberResponse) => {
          const member = memberResponse.data
          setCustomer(member)
        })
      }).catch(() => {
        setCreditSuccess(false)
      })
    }

    const entry = {
      "properties": {
        "amount": amount,
        "title": `Kredit aufladen - ${customerId}`,
        "receipt": customerId
      },
      "links": {
        "debit": [constants.DEBIT_ACCOUNT],
        "credit": [constants.BEER_CREDIT]
      }
    }
    const data = {
      "properties": {
        "date": new Date().toISOString().slice(0, 10),
        "title": `Kredit aufladen - ${customerId}`
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

  const navigate = useNavigate();
  const redirect = () => {
    //@ts-ignore
    navigate('/', { replace: true });
    setCustomer(undefined)
  }

  const finish = () => {
    setSuccess(true)
    setArticles([])
    setTotal({ articleQuantity: 0, totalPrice: 0 })
    setTimeout(redirect, 2000)
    return
  }

  const checkout = (e: any) => {
    e.preventDefault();

    articles.forEach((article) => {
      const title = `${article.quantity} - ${article.properties.title} - ${article.properties.description}`
      const receipt = ''
      const entry = {
        "properties": {
          "amount": article.properties.price * article.quantity,
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
        
      }).catch(() => {
        setSuccess(false)
      })
    })

    if (!customer) {
      finish()
      return
    }

    const totalAmount = parseFloat(customer.properties.Bierkredit || '0') - total.totalPrice
    const amountData = {
      "properties":
        { "Bierkredit": totalAmount }
    }
    client.put(`/member/${customerId}`, amountData).then(() => {
      client.get(`/member/${customerId}`).then((memberResponse) => {
        const member = memberResponse.data
        // props.setPurchase({ ...props.purchase, customer: member }) #TODO
        setCustomer(member)
        finish()
      }).catch(() => {
        setSuccess(false)
      })
    }).catch(() => {
      setSuccess(false)
    })
  }

  const articleItems = articles.map((article) => {
    return <CartArticleItem article={article} deleteItem={false} />
  })
  const member = customer

  const memberLine = (member: Member) => {
    const credit = parseFloat(member.properties.Bierkredit || '0')
    const creditNew = credit - total.totalPrice

    return <>
      <p>{member?.properties.Vorname} {member?.properties.Name} ({credit} CHF)
      </p>
      <p>
        Bierkredit neu: <span className={creditNew < 0 ? 'credit-negative' : 'credit-ok'}>{creditNew} CHF</span>
        <Button onClick={addCredit}>aufladen</Button>
      </p>
    </>
  }

  return <div className='checkout'>
    <img src={require('../data/images/logo.png')} alt="bild" /> <br />
    <h1>Checkout</h1>
  
    <List>
      {articleItems}
    </List>
    <CartArticleList />
    {member && <>
      <hr />
      {memberLine(member)}
      {/* {member?.properties.Vorname} {member?.properties.Name}, ({member?.properties.Strasse}, {member?.properties.PLZ} {member?.properties.Ort}), Bierkredit: {member?.properties.Bierkredit} CHF */}
      {creditSuccess === true ? <Alert severity="success">Aufladen erfolgreich</Alert> : <></> }
      <hr />
    </>
    }
    <br />
    <br />
    {success === true ?
      <Alert severity="success">Checkout erfolgreich! Neuer Saldo: {member?.properties.Bierkredit}</Alert> : (success === false) ?
        <Alert severity="error">Checkout fehlgeschlagen</Alert> : <></>
    }
    <Button onClick={checkout} variant='contained'>checkout</Button>
    <Button onClick={invoice}>Quittung</Button>
    <br />
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
