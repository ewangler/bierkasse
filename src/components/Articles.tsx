import React, { useState } from 'react'
import { ArticleGroup } from './Categories'
import Calculator from './Calculator'
import Modal from 'react-modal'
import client from '../client'

type Props = {
  group: ArticleGroup | undefined
  selectArticle: any
}

export type Article = {
  properties: {
    title: string
    description: string
    price: number
    count?: number
  }
}

function Articles(props: Props) {
  const [articles, setArticles] = useState<Article[]>([])
  const [currentArticle, setCurrentArticle] = useState<Article>()


  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);


  React.useEffect(() => {
    setArticles([])

    props.group?.children.article.map((articleId: number) => {
      return client.get(`/article/${articleId}`).then((response) => {
        const article = response.data
        // @ts-ignore
        setArticles(existing => [...existing, article]);
      })
    })
  }, [props.group])

  if (!props.group && !articles) return <></>

  const openModal = (article: Article) => {
    setModalIsOpen(true)
    setCurrentArticle(article)
  }

  const closeModal = (count: number) => {
    setModalIsOpen(false)
    if (currentArticle) {
      if (currentArticle.properties.count) {
        currentArticle.properties.count += Number(count)
      } else {
        currentArticle.properties.count = Number(count)
      }
      props.selectArticle(currentArticle)
    }
  }

  const articleElements = articles.map((article) => {
    return <div key={article.properties.title} className="article-item col">
      <button onClick={() => openModal(article)} className="select-article">
        {article.properties.description}: {article.properties.price.toFixed(2)}
      </button>
    </div>
  })


  return <div className='articles flex-grid-4'>
    {articleElements}
    <Modal isOpen={modalIsOpen} className='calculator-modal'>
      <button onClick={() => setModalIsOpen(false)}>x</button>
      <Calculator closeModal={closeModal} article={currentArticle} />
    </Modal>
  </div>
}
export default Articles
