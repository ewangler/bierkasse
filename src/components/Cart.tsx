import React, { useState } from 'react'
import { Article } from './Articles'
import MemberCreate from './MemberCreate'
import MemberSearch, { Member } from './MemberSearch'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@mui/material'

type Props = {
  articles: Article[]
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

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [member, setMember] = useState<Member>()

  const articleList = props.articles.map((article) => {
    return <ListItem key={article.properties.title}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={(e) => props.deleteItem(article)}>
          <DeleteIcon />
        </IconButton>
      }>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: '#1976d2', width: 27, height: 27 }}>
          {article.properties.count}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        {article.properties.description} ({article.properties.price}.-)
      </ListItemText>
    </ListItem>
  })

  const totalPrice = props.articles.map((article) => {
    return article.properties.price * (article.properties.count || 0)
  }).reduce((x, y) => x + y, 0);

  return <div className='cart'>
    <h1>Warenkorb</h1>
    {articleList.length === 0 ?
      <Alert icon={false} severity="success">Warenkorb ist leer</Alert>
      :
      <List>
        {articleList}
      </List>
    }
    <h3>total: {totalPrice.toFixed(2)}</h3>

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

    <MemberSearch setMember={setMember} member={member} />
    <Button variant='outlined' onClick={() => setModalIsOpen(true)}>Neu erfassen</Button>
  </div>
}
export default Cart
