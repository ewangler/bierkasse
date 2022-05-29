import React from 'react'
import { Article } from './Articles'
import MemberSearch from './MemberSearch'

type Props = {
  articles: Article[]
}

function Cart(props: Props) {

  const articleList = props.articles.map((article) => {
    return <li key={article.properties.title}>
      {article.properties.count}x {article.properties.title} ({article.properties.price}.-)
    </li>
  })

  const totalPrice = props.articles.map((article) => {
    return article.properties.price * (article.properties.count || 0)
  }).reduce((x, y) => x + y, 0);

  return <div className='cart'>
    <h1>Warenkorb</h1>
    {articleList.length === 0 ?
      <p>Warenkorb ist leer</p>
      :
      <ul>
        {articleList}
      </ ul>
    }
    <h3>total: {totalPrice.toFixed(2)}</h3>

    <MemberSearch />
  </div>
}
export default Cart
