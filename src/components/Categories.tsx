import React from 'react'
import Articles, { Article } from './Articles'
import { Purchase } from '../App'
import client from '../client'
import Button from '@mui/material/Button';

type Props = {
  setPurchase: any
  purchase: Purchase
}

export type ArticleGroup = {
  properties: {
    title: string
  }
  children: {
    article: number[]
  }
}

function Categories(props: Props) {

  function selectArticle(article: Article) {
    let articles = props.purchase.articles
    const filter = articles.filter((a) => a.properties.title === article.properties.title)
    if (filter.length === 0) {
      articles.push(article)
    }
    const totalPrice = articles.map((article) => {
      return article.properties.price * (article.properties.count || 0)
    }).reduce((x, y) => x + y, 0)

    props.setPurchase({ ...props.purchase, articles: articles, total: totalPrice })
  }

  const [articleGroups, setArticleGroups] = React.useState<ArticleGroup[]>([])
  const [value, setValue] = React.useState<ArticleGroup>()

  React.useEffect(() => {
    client.get('/articlegroup').then((response) => {
      const groupIds = response.data.objects
      groupIds.map((groupId: number) => {
        return client.get(`/articlegroup/${groupId}`).then((groupResponse) => {
          const group = groupResponse.data
          // @ts-ignore
          setArticleGroups(existing => [...existing, group]);
        })
      })
    })
  }, [])

  if (!articleGroups) return null
  const articleGroupElements = articleGroups.map((group) => {
    return <div key={group.properties.title}>
      <h2>{group.properties.title} ({group.children.article.length})</h2>
      <img src={require(`../data/images/${group.properties.title}.png`)} alt="bild" onClick={() => setValue((group))}/> <br/>
      <Button variant="outlined" onClick={() => setValue((group))}>auswählen</Button>
    </div>
  })

  return <div className='categories'>
    {value ?
      <>
        <Button variant="outlined" onClick={() => setValue(undefined)}>{"<="}</Button>
        <Articles group={value} selectArticle={selectArticle} />
      </>
      :
      <div className='flex-grid-3'>{articleGroupElements}</div>
    }
  </div>
}
export default Categories
