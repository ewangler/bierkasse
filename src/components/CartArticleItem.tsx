import IconButton from '@mui/material/IconButton/IconButton'
import ListItem from '@mui/material/ListItem/ListItem'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import useCart from '../contexts/useCart';

type Props = {
  article: any
  deleteItem: boolean
}


function CartArticleItem(props: Props) {

  const article = props.article
  const { removeArticle } = useCart()

  return <ListItem key={article.properties.description}
  secondaryAction={
    props.deleteItem ? 
    <IconButton edge="end" aria-label="delete" onClick={(e) => removeArticle(article)}>
      <DeleteIcon />
    </IconButton>
    : <></>
  }>
  <ListItemAvatar>
    <Avatar sx={{ bgcolor: '#1976d2', width: 27, height: 27 }}>
      {article.quantity}
    </Avatar>
  </ListItemAvatar>
  <ListItemText>
    {article.properties.description} ({article.properties.price}.-)
  </ListItemText>
</ListItem>
}
export default CartArticleItem
