import React from 'react'
import Articles, { Article } from './Articles'
import { Purchase } from '../App'
import client from '../client'

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
    props.setPurchase({ ...props.purchase, articles: articles })
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
      {/* <img src={require('../data/images/brauereiimberg_100.png')} alt="bild" onClick={() => setValue((group))}/> <br/> */}
      <button onClick={() => setValue((group))}>auswählen</button>
    </div>
  })

  return <div className='categories'>
    {value ?
      <>
        <button onClick={() => setValue(undefined)}>{"<="}</button>
        <Articles group={value} selectArticle={selectArticle} />
      </>
      :
      <div className='flex-grid-3'>{articleGroupElements}</div>
    }
  </div>
}
export default Categories
