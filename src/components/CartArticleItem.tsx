import IconButton from '@mui/material/IconButton/IconButton'
import ListItem from '@mui/material/ListItem/ListItem'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText/ListItemText';

type Props = {
  article: any
  deleteItem: any
}


function CartArticleItem(props: Props) {

  const article = props.article

  return <ListItem key={article.properties.title}
  secondaryAction={
    props.deleteItem ? 
    <IconButton edge="end" aria-label="delete" onClick={(e) => props.deleteItem(article)}>
      <DeleteIcon />
    </IconButton>
    : <></>
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
}
export default CartArticleItem
