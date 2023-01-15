import React, { useState } from 'react'
import MemberCreate from './MemberCreate'
import MemberSearch from './MemberSearch'
import Button from '@mui/material/Button'
import { Alert, Box, List, Modal } from '@mui/material'
import { Link } from 'react-router-dom'
import CartArticleItem from './CartArticleItem'
import Discount from './Discount'
import CartArticleList from './CartArticleList'
import useCart from '../contexts/useCart'
import { useCartContext } from '../contexts/CartContextProvider'

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

function Cart() {
  const { articles } = useCart();
  const { customer } = useCartContext();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const articleList = articles.map((article) => {
    return <CartArticleItem key={article.properties.description} article={article} deleteItem={true} />
  })

  return <div className='cart'>
    <h1>Warenkorb</h1>
    {articleList.length === 0 ?
      <Alert icon={false} severity="success">Warenkorb ist leer</Alert>
      :
      <List>
        {articleList}
      </List>
    }
    <CartArticleList />

    <Modal
      open={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='member-create-modal'
    >
      <Box sx={style}>
        <MemberCreate />
        <Button onClick={() => setModalIsOpen(false)}>schliessen</Button>
      </Box>
    </Modal>

    <hr />
    <h3>Rabatt</h3>
    <Discount />
    <hr />
    <h3>Kunde</h3>
    <MemberSearch />
    {!customer && (
      <><Button variant='outlined' onClick={() => setModalIsOpen(true)}>Neu erfassen</Button>
        <br /></>
    )}
    <hr />
    <Button component={Link} to='/checkout' variant='contained'>Checkout</Button>
  </div>
}
export default Cart
