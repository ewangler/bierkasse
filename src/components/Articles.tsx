import React, { useState } from 'react'
import Calculator from './Calculator'
import client from '../client'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Article, ArticleGroup, CartArticle } from '../models'
import useCart from '../contexts/useCart'
import ImageButton from './ImageButton'

type Props = {
  group: ArticleGroup | undefined
  // selectArticle: any
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const imageTable = {
  ZwergimBerg: "'./images/articles/zwerg.png'",
  Biraffe: "'./images/articles/biraffe.png'",
}

// @ts-ignore
const imageMapper = (beer: string) => imageTable[beer] || ""

function Articles(props: Props) {
  const [articles, setArticles] = useState<Article[]>([])
  const [currentArticle, setCurrentArticle] = useState<CartArticle>()

  const { addArticle } = useCart();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  function selectArticle(article: CartArticle, count: number) {
    const copy = { ...article }
    copy.quantity = count
    addArticle(copy)
  }

  React.useEffect(() => {
    setArticles([])

    props.group?.children?.article?.map((articleId: number) => {
      return client.get(`/article/${articleId}`).then((response) => {
        const article = response.data
        // @ts-ignore
        setArticles(existing => [...existing, article]);
      })
    })
  }, [props.group])

  if (!props.group && !articles) return <></>

  const openModal = (article: CartArticle) => {
    setModalIsOpen(true)
    setCurrentArticle(article)
  }

  const closeModal = (count: any) => {
    setModalIsOpen(false)
    if (currentArticle) {
      selectArticle(currentArticle, parseInt(count))
    }
  }

  function compareArticles(a: Article, b: Article) {
    return a.properties.description > b.properties.description ? 1 : -1;
  }

  const articleElements = articles.sort(compareArticles).map((article) => {
    return <Grid item sm={5} md={5}>
      {/* <div key={article.properties.title} className="article-item col">
        <Button variant="contained" onClick={() => openModal(article as CartArticle)} className="select-article">
          {article.properties.description}: {article.properties.price.toFixed(2)}
        </Button>
      </div> */}
      <ImageButton 
        onClick={() => openModal(article as CartArticle)}
        imgUrl={imageMapper(article.properties.description.replaceAll(' ', ''))}
        key={article.properties.description} 
        text={`${article.properties.description}: ${article.properties.price.toFixed(2)}`} />
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
