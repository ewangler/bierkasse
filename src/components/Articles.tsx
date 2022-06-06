import React, { useState } from 'react'
import { ArticleGroup } from './Categories'
import Calculator from './Calculator'
import client from '../client'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

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
    return <Grid item sm={5} md={5}>
      <div key={article.properties.title} className="article-item col">
        <Button variant="contained" onClick={() => openModal(article)} className="select-article">
          {article.properties.description}: {article.properties.price.toFixed(2)}
        </Button>
      </div>
    </Grid>
  })


  return <div className='articles'>
    <Grid container spacing={1} columns={20}>
      {articleElements}
    </Grid>

    <Modal
      open={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Calculator closeModal={closeModal} article={currentArticle} />
      </Box>
    </Modal>
  </div>
}
export default Articles
