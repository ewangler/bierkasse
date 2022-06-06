import Button from '@mui/material/Button'
import React, { useState } from 'react'
import client from '../client'

type Props = {
  setMember: any
  member: Member | undefined
}

export type Member = {
  properties: {
    Vorname: string
    Name: string
  }
}

function MemberSearch(props: Props) {
  const [memberId, setMemberId] = useState<string>()

  const deleteMember = (e: any) => {
    e.preventDefault();
    props.setMember(undefined)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    client.get(`/member?filter=\`ID\`="${memberId}"`).then((response) => {
      const memberArray = response.data.objects

      if (memberArray.length > 0) {
        client.get(`/member/${memberArray[0]}`).then((memberResponse) => {
          const member = memberResponse.data
          props.setMember(member)
        })
      }
    })
  }

  return <div className='member-search'>
    Kunde: <br/>
    {props.member ?
      <>
      {props.member?.properties.Vorname} {props.member?.properties.Name}
      <Button onClick={deleteMember}>X</Button>
      </>
      :
      <form onSubmit={handleSubmit}>
        <input type="text" id="memberId" name="memberId" value={memberId} onChange={e => setMemberId(e.target.value)} />
        <Button variant="contained" type="submit">Suchen</Button>
      </form>
    }
  </div>
}
export default MemberSearch
