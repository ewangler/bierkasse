import React, { useState } from 'react'
import MemberCreate from './MemberCreate'
import MemberSearch, { Member } from './MemberSearch'
import Button from '@mui/material/Button'
import { Alert, Box, List, Modal } from '@mui/material'
import { Link } from 'react-router-dom'
import CartArticleItem from './CartArticleItem'
import Discount from './Discount'
import { Purchase } from '../App'

type Props = {
  purchase: Purchase
  setPurchase: any
  deleteItem: any
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Cart(props: Props) {

  const articles = props.purchase.articles
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [member, setMember] = useState<Member>()

  const vat = (price: number) => {
    const vatRate = 7.7
    return price - price / (vatRate / 100 + 1)
  }

  const articleList = articles.map((article) => {
    return <CartArticleItem article={article} deleteItem={props.deleteItem} />
  })

  const totalPrice = articles.map((article) => {
    return article.properties.price * (article.properties.count || 0)
  }).reduce((x, y) => x + y, 0)

  const priceWithDiscount = totalPrice * ((props.purchase.discount || 100) / 100)

  return <div className='cart'>
    <h1>Warenkorb</h1>
    {articleList.length === 0 ?
      <Alert icon={false} severity="success">Warenkorb ist leer</Alert>
      :
      <List>
        {articleList}
      </List>
    }
    <h4>zwischentotal inkl. MWSt: {totalPrice.toFixed(2)} CHF</h4>
    <h4>MWSt: {vat(totalPrice).toFixed(2)} CHF</h4>
    <h4>total: {totalPrice.toFixed(2)} CHF</h4>
    <h4>Rabatt: {props.purchase.discount} %</h4>
    <h3>total mit rabatt: {priceWithDiscount.toFixed(2)} CHF</h3>

    <Modal
      open={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='member-create-modal'
    >
      <Box sx={style}>
        <MemberCreate setMember={setMember} />
      </Box>
    </Modal>

    <hr />
    <h3>Rabatt</h3>
    <Discount purchase={props.purchase} setPurchase={props.setPurchase} />
    <hr />
    <h3>Kunde</h3>
    <MemberSearch setMember={setMember} member={member} />
    <Button variant='outlined' onClick={() => setModalIsOpen(true)}>Neu erfassen</Button>
    <br />
    <hr />
    <Button component={Link} to='/checkout' variant='contained'>Checkout</Button>
  </div>
}
export default Cart
