import React from 'react'
import client from '../client'
import Button from '@mui/material/Button';
import { ArticleGroup } from '../models';
import Articles from './Articles';


function Categories() {


  function compareGroups(a: ArticleGroup, b: ArticleGroup) {
    return a.properties.title > b.properties.title ? 1 : -1;
  }

  const [articleGroups, setArticleGroups] = React.useState<ArticleGroup[]>([])
  const [group, setGroup] = React.useState<ArticleGroup>()

  React.useEffect(() => {
    client.get('/articlegroup?order=title').then((response) => {
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

  const articleGroupElements = articleGroups.sort(compareGroups).map((group) => {
    // const image = `../data/images/${group.properties.title}.png`
    return <div key={group.properties.title}>
      <h2>{group.properties.title} ({(group.children.article ? group.children.article.length : '0')})</h2>
      <img src={require(`../data/images/Bier.png`)} alt="bild" onClick={() => setGroup((group))}/> <br/>
      <Button variant="outlined" onClick={() => setGroup((group))}>auswählen</Button>
    </div>
  })

  return <div className='categories'>
    {group ?
      <>
        <div className='header'>
          <Button className='back' variant="outlined" onClick={() => setGroup(undefined)}>{"zurück"}</Button>
          <h1>{group.properties.title}</h1>
        </div>
        <Articles group={group} />
      </>
      :
      <div className='flex-grid-3'>{articleGroupElements}</div>
    }
  </div>
}
export default Categories
